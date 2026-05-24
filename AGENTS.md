<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md

이 저장소는 `zerofee-edu` 랜딩을 복제해서 만든 클래스잇(`Classit`) 랜딩 및 블로그 CMS 프로젝트입니다. 이후 작업자는 기존 제로피에듀 브랜드를 직접 수정하는 것이 아니라, 이 저장소에서 클래스잇 기준으로 전환합니다.

## 프로젝트 목적

- 클래스잇 공개 랜딩 페이지를 제공합니다.
- 클래스잇 블로그 공개 페이지와 CMS 관리자 화면을 제공합니다.
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
- 관리자 CMS는 장기적으로 `https://admin.classit.kr/blog` 분리를 우선 검토합니다.
- 초기 구현에서 별도 관리자 도메인 구성이 늦어지면 `/admin/blog`를 임시 경로로 둘 수 있지만, 공개 블로그와 관리자 화면의 인증/SEO 정책은 분리합니다.
- 공개 블로그는 메인 도메인의 하위 경로(`/blog`)에 두어 검색 자산이 `classit.kr`에 쌓이게 합니다.

## 블로그 CMS 범위

블로그는 markdown 파일 수동 배포가 아니라 CMS로 구현합니다. 관리자가 웹 화면에서 작성, 수정, 임시저장, 발행/비공개 전환을 할 수 있어야 합니다.

필수 공개 화면:

- 블로그 목록
- 블로그 상세

필수 관리자 화면:

- 관리자 블로그 목록
- 글 작성
- 글 수정
- 발행 상태 관리

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
2. 블로그 공개 라우트와 관리자 CMS 라우트 구조를 확정합니다.
3. CMS 저장소와 인증 방식을 결정합니다.
4. 사용자가 제공한 블로그 디자인 기준으로 목록, 상세, 관리자 화면을 구현합니다.
5. 배포 전 `npm run lint`와 `npm run build`를 확인합니다.

## Next.js 작업 규칙

- 이 프로젝트는 Next.js App Router 기반입니다.
- Next.js 관련 코드를 수정하기 전 `node_modules/next/dist/docs/`의 현재 버전 문서를 우선 확인합니다.
- 기존 컴포넌트 구조와 스타일 패턴을 먼저 읽고, 필요한 범위 안에서만 변경합니다.
- 공개 페이지는 SEO 메타데이터, OG 이미지, canonical URL을 클래스잇 도메인 기준으로 관리합니다.
