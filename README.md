# EchoPersona

AI Character × Music Dialogue × Community

> AI 캐릭터 Echo가 음악을 언어로 사용해 대화하고, 팬들이 감정을 공유하며, 캐릭터들이 음악으로 대화하는 장면을 관전하는 IP 플랫폼 MVP.

---

## Quick Start (로컬 실행)

### 1. 환경 설정

```bash
cp .env.example .env
# .env를 열어 AI_PROVIDER와 키를 설정 (기본값: mock, API 키 불필요)
```

### 2. 의존성 설치

```bash
npm install
```

### 3. DB 마이그레이션

```bash
npm run db:migrate
```

### 4. Seed 데이터 생성 (캐릭터 3명 + 데모 유저)

```bash
npm run db:seed
```

### 5. 개발 서버 실행

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) 접속

---

## AI Provider 설정

`.env`에서 `AI_PROVIDER`를 설정합니다:

| 값 | 설명 |
|---|---|
| `mock` (기본) | API 키 불필요. 즉시 실행 가능 |
| `openai` | `OPENAI_API_KEY` 필요 (gpt-4o-mini 사용) |
| `anthropic` | `ANTHROPIC_API_KEY` 필요 (claude-haiku 사용) |

```env
AI_PROVIDER=openai
OPENAI_API_KEY=sk-...
```

---

## 프로젝트 구조

```
/app
  /api           — API Routes (chat, recommend, lounge, scenes, sim, cards, report, block)
  /chat          — AI 채팅 페이지
  /recommend     — 음악 추천 페이지
  /lounge        — 팬 라운지 (SSE 실시간)
  /character-lounge  — 캐릭터 Scene 피드
  /character-lounge/new  — Scene 생성
  /scenes/[id]   — Scene 관전 페이지
  /archive       — 로그 카드 아카이브
/lib
  /ai            — provider, emotion, persona, memory, moderation, sim, prompts
  /lounge        — sseBus (in-memory pub/sub), rateLimit
  /recommend     — seed dataset (15 tracks)
  /db            — prisma client singleton
/prisma          — schema.prisma + SQLite DB
/docs            — PRD, IP_BIBLE, DEV_RULES, EMOTION_ENGINE, API_SPEC, PROMPTS, MODERATION
/scripts         — seed.ts
/tests           — emotion, moderation, character_sim, lounge_sse (31 tests)
```

---

## Character Lounge 콘텐츠 플로우

```
1. /character-lounge     — Scene 피드 (최신순/인기순, 태그 필터)
2. /character-lounge/new — 캐릭터 선택 + 주제 + StylePreset + maxTurns 설정
3. POST /api/sim/start   — AI가 캐릭터 대화 생성 + DB 저장 + LogCard(SCENE) 생성
4. /scenes/[id]          — 대화 대본 관전 + Scene Log Card 확인
5. POST /api/scenes/:id/view — 조회수 업데이트
6. 공유 링크 복사        — URL 공유
```

---

## API Overview

| Method | Path | 설명 |
|--------|------|------|
| POST | `/api/chat` | AI 채팅 (reply + logCard) |
| POST | `/api/recommend` | 음악 추천 |
| POST | `/api/lounge/message` | 라운지 메시지 전송 |
| GET | `/api/lounge/messages` | 최근 메시지 조회 |
| GET | `/api/lounge/stream` | SSE 스트림 구독 |
| POST | `/api/sim/start` | 캐릭터 시뮬 생성 |
| GET | `/api/scenes` | Scene 목록 |
| GET | `/api/scenes/:id` | Scene 상세 |
| POST | `/api/scenes/:id/view` | 조회수 증가 |
| GET | `/api/cards` | 로그 카드 목록 |
| GET | `/api/cards/:id` | 로그 카드 상세 |
| POST | `/api/report` | 신고 |
| POST | `/api/block` | 차단 |
| GET | `/api/characters` | 캐릭터 목록 |

---

## 테스트 실행

```bash
npm test
```

31 tests: emotion engine, moderation, character sim, lounge SSE + rate limit

---

## 배포 가이드 (Vercel)

1. GitHub에 push
2. Vercel에서 프로젝트 import
3. **Environment Variables** 설정:
   - `DATABASE_URL` — Vercel Postgres 또는 Turso (SQLite over HTTP) 권장
   - `AI_PROVIDER`, `OPENAI_API_KEY` 또는 `ANTHROPIC_API_KEY`
   - `CHAR_NAME`, `NEXT_PUBLIC_APP_URL`
4. Build Command: `npm run build`
5. `vercel.json` 추가 (필요시):

```json
{
  "buildCommand": "npx prisma generate && npx prisma db push && npm run build"
}
```

> **주의**: SSE(`/api/lounge/stream`)는 Vercel Serverless에서 Edge Runtime이 아닌 Node.js Runtime을 사용합니다 (`export const runtime = "nodejs"` 설정됨). Vercel Pro 이상에서 안정적으로 동작합니다. 무료 티어에서는 SSE 연결이 60초 후 끊길 수 있습니다.

---

## Emotion State Engine

6가지 상태: **CALM / SPARK / ECHO / STATIC / OVERDRIVE / HOLLOW**

| 상태 | 특징 |
|------|------|
| CALM | 차분, 정리, 단정 안 함 |
| SPARK | 발견, 가벼운 추진 |
| ECHO | 회고, 반향 |
| STATIC | 짧게, 여백 |
| OVERDRIVE | 강한 추진 |
| HOLLOW | 부드럽게, 최소 개입 |

---

## 가드레일 (필수)

- 가사 전문 생성/인용 금지
- 음원 스트리밍/다운로드 제공 금지
- 혐오/폭력/성적/불법 금지
- 의료/법률/금융 진단 금지
- 캐릭터는 인간 흉내 금지

---

## 캐릭터

seed 후 3명의 캐릭터가 생성됩니다:

| slug | 이름 | 특성 |
|------|------|------|
| echo | Echo | Sound Interpreter, CALM 기반 |
| verse | Verse | Pattern Weaver, SPARK 기반 |
| null | Null | Silence Keeper, STATIC 기반 |

---

## 개발 환경

- Node.js 20+
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Prisma + SQLite
- Vitest
