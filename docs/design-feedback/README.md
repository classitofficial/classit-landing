# Design Feedback

로컬 개발 환경에서 우측 하단 `디자인 피드백` 버튼을 눌러 화면 요소를 선택하고 코멘트를 남긴다.

- 저장 위치: `docs/design-feedback/*.md`
- 저장 내용: URL, Path, Element, Rect, Text, Comment
- 로컬 노출 조건: `NODE_ENV !== "production"`
- 저장 API: `POST /api/dev/design-feedback`

프로덕션 배포에서 임시로 디자인 피드백을 받을 때는 파일 저장 대신 Slack으로 보낸다.

- 활성화: `DESIGN_FEEDBACK_ENABLED=1`
- 기본 노출: `NEXT_PUBLIC_DESIGN_FEEDBACK_VISIBLE=1`
- 숨김 링크로만 노출: `DESIGN_FEEDBACK_ENABLED=1`만 설정한 뒤 `?design-feedback=1`로 접속
- 브라우저에서 다시 숨김: `?design-feedback=0`
- Slack 채널: `SLACK_DESIGN_FEEDBACK_CHANNEL_ID`가 있으면 우선 사용하고, 없으면 `SLACK_CHANNEL_ID`를 사용한다.

프로덕션에서 `DESIGN_FEEDBACK_ENABLED=1`이 없으면 저장 API가 404로 응답한다.

## 처리 규칙

디자인 피드백 처리 작업을 시작하면 `docs/design-feedback/*.md` 전체를 작업 큐로 본다.

구현 완료한 피드백 파일은 `docs/design-feedback/deprecated/`로 이동한다. 새로 들어온 피드백만 상위 폴더에 남겨둔다.
