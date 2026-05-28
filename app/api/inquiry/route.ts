import { NextRequest, NextResponse } from "next/server";

const CONTACT_METHOD_LABELS: Record<string, string> = {
  kakao: "카카오톡 /문자",
  email: "이메일",
  phone: "전화",
};

const PLAN_LABELS: Record<string, string> = {
  premium: "Premium Plan",
  enterprise: "Enterprise Plan",
};

function readEnvValue(name: string) {
  const value = process.env[name];
  if (!value) return "";

  return value.trim().replace(/^(['"])(.*)\1$/, "$2").trim();
}

export async function POST(request: NextRequest) {
  const token = readEnvValue("SLACK_BOT_TOKEN");
  const channel = readEnvValue("SLACK_CHANNEL_ID");
  if (!token || !channel) {
    console.error("[inquiry] Slack environment variables are missing.", {
      hasToken: Boolean(token),
      hasChannel: Boolean(channel),
    });

    return NextResponse.json(
      { error: "Slack 환경변수가 설정되지 않았습니다." },
      { status: 500 }
    );
  }

  const body = await request.json();
  const { plan, institution, representativeName, email, phone, contactMethod, comments } = body;

  if (!institution || !representativeName || !email || !phone) {
    return NextResponse.json(
      { error: "필수 항목을 모두 입력해주세요." },
      { status: 400 }
    );
  }

  const planLabel = PLAN_LABELS[plan] ?? plan;
  const contactLabel = CONTACT_METHOD_LABELS[contactMethod] ?? contactMethod;
  const additionalComments =
    typeof comments === "string" && comments.trim()
      ? comments.trim()
      : "추가 내용을 작성해주세요.";
  const slackMessage = [
    "*:hammer_and_pick: 도입 상담 문의 접수*",
    "",
    `• 관심 플랜: ${planLabel}`,
    `• 학원 / 기관명: ${institution}`,
    `• 담당자 성함: ${representativeName}`,
    `• 이메일: ${email}`,
    `• 연락처: ${phone}`,
    `• 연락 방법: ${contactLabel}`,
    "",
    `> ${additionalComments}`,
  ].join("\n");

  const slackPayload = {
    channel,
    text: ":hammer_and_pick: 도입 상담 문의 접수",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: slackMessage,
        },
      },
    ],
  };

  const slackRes = await fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(slackPayload),
  });

  const slackData = await slackRes.json();
  if (!slackData.ok) {
    console.error("[inquiry] Slack chat.postMessage failed.", {
      slackError: slackData.error ?? "unknown_error",
      responseStatus: slackRes.status,
      channelPrefix: channel.slice(0, 1),
      channelLength: channel.length,
    });

    return NextResponse.json(
      { error: `Slack 오류: ${slackData.error}` },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
