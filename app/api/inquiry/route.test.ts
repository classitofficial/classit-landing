import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { NextRequest } from "next/server";
import { POST } from "./route";

const originalFetch = globalThis.fetch;

function createInquiryRequest(body: Record<string, string>) {
  return new Request("http://localhost/api/inquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }) as unknown as NextRequest;
}

describe("inquiry API", () => {
  beforeEach(() => {
    vi.stubEnv("SLACK_BOT_TOKEN", "slack-token");
    vi.stubEnv("SLACK_CHANNEL_ID", "slack-channel");
    globalThis.fetch = vi.fn(async () => ({
      json: async () => ({ ok: true }),
    })) as unknown as typeof fetch;
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
    globalThis.fetch = originalFetch;
  });

  it("sends the requested Slack inquiry message format", async () => {
    const response = await POST(createInquiryRequest({
      plan: "premium",
      institution: "노코더스",
      representativeName: "이동규",
      email: "move9@nocoders.kr",
      phone: "010-3242-8118",
      contactMethod: "kakao",
      comments: "추가 내용을 작성해주세요.",
    }));

    expect(response.status).toBe(200);
    const fetchMock = vi.mocked(globalThis.fetch);
    const [, init] = fetchMock.mock.calls[0];
    const payload = JSON.parse(String(init?.body));
    const sectionText = payload.blocks[0].text.text;

    expect(payload.text).toBe(":hammer_and_pick: 도입 상담 문의 접수");
    expect(sectionText).toBe(
      "*:hammer_and_pick: 도입 상담 문의 접수*\n\n" +
      "• 관심 플랜: Premium Plan\n" +
      "• 학원 / 기관명: 노코더스\n" +
      "• 담당자 성함: 이동규\n" +
      "• 이메일: move9@nocoders.kr\n" +
      "• 연락처: 010-3242-8118\n" +
      "• 연락 방법: 카카오톡 /문자\n\n" +
      "> 추가 내용을 작성해주세요."
    );
  });

  it("normalizes copied Slack environment values before sending", async () => {
    vi.stubEnv("SLACK_BOT_TOKEN", ' "slack-token" ');
    vi.stubEnv("SLACK_CHANNEL_ID", " 'slack-channel' ");

    const response = await POST(createInquiryRequest({
      plan: "enterprise",
      institution: "클래스잇",
      representativeName: "홍길동",
      email: "hello@classit.kr",
      phone: "010-1111-2222",
      contactMethod: "email",
      comments: "",
    }));

    expect(response.status).toBe(200);
    const fetchMock = vi.mocked(globalThis.fetch);
    const [, init] = fetchMock.mock.calls[0];
    const payload = JSON.parse(String(init?.body));

    expect(init?.headers).toMatchObject({
      Authorization: "Bearer slack-token",
    });
    expect(payload.channel).toBe("slack-channel");
  });
});
