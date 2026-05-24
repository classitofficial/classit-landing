import { NextRequest, NextResponse } from "next/server";

const CONTACT_METHOD_LABELS: Record<string, string> = {
  kakao: "카카오톡/문자",
  email: "이메일",
  phone: "전화",
};

const PLAN_LABELS: Record<string, string> = {
  premium: "Premium Plan",
  enterprise: "Enterprise Plan",
};

export async function POST(request: NextRequest) {
  const token = process.env.SLACK_BOT_TOKEN;
  const channel = process.env.SLACK_CHANNEL_ID;
  if (!token || !channel) {
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

  const slackPayload = {
    channel,
    text: "클래스잇 도입 상담 신청",
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "📋 클래스잇 도입 상담 신청",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `>*플랜 :* ${planLabel}\n>*담당자 :* ${representativeName} / ${institution} (${email} / ${phone})\n>*연락 방법 :* ${contactLabel}${comments ? `\n>*추가 내용 :* ${comments}` : ""}`,
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
    return NextResponse.json(
      { error: `Slack 오류: ${slackData.error}` },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
