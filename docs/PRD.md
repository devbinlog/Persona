# PRD
## Project: EchoPersona
### AI Character × Music Dialogue × Community

## 1. 제품 개요
EchoPersona는 AI 캐릭터 {CHAR_NAME}과 사용자가 음악을 언어로 대화하고,
그 기록을 카드 형태로 저장하며,
사용자 간 및 캐릭터 간 상호작용까지 확장되는 음악 기반 IP 플랫폼이다.

## 2. 문제 정의
1. 음악 추천은 기능 중심이다. 감정과 서사가 부족하다.
2. AI 챗봇은 인격 연속성이 약하다.
3. 팬 경험은 기록되지 않고 사라진다.
4. 커뮤니티와 캐릭터 IP가 분리되어 있다.

## 3. 핵심 가치 제안
| 기능 | 가치 |
|------|------|
| AI 음악 대화 | 음악을 통해 감정 정리 |
| 로그 카드 | 기록 가능한 경험 |
| 팬 라운지 | 감정 공유 커뮤니티 |
| 캐릭터 라운지 | 세계관 확장 콘텐츠 |

## 4. 사용자 유형
### 1) 음악 감정 탐색형
오늘의 기분을 음악으로 정리하고 싶은 사용자
### 2) 커뮤니티 참여형
음악 감정 카드 공유 및 공감
### 3) 세계관 소비형
캐릭터-캐릭터 대화 관전

## 5. 핵심 기능
### A. AI 음악 대화
감정 입력 → Emotion State Engine → 음악 추천 + 의도 설명 → 오늘의 로그 카드 생성
### B. 음악 추천 모듈
입력: 감정, 상황, 장르 키워드
출력: 추천(3~5), 의도 설명, 태그
가드레일: 가사 전문 금지, 음원 제공 금지(링크/메타만)
### C. 팬 라운지
실시간 채팅(SSE), 카드 공유, 신고/차단, 닉네임 기반
### D. 캐릭터 라운지(시뮬)
캐릭터 선택 + 주제 + 턴 제한 대화 + Scene Log Card

## 6. UX 구조(IA)
```
/ (Home)
├── /chat         - Talk to {CHAR_NAME}
├── /recommend    - Music Recommend
├── /lounge       - Fan Lounge (SSE)
├── /character-lounge      - Character Lounge (Feed)
│   └── /character-lounge/new  - New Scene
├── /scenes/[id]  - Scene Watch Page
└── /archive      - Log Card Archive
```

## 7. Scene 피드/관전 UX
- /character-lounge: 최신 Scene 피드(필터: tag/캐릭터/최신순)
- /scenes/[id]: Scene 전체 대화 대본 + Scene Log Card
- 생성: 캐릭터 선택 + topic + stylePreset + maxTurns

## 8. 성공 지표(MVP)
세션 평균 대화 턴 ≥ 4
카드 저장률 ≥ 60%
라운지 재방문율 ≥ 30%
캐릭터 라운지 이용률 ≥ 15%

## 9. 비목표
스트리밍, 결제, 고도화 추천, 앱

## 10. 기술 전략
기능 완성이 아니라 IP 구조가 유지되는 MVP를 만든다.
