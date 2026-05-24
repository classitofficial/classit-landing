# Design Feedback

로컬 개발 환경에서 우측 하단 `디자인 피드백` 버튼을 눌러 화면 요소를 선택하고 코멘트를 남긴다.

- 저장 위치: `docs/design-feedback/*.md`
- 저장 내용: URL, Path, Element, Rect, Text, Comment
- 노출 조건: `NODE_ENV !== "production"`
- 저장 API: `POST /api/dev/design-feedback`

프로덕션 빌드에서는 위젯을 렌더링하지 않고 저장 API도 404로 응답한다.

## 처리 규칙

디자인 피드백 처리 작업을 시작하면 `docs/design-feedback/*.md` 전체를 작업 큐로 본다.

구현 완료한 피드백 파일은 `docs/design-feedback/deprecated/`로 이동한다. 새로 들어온 피드백만 상위 폴더에 남겨둔다.
