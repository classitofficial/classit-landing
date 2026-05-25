import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type ElementSnapshot = {
  height: number;
  selector: string;
  tagName: string;
  text: string;
  width: number;
  x: number;
  y: number;
};

type FeedbackPayload = {
  comment: string;
  element: ElementSnapshot;
  path: string;
  url: string;
};

function json(status: number, body: { message?: string; ok: boolean }) {
  return NextResponse.json(body, { status });
}

function isDesignFeedbackEnabled() {
  return process.env.NODE_ENV !== "production" || process.env.DESIGN_FEEDBACK_ENABLED === "1";
}

function shouldSendToSlack() {
  return process.env.NODE_ENV === "production" || process.env.DESIGN_FEEDBACK_DESTINATION === "slack";
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isElementSnapshot(value: unknown): value is ElementSnapshot {
  if (!value || typeof value !== "object") {
    return false;
  }

  const element = value as Record<string, unknown>;

  return (
    typeof element.selector === "string" &&
    typeof element.tagName === "string" &&
    typeof element.text === "string" &&
    isFiniteNumber(element.width) &&
    isFiniteNumber(element.height) &&
    isFiniteNumber(element.x) &&
    isFiniteNumber(element.y)
  );
}

function parsePayload(body: unknown): FeedbackPayload | null {
  if (!body || typeof body !== "object") {
    return null;
  }

  const value = body as Record<string, unknown>;

  if (
    typeof value.comment !== "string" ||
    !value.comment.trim() ||
    typeof value.path !== "string" ||
    typeof value.url !== "string" ||
    !isElementSnapshot(value.element)
  ) {
    return null;
  }

  try {
    new URL(value.url);
  } catch {
    return null;
  }

  return {
    comment: value.comment.trim(),
    element: value.element,
    path: value.path,
    url: value.url,
  };
}

function formatKoreaTimestamp() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    hour: "2-digit",
    hour12: false,
    minute: "2-digit",
    month: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Seoul",
    year: "numeric",
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return `${values.year}-${values.month}-${values.day}-${values.hour}-${values.minute}-${values.second}`;
}

function pageSlug(value: string) {
  return (
    value
      .replace(/^\/+/, "")
      .replace(/\/+$/g, "")
      .replace(/[^a-zA-Z0-9가-힣]+/g, "-")
      .replace(/^-|-$/g, "")
      .toLowerCase() || "home"
  );
}

function formatFeedbackMarkdown(feedback: FeedbackPayload) {
  const elementLabel = feedback.element.selector
    ? `${feedback.element.tagName} / ${feedback.element.selector}`
    : feedback.element.tagName;

  return [
    "# Design Feedback",
    "",
    `- URL: ${feedback.url}`,
    `- Path: ${feedback.path}`,
    `- Element: ${elementLabel}`,
    `- Rect: ${feedback.element.width}x${feedback.element.height} at ${feedback.element.x}, ${feedback.element.y}`,
    `- Text: ${feedback.element.text || "-"}`,
    "",
    "## Comment",
    "",
    feedback.comment,
    "",
  ].join("\n");
}

function slackText(feedback: FeedbackPayload) {
  const elementLabel = feedback.element.selector
    ? `${feedback.element.tagName} / ${feedback.element.selector}`
    : feedback.element.tagName;

  return [
    "*Classit 디자인 피드백*",
    `*URL:* ${feedback.url}`,
    `*Path:* ${feedback.path}`,
    `*Element:* ${elementLabel}`,
    `*Rect:* ${feedback.element.width}x${feedback.element.height} at ${feedback.element.x}, ${feedback.element.y}`,
    `*Text:* ${feedback.element.text || "-"}`,
    "",
    "*Comment:*",
    feedback.comment,
  ].join("\n");
}

async function saveFeedbackFile(feedback: FeedbackPayload) {
  const [{ mkdir, writeFile }, path] = await Promise.all([import("fs/promises"), import("path")]);
  const directory = path.join(process.cwd(), "docs", "design-feedback");
  const fileName = `${formatKoreaTimestamp()}-${pageSlug(feedback.path)}.md`;
  const filePath = path.join(directory, fileName);

  await mkdir(directory, { recursive: true });
  await writeFile(filePath, formatFeedbackMarkdown(feedback), "utf8");

  return fileName;
}

async function sendFeedbackToSlack(feedback: FeedbackPayload) {
  const token = process.env.SLACK_BOT_TOKEN;
  const channel = process.env.SLACK_DESIGN_FEEDBACK_CHANNEL_ID || process.env.SLACK_CHANNEL_ID;

  if (!token || !channel) {
    throw new Error("Slack environment variables are missing.");
  }

  const slackRes = await fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      channel,
      text: "Classit 디자인 피드백",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: slackText(feedback),
          },
        },
      ],
    }),
  });

  const slackData = (await slackRes.json()) as { error?: string; ok?: boolean };

  if (!slackData.ok) {
    throw new Error(`Slack error: ${slackData.error ?? "unknown_error"}`);
  }
}

export async function POST(request: NextRequest) {
  if (!isDesignFeedbackEnabled()) {
    return json(404, { ok: false, message: "요청한 리소스를 찾을 수 없습니다." });
  }

  const body = await request.json().catch(() => null);
  const feedback = parsePayload(body);

  if (!feedback) {
    return json(400, { ok: false, message: "피드백 내용을 확인해주세요." });
  }

  try {
    if (shouldSendToSlack()) {
      await sendFeedbackToSlack(feedback);
      return NextResponse.json({ ok: true });
    }

    const fileName = await saveFeedbackFile(feedback);
    return NextResponse.json({ ok: true, fileName });
  } catch (error) {
    console.error("Save design feedback failed", error);
    return json(500, { ok: false, message: "피드백을 저장할 수 없습니다." });
  }
}
