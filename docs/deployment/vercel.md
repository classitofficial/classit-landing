# Vercel 배포 가이드

Classit 랜딩과 블로그 CMS는 Vercel의 기본 Next.js 배포로 운영한다.

## Build Settings

- Framework Preset: `Next.js`
- Install Command: `pnpm install`
- Build Command: `pnpm run build`
- Output Directory: 비워둔다

## Environment Variables

Vercel Project Settings의 Environment Variables에 production 값을 넣는다.

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
SUPABASE_SECRET_KEY=...
SUPABASE_STORAGE_BUCKET=blog-assets
SLACK_BOT_TOKEN=...
SLACK_CHANNEL_ID=...
```

`SUPABASE_STORAGE_BUCKET` 기본값은 `blog-assets`다.

임시 디자인 피드백을 배포 환경에서 받을 때만 추가한다.

```bash
DESIGN_FEEDBACK_ENABLED=1
SLACK_DESIGN_FEEDBACK_CHANNEL_ID=...
```

`NEXT_PUBLIC_DESIGN_FEEDBACK_VISIBLE=1`을 빌드 환경에 추가하면 모든 방문자에게 우측 하단 버튼이 바로 보인다. 이 값을 빼면 `https://classit.kr/?design-feedback=1`로 접속한 브라우저에서만 버튼이 켜진다. 피드백 수집이 끝나면 `DESIGN_FEEDBACK_ENABLED`를 제거하고 다시 배포한다.

## Domains

- 공개 랜딩: `classit.kr`
- 공개 블로그: `classit.kr/blog`
- 관리자 CMS: 초기에는 `classit.kr/admin/blog`, 장기적으로는 `admin.classit.kr/blog` 분리 검토

Vercel Domains에서 `classit.kr`를 연결하고, 안내되는 DNS 레코드를 도메인 DNS 관리 화면에 추가한다.
