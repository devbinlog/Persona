/**
 * AI Provider abstraction layer.
 * Switch between OpenAI / Anthropic / Mock via AI_PROVIDER env var.
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

// ── Mock Provider (no API key needed) ──────────────────────────────────────
class MockProvider implements AIProvider {
  async complete(options: AICompletionOptions): Promise<AICompletionResult> {
    const lastUser = options.messages.filter((m) => m.role === "user").pop();
    const input = lastUser?.content ?? "";

    // Detect intent from input and produce structured mock JSON
    const emotionState = detectMockEmotion(input);
    const mockReply = buildMockChatReply(input, emotionState);

    return { content: mockReply, usage: { promptTokens: 20, completionTokens: 80 } };
  }
}

function detectMockEmotion(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes("신나") || lower.includes("energy") || lower.includes("excited")) return "OVERDRIVE";
  if (lower.includes("슬프") || lower.includes("sad") || lower.includes("hollow")) return "HOLLOW";
  if (lower.includes("조용") || lower.includes("quiet") || lower.includes("calm")) return "CALM";
  if (lower.includes("기억") || lower.includes("memory") || lower.includes("past")) return "ECHO";
  if (lower.includes("발견") || lower.includes("discover") || lower.includes("spark")) return "SPARK";
  if (lower.includes("멈춤") || lower.includes("아무것도") || lower.includes("nothing")) return "STATIC";
  return "CALM";
}

function buildMockChatReply(input: string, emotionState: string): string {
  return JSON.stringify({
    reply: `그 감정, 소리로 기억할게. 지금 네가 말한 건 ${emotionState.toLowerCase()} 주파수처럼 들려.`,
    followUpQuestion: "지금 가장 먼저 떠오르는 소리는 뭐야?",
    recommendationNarrative: "이런 순간엔 질감이 얇고 여백이 많은 음악이 어울려.",
    logCard: {
      emotionState,
      intent: "record",
      tags: ["ambient", "introspective", "soft"],
      shortLore: "소리가 감정을 기억한다.",
    },
  });
}

// ── OpenAI Provider ─────────────────────────────────────────────────────────
class OpenAIProvider implements AIProvider {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async complete(options: AICompletionOptions): Promise<AICompletionResult> {
    const { default: OpenAI } = await import("openai");
    const client = new OpenAI({ apiKey: this.apiKey });

    const res = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: options.messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 1024,
    });

    return {
      content: res.choices[0]?.message?.content ?? "",
      usage: {
        promptTokens: res.usage?.prompt_tokens ?? 0,
        completionTokens: res.usage?.completion_tokens ?? 0,
      },
    };
  }
}

// ── Anthropic Provider ───────────────────────────────────────────────────────
class AnthropicProvider implements AIProvider {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

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
    return {
      content,
      usage: {
        promptTokens: res.usage.input_tokens,
        completionTokens: res.usage.output_tokens,
      },
    };
  }
}

// ── Factory ──────────────────────────────────────────────────────────────────
let _provider: AIProvider | null = null;

export function getAIProvider(): AIProvider {
  if (_provider) return _provider;

  const providerType = process.env.AI_PROVIDER ?? "mock";

  if (providerType === "openai") {
    const key = process.env.OPENAI_API_KEY;
    if (!key) throw new Error("OPENAI_API_KEY is not set");
    _provider = new OpenAIProvider(key);
  } else if (providerType === "anthropic") {
    const key = process.env.ANTHROPIC_API_KEY;
    if (!key) throw new Error("ANTHROPIC_API_KEY is not set");
    _provider = new AnthropicProvider(key);
  } else {
    _provider = new MockProvider();
  }

  return _provider;
}

export function resetAIProvider(): void {
  _provider = null;
}
