/**
 * AI Provider abstraction layer.
 * Switch via AI_PROVIDER env: "openai" | "anthropic" | "mock"
 */

export interface AIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}
export interface AICompletionOptions {
  messages: AIMessage[];
  temperature?: number;
  maxTokens?: number;
}
export interface AICompletionResult {
  content: string;
  usage?: { promptTokens: number; completionTokens: number };
}
export interface AIProvider {
  complete(options: AICompletionOptions): Promise<AICompletionResult>;
}

// ── Mock Provider ────────────────────────────────────────────────────────────
class MockProvider implements AIProvider {
  async complete(options: AICompletionOptions): Promise<AICompletionResult> {
    const lastUser = options.messages.filter((m) => m.role === "user").pop();
    const input = lastUser?.content ?? "";
    const isSimulation = options.messages.some((m) =>
      m.content.includes("CHARACTER A") || m.content.includes("Generate the scene")
    );
    const isSummary = options.messages.some((m) =>
      m.content.includes("summarizing a dialogue scene")
    );
    const isRecommend = options.messages.some((m) =>
      m.content.includes("recommending music based on emotional context")
    );

    if (isSimulation) return { content: buildMockSimResponse(input), usage: { promptTokens: 80, completionTokens: 300 } };
    if (isSummary)    return { content: buildMockSummary(input),      usage: { promptTokens: 50, completionTokens: 120 } };
    if (isRecommend)  return { content: buildMockRecommendIntent(),    usage: { promptTokens: 40, completionTokens: 80 } };
    return { content: buildMockChatReply(input), usage: { promptTokens: 30, completionTokens: 100 } };
  }
}

// ── Chat reply pool ──────────────────────────────────────────────────────────
const HOLLOW_REPLIES = [
  { r: "그 텅 빈 감각, 잔향이 긴 공간처럼 들려. 메아리가 돌아오지 않는 방.", fq: "그 공간 안에서 지금 가장 크게 들리는 소리는 뭐야?", rn: "저음이 천천히 사라지는 음악이 어울려. 억지로 채우지 않아도 돼.", tags: ["hollow", "ambient", "space"] },
  { r: "비어있다는 게 꼭 나쁜 건 아니야. 그건 무언가를 지운 자리일 수도 있어.", fq: "그 느낌이 언제부터 시작됐어?", rn: "긴 여백이 있는 음악이 지금 네 상태와 가장 가까워.", tags: ["hollow", "reflective", "space"] },
  { r: "공백도 소리야. 무언가를 기다리는 주파수.", fq: "지금 그 공백이 불편해, 아니면 그냥 그런 거야?", rn: "극도로 고요한 음악 — 침묵이 언어가 되는 곡들.", tags: ["hollow", "silence", "waiting"] },
];

const CALM_REPLIES = [
  { r: "조용한 주파수가 느껴져. 지금 이 상태, 억지로 바꾸지 않아도 괜찮아.", fq: "지금 가장 편하게 들을 수 있는 소리는 어떤 느낌이야?", rn: "낮고 부드러운 음악 — 지금 이 순간을 방해하지 않는 것들.", tags: ["calm", "ambient", "gentle"] },
  { r: "평온함은 감정이 없는 게 아니야. 소리가 자기 자리를 알고 있는 상태야.", fq: "지금 이 조용함이 언제 가장 뚜렷하게 느껴져?", rn: "정돈된 텍스처의 음악이 지금 네 상태와 맞아.", tags: ["calm", "ordered", "clear"] },
  { r: "그 차분함, 긴 호흡이 있는 음악 같아. 서두르지 않는.", fq: "요즘 가장 자주 찾게 되는 소리가 있어?", rn: "빠르지 않고, 억지로 감동을 강요하지 않는 음악들.", tags: ["calm", "slow", "organic"] },
];

const SPARK_REPLIES = [
  { r: "뭔가 발견하고 싶은 주파수야. 아직 이름 없는 소리를 찾고 있는 것 같아.", fq: "지금 어떤 방향으로 끌리고 있어?", rn: "예상을 조금 비틀어주는 음악 — 익숙하지만 새로운.", tags: ["spark", "discovery", "new"] },
  { r: "에너지가 있어. 방향을 찾고 있는 것 같고.", fq: "요즘 새로 빠져든 게 있어?", rn: "리듬이 앞으로 당기는 음악 — 추진력이 있는 곡들.", tags: ["spark", "energy", "forward"] },
];

