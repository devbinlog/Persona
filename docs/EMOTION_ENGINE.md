# Emotion State Engine
## 규칙 기반 상태 머신

### States
CALM, SPARK, ECHO, STATIC, OVERDRIVE, HOLLOW

### Signals(JSON)
energy(0-100), valence(-1..1), social(0-100), confidence(0-100), keywords[], genres[], intent_hint

### Hard Rules
- energy<=25 && valence<=-0.35 => HOLLOW
- social<=20 && confidence<=35 or "멈춤/끊김/아무것도" 키워드 => STATIC
- energy>=80 && valence>=0.25 => OVERDRIVE

### Soft Rules (fallback)
- intent_hint=stabilize => CALM 우선
- intent_hint=discover => SPARK 우선
- intent_hint=record => ECHO 우선
- 그 외 energy/valence 근접도로 CALM/SPARK/ECHO 중 선택

### Output Constraints per State
- CALM: 정리, 단정X, 질문 1개
- SPARK: 발견, 가벼운 추진, 과장X
- ECHO: 회고, 해결 강요X
- STATIC: 짧게, 농담X
- OVERDRIVE: 추진, 위험 행동 유도X
- HOLLOW: 부드럽게, 과동조X

### Must Reflect
- UI badge + logCard(emotionState, intent, tags, shortLore)
