# Vercel 배포 가이드

Classit 공개 랜딩과 공개 블로그는 Vercel의 기본 Next.js 배포로 운영한다.

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
SLACK_BOT_TOKEN=...
SLACK_CHANNEL_ID=...
```

이 저장소는 공개 조회만 담당하므로 Supabase service role key나 storage secret을 설정하지 않는다.

## Domains

- 공개 랜딩: `classit.kr`
- 공개 블로그: `classit.kr/blog`
- 관리자 콘솔: 별도 프로젝트에서 `admin.classit.co.kr`로 운영

Vercel Domains에서 `classit.kr`를 연결하고, 안내되는 DNS 레코드를 도메인 DNS 관리 화면에 추가한다.