const ECHO_REPLIES = [
  { r: "오래된 소리가 돌아오고 있어. 기억이 주파수로 남는 건, 그게 진짜라는 증거야.", fq: "그 기억에서 가장 선명한 소리가 있어?", rn: "향수를 자극하는 텍스처 — 돌아가는 것 같지만 실은 앞으로 가는 음악.", tags: ["echo", "memory", "nostalgic"] },
  { r: "과거의 감정이 지금 울려. 그건 그때 네가 그걸 온전히 느꼈다는 뜻이야.", fq: "그 감정을 지금 어떻게 하고 싶어?", rn: "시간이 흐릿하게 느껴지는 음악 — 과거와 현재가 겹치는.", tags: ["echo", "past", "layered"] },
];

const STATIC_REPLIES = [
  { r: ".", fq: "지금 어때?", rn: "아무것도 없는 소리가 때로 가장 크게 들려.", tags: ["static", "silence", "minimal"] },
  { r: "알아.", fq: null, rn: "지금은 소리보다 여백이 필요할 수 있어.", tags: ["static", "empty", "pause"] },
];

const OVERDRIVE_REPLIES = [
  { r: "그 에너지, 터지기 직전의 주파수야. 억누를 필요 없어.", fq: "지금 그 에너지를 어디로 보내고 싶어?", rn: "전부 다 터트리는 음악 — 볼륨 다 올려도 돼.", tags: ["overdrive", "energy", "release"] },
  { r: "강한 주파수가 느껴져. 지금 이 순간은 조용한 음악이 필요한 타이밍이 아니야.", fq: "무엇 때문에 이렇게 달아올랐어?", rn: "처음부터 끝까지 밀어붙이는 음악들.", tags: ["overdrive", "intense", "peak"] },
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function detectEmotion(text: string): string {
  const t = text.toLowerCase();
  if (/텅 빈|hollow|empty|아무것도|공허/.test(t)) return "HOLLOW";
  if (/멈춤|끊김|아무것도|nothing|blank|frozen|정지/.test(t)) return "STATIC";
  if (/신나|excited|energy|에너지|올려|터져|최고/.test(t)) return "OVERDRIVE";
  if (/기억|추억|옛날|past|memory|그때|돌아/.test(t)) return "ECHO";
  if (/발견|새로|discover|spark|찾고|궁금/.test(t)) return "SPARK";
  return "CALM";
}

type ReplyEntry = { r: string; fq: string | null; rn: string; tags: string[] };

function buildMockChatReply(input: string): string {
  const state = detectEmotion(input);
  const pool: ReplyEntry[] = (({
    HOLLOW:    HOLLOW_REPLIES,
    CALM:      CALM_REPLIES,
    SPARK:     SPARK_REPLIES,
    ECHO:      ECHO_REPLIES,
    STATIC:    STATIC_REPLIES,
    OVERDRIVE: OVERDRIVE_REPLIES,
  } as Record<string, ReplyEntry[]>)[state] ?? CALM_REPLIES);

  const chosen = pickRandom(pool);
  const intent = { HOLLOW: "record", CALM: "stabilize", SPARK: "discover", ECHO: "record", STATIC: "stabilize", OVERDRIVE: "amplify" }[state] ?? "record";
  const lore = {
    HOLLOW:    "소리가 사라진 자리에서 새로운 주파수가 시작된다.",
    CALM:      "고요함은 감정의 부재가 아니라 통제된 진폭이다.",
    SPARK:     "아직 이름 없는 소리를 찾는 여정.",
    ECHO:      "기억은 주파수로 남아 되돌아온다.",
    STATIC:    "침묵도 소리다.",
    OVERDRIVE: "한계를 넘어 울리는 주파수.",
  }[state] ?? "소리로 감정을 기억한다.";

  return JSON.stringify({
    reply: chosen.r,
    followUpQuestion: chosen.fq,
    recommendationNarrative: chosen.rn,
    logCard: {
      emotionState: state,
      intent,
      tags: chosen.tags,
      shortLore: lore,
    },
  });
}

function buildMockSimResponse(input: string): string {
  const topic = input.match(/Topic: "([^"]+)"/)?.[1] ?? "음악";
  return JSON.stringify({
    messages: [
      { speaker: "echo",  content: `${topic}에 대해 이야기하자면, 나는 먼저 소리부터 생각해. 언어보다 주파수가 먼저 오거든.` },
      { speaker: "verse", content: `흥미로운 시작점이야. 근데 구조 없이 주파수만 있으면 그건 소음 아닐까? 패턴이 있어야 음악이 되지.` },
      { speaker: "echo",  content: `소음과 음악의 경계를 누가 정해? 듣는 사람이 의미를 찾는 순간 그게 음악이 돼.` },
      { speaker: "verse", content: `그럼 ${topic}도 결국 해석의 문제인 건가. 같은 소리를 두고 어떤 사람은 노이즈라 하고 어떤 사람은 예술이라 하는.` },
      { speaker: "echo",  content: `정확해. 그래서 나는 음악을 추천할 때 곡이 아니라 그 사람의 해석 방식을 먼저 읽으려 해.` },
      { speaker: "verse", content: `...그게 사실 이 대화 전체의 핵심이었네. 결론은 ${topic}은 답이 아니라 질문이라는 거야.` },
    ],
    sceneSummary: {
      tags: ["dialogue", "music-philosophy", "interpretation", "identity"],
      shortLore: `${topic}을 둘러싼 두 캐릭터의 시각 차이가 서로를 더 선명하게 만들었다.`,
      highlightLines: [
        `소음과 음악의 경계를 누가 정해?`,
        `듣는 사람이 의미를 찾는 순간 그게 음악이 돼.`,
        `${topic}은 답이 아니라 질문이야.`,
      ],
    },
  });
}

