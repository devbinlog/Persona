# API Specification v1

## POST /api/chat
req: { message, userId }
res: { reply, emotionState, recommendations[], logCardId }

## POST /api/recommend
req: { mood?, energy?, genres? }
res: { items[], intent }

## Lounge
- POST /api/lounge/message (send)
- GET /api/lounge/messages (recent)
- GET /api/lounge/stream (SSE subscribe)

## Character Sim
- POST /api/sim/start { characterIds[], topic, stylePreset?, maxTurns? }
  res: { sceneId, cardId, messages[] }

## Scenes
- GET /api/scenes?sort=latest|popular&characterId=&tag=
  res: { scenes: SceneCard[] }
- GET /api/scenes/:id
  res: { sceneCard, messages, characters }
- POST /api/scenes/:id/view
  res: { views: number }
- POST /api/scenes/:id/like (optional)
  res: { likes: number }

## Cards
- GET /api/cards?userId=
- GET /api/cards/:id

## Moderation
- POST /api/report
- POST /api/block

## Error Response (unified)
{ "error": { "code": string, "message": string, "details"?: any } }
