<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md

이 저장소는 `zerofee-edu` 랜딩을 복제해서 만든 클래스잇(`Classit`) 공개 랜딩 및 공개 블로그 프로젝트입니다. 이후 작업자는 기존 제로피에듀 브랜드를 직접 수정하는 것이 아니라, 이 저장소에서 클래스잇 기준으로 전환합니다.

## 프로젝트 목적

- 클래스잇 공개 랜딩 페이지를 제공합니다.
- 클래스잇 공개 블로그 목록/상세 페이지를 제공합니다.
- 관리자 콘솔은 별도 프로젝트(`/Users/sangkun/classit/classit-admin`)와 별도 도메인(`https://admin.classit.co.kr`)에서 관리합니다.
- 제로피에듀 원본 저장소와 배포/도메인/remote를 섞지 않습니다.

## 기본 작업 원칙

- 기존 `zerofee-edu` 문구, 이미지, 메타데이터, 도메인, OG 태그는 클래스잇 기준으로 교체합니다.
- 디자인은 사용자가 제공한 클래스잇 디자인을 우선합니다. 구현 전에 디자인 파일, 이미지, 카피, 도메인 정책의 출처를 확인합니다.
- `.env*`, `.vercel`, 인증 토큰, API key, production DB URL, 쿠키, private key는 저장소에 추가하지 않습니다.
- `.next/`, `node_modules/`, 빌드 산출물은 수정 대상으로 보지 않습니다.
- 로컬/배포 설정이 필요하면 예시 파일이나 문서로 남기고 실제 secret 값은 기록하지 않습니다.

## 도메인과 라우트 원칙

- 공개 랜딩: `https://classit.kr/`
- 공개 블로그 목록: `https://classit.kr/blog`
- 공개 블로그 상세: `https://classit.kr/blog/[slug]`
- 관리자 콘솔: `https://admin.classit.co.kr`
- 이 저장소에는 `/admin` 라우트와 관리자 API를 두지 않습니다.
- 공개 블로그는 메인 도메인의 하위 경로(`/blog`)에 두어 검색 자산이 `classit.kr`에 쌓이게 합니다.

## 공개 블로그 범위

블로그 콘텐츠와 프로모션 배너는 별도 관리자 콘솔에서 Supabase에 작성합니다. 이 저장소는 공개 사이트로서 published 글과 active 배너만 읽어 표시합니다.

필수 공개 화면:

- 블로그 목록
- 블로그 상세

기본 글 데이터는 최소한 다음 필드를 고려합니다.

- `title`
- `slug`
- `summary`
- `content`
- `thumbnail`
- `status` (`draft`, `published`)
- `publishedAt`
- `seoTitle`
- `seoDescription`
- `author`
- `category` 또는 `tags`

## 구현 순서

1. 클래스잇 랜딩 전환을 먼저 완료합니다.
2. 공개 블로그 목록/상세 라우트를 클래스잇 기준으로 유지합니다.
3. 공개 사이트는 Supabase publishable key로 published 글과 active 배너만 조회합니다.
4. 관리자 작성/수정/업로드/인증 기능은 별도 관리자 프로젝트에서 구현합니다.
5. 배포 전 `pnpm lint`와 `pnpm build`를 확인합니다.

## Next.js 작업 규칙

- 이 프로젝트는 Next.js App Router 기반입니다.
- Next.js 관련 코드를 수정하기 전 `node_modules/next/dist/docs/`의 현재 버전 문서를 우선 확인합니다.
- 기존 컴포넌트 구조와 스타일 패턴을 먼저 읽고, 필요한 범위 안에서만 변경합니다.
- 공개 페이지는 SEO 메타데이터, OG 이미지, canonical URL을 클래스잇 도메인 기준으로 관리합니다.