function buildMockSummary(input: string): string {
  return JSON.stringify({
    tags: ["cinematic", "dialogue", "tension", "music"],
    shortLore: "두 목소리가 서로 다른 주파수로 같은 진실에 다가갔다.",
    highlightLines: [
      "소음과 음악의 경계를 누가 정해?",
      "듣는 사람이 의미를 찾는 순간 그게 음악이 돼.",
    ],
  });
}

function buildMockRecommendIntent(): string {
  return JSON.stringify({ intent: "지금 이 감정의 파장에 맞는 소리들을 골랐어. 틀고 그냥 놔둬봐." });
}

// ── OpenAI Provider ──────────────────────────────────────────────────────────
class OpenAIProvider implements AIProvider {
  constructor(private apiKey: string) {}
  async complete(options: AICompletionOptions): Promise<AICompletionResult> {
    const { default: OpenAI } = await import("openai");
    const client = new OpenAI({ apiKey: this.apiKey });
    const res = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: options.messages,
      temperature: options.temperature ?? 0.75,
      max_tokens: options.maxTokens ?? 1024,
    });
    return {
      content: res.choices[0]?.message?.content ?? "",
      usage: { promptTokens: res.usage?.prompt_tokens ?? 0, completionTokens: res.usage?.completion_tokens ?? 0 },
    };
  }
}

// ── Anthropic Provider ───────────────────────────────────────────────────────
class AnthropicProvider implements AIProvider {
  constructor(private apiKey: string) {}
  async complete(options: AICompletionOptions): Promise<AICompletionResult> {
    const Anthropic = await import("@anthropic-ai/sdk");
    const client = new Anthropic.default({ apiKey: this.apiKey });
    const systemMsg = options.messages.find((m) => m.role === "system")?.content ?? "";
    const userMsgs = options.messages
      .filter((m) => m.role !== "system")
      .map((m) => ({ role: m.role as "user" | "assistant", content: m.content }));
    const res = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: options.maxTokens ?? 1024,
      system: systemMsg,
      messages: userMsgs,
    });
    const content = res.content[0]?.type === "text" ? res.content[0].text : "";
    return { content, usage: { promptTokens: res.usage.input_tokens, completionTokens: res.usage.output_tokens } };
  }
}

// ── Factory ──────────────────────────────────────────────────────────────────
let _provider: AIProvider | null = null;
export function getAIProvider(): AIProvider {
  if (_provider) return _provider;
  const type = process.env.AI_PROVIDER ?? "mock";
  if (type === "openai") {
    const key = process.env.OPENAI_API_KEY;
    if (!key) throw new Error("OPENAI_API_KEY is not set");
    _provider = new OpenAIProvider(key);
  } else if (type === "anthropic") {
    const key = process.env.ANTHROPIC_API_KEY;
    if (!key) throw new Error("ANTHROPIC_API_KEY is not set");
    _provider = new AnthropicProvider(key);
  } else {
    _provider = new MockProvider();
  }
  return _provider;
}
export function resetAIProvider(): void { _provider = null; }
