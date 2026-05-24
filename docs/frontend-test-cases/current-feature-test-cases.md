# Current Feature Test Cases

## 디자인 피드백 도구

| ID | 우선순위 | 화면/API | 케이스 | 기대 결과 |
| --- | --- | --- | --- | --- |
| FEEDBACK-001 | P1 | local/dev 전체 | 로컬 화면을 연다 | 우측 하단에 `디자인 피드백` CTA가 표시된다 |
| FEEDBACK-002 | P1 | local/dev 전체 | `디자인 피드백`을 클릭하고 요소 위에 마우스를 올린다 | 검사 도구처럼 선택 대상 레이아웃 하이라이트가 표시된다 |
| FEEDBACK-003 | P1 | local/dev 전체 | 요소를 클릭한다 | 선택 요소 selector, 크기, 좌표, 텍스트와 코멘트 입력 패널이 표시된다 |
| FEEDBACK-004 | P1 | `/api/dev/design-feedback` | 코멘트를 입력하고 저장한다 | 저장 중 표시가 나타나고 `docs/design-feedback/*.md` 파일이 생성된다 |
| FEEDBACK-005 | P1 | local/dev 전체 | 적용 완료된 피드백 문서를 정리한다 | 적용된 파일은 `docs/design-feedback/deprecated/`로 이동하고 inbox에는 새 피드백만 남는다 |
| FEEDBACK-006 | P1 | production build | 프로덕션 모드 화면/API를 확인한다 | 디자인 피드백 CTA와 저장 API는 사용할 수 없다 |

## 수동 검증 기록

- 2026-05-24: `npm run lint` 통과. 기존 `<img>` 사용과 미사용 변수 경고 26건은 남아 있음.
- 2026-05-24: `npm run build` 통과. 샌드박스 내부 실행은 Turbopack worker port bind 제한으로 실패했고, 승인된 외부 실행에서 성공함.
- 2026-05-24: 기존 dev 서버 `http://localhost:3000`에서 `POST /api/dev/design-feedback` 호출 시 `docs/design-feedback/*.md`가 생성되고 URL, Path, Element, Rect, Text, Comment가 저장되는 것을 확인함. 검증용 생성 파일은 작업 큐에서 제거함.
- 2026-05-24: 빈 코멘트로 `POST /api/dev/design-feedback` 호출 시 `{"ok":false,"message":"피드백 내용을 확인해주세요."}` 응답을 확인함.
- 2026-05-24: `next start --port 3006` production 서버에서 `POST /api/dev/design-feedback`가 404로 응답하고, production HTML에 `디자인 피드백`, `app_components_dev`, `DesignFeedbackWidget` 문자열이 없음을 확인함.
