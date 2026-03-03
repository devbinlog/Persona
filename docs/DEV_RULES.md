# Development Rules
## Music × Character × Conversation AI Project

### Core
- AI는 도구, 주인공은 캐릭터 IP
- 모든 기능은 세계관으로 설명 가능해야 함
- 자유 생성보다 구조(상태/규칙/제약)가 우선
- 가사 생성 금지, 스트리밍 금지, 모더레이션 필수

### Engineering
- 문서 → 데이터 → API → AI 레이어 → UI 순서 준수
- 목적 단위 파일 분리(emotion/persona/memory/moderation/sim)
- "일단 되게" 금지: 규칙 위반 코드는 삭제/수정

### Failure Signals
- 캐릭터 없이도 서비스가 설명됨
- 음악 없이도 대화가 성립됨
- 감정 상태가 UI/카드에 반영되지 않음
- 기능 설명에 "AI가 알아서"가 등장함
