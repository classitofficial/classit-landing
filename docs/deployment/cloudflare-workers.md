# Cloudflare Workers 배포 가이드

Classit 공개 랜딩과 공개 블로그는 Next.js App Router 앱이므로 Cloudflare Workers + OpenNext로 배포한다.

## 로컬 검증

```bash
pnpm lint
pnpm build
pnpm exec opennextjs-cloudflare build
pnpm exec wrangler deploy --dry-run --outdir /private/tmp/classit-cf-dry-run
```

## 환경변수

Cloudflare 대시보드의 Worker 설정 또는 `wrangler secret put`으로 production 값을 넣는다.

필수:

```bash
SLACK_BOT_TOKEN
SLACK_CHANNEL_ID
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
```

이 저장소는 공개 조회만 담당하므로 Supabase service role key나 storage secret을 설정하지 않는다. 블로그/배너 작성과 업로드는 별도 관리자 프로젝트에서 처리한다.

로컬 Cloudflare preview가 필요하면 `.dev.vars.example`을 `.dev.vars`로 복사한 뒤 필요한 값을 채운다. `.dev.vars`는 커밋하지 않는다.

## 배포

Codex/CI처럼 비대화형 환경에서 배포할 때는 `CLOUDFLARE_API_TOKEN`이 필요하다.

```bash
CLOUDFLARE_API_TOKEN=... pnpm run deploy:cf
```

로컬 터미널에서 직접 로그인해서 배포할 때는 먼저 아래 명령으로 Cloudflare 로그인을 끝낸 뒤 배포한다.

```bash
pnpm exec wrangler login
pnpm run deploy:cf
```

이 스크립트는 `--keep-vars`를 사용하므로 Cloudflare 대시보드에 이미 등록한 환경변수를 배포 과정에서 지우지 않는다.

배포 전 Worker 이름은 `wrangler.jsonc`의 `name` 값인 `classit-landing`을 사용한다.

## 도메인 연결

Cloudflare Workers의 Custom Domains에서 아래 도메인을 연결한다.

```text
classit.kr
www.classit.kr
```

DNS도 Cloudflare에서 관리하면 같은 계정 안에서 Worker custom domain 연결만 진행하면 된다.

## 이후 공개 데이터 캐시

현재 OpenNext incremental cache는 별도 R2 캐시 없이 시작한다. 공개 블로그/배너 조회량이 늘어나면 R2 bucket을 만들고 `open-next.config.ts`에 R2 incremental cache를 활성화한다.
