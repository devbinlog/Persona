/**
 * Character-Character Simulation Engine.
 */

import { getAIProvider } from "./provider";
import { buildSimPrompt, buildSummaryPrompt } from "./prompts";
import { moderateText } from "./moderation";
import { prisma } from "@/lib/db/prisma";

export const STYLE_PRESETS = [
  "calm cinematic",
  "spark debate",
  "echo reflective",
  "overdrive hype",
  "static minimal",
  "hollow gentle",
] as const;

export type StylePreset = (typeof STYLE_PRESETS)[number];

export interface SimMessage {
  speaker: string;
  content: string;
}

export interface SceneSummary {
  tags: string[];
  shortLore: string;
  highlightLines: string[];
}

export interface SimResult {
  messages: SimMessage[];
  sceneSummary: SceneSummary;
  sceneId: string;
  cardId: string;
}

export interface SimStartOptions {
  characterIds: string[];
  topic: string;
  stylePreset?: StylePreset;
  maxTurns?: number;
}

export async function runCharacterSim(options: SimStartOptions): Promise<SimResult> {
  const { characterIds, topic, stylePreset = "calm cinematic", maxTurns = 10 } = options;

  if (characterIds.length < 2) {
    throw new Error("At least 2 characters required for simulation");
  }

  const characters = await prisma.character.findMany({
    where: { id: { in: characterIds } },
  });

  if (characters.length < 2) {
    throw new Error("Characters not found");
  }

  const [charA, charB] = characters;

  // Moderate topic
  const topicMod = moderateText(topic);
  if (topicMod.decision === "HARD_BLOCK") {
    throw new Error("Topic contains prohibited content");
  }

  const provider = getAIProvider();

  const systemPrompt = buildSimPrompt(
    charA.slug,
    charA.personaConfigJson,
    charB.slug,
    charB.personaConfigJson,
    topic,
    stylePreset,
    maxTurns
  );

  const result = await provider.complete({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: `Generate the scene. Topic: "${topic}". Style: ${stylePreset}. Max ${maxTurns} turns.` },
    ],
    temperature: 0.8,
    maxTokens: 2048,
  });

  let parsed: { messages: SimMessage[]; sceneSummary: SceneSummary };

  try {
    const cleaned = extractJSON(result.content);
    parsed = JSON.parse(cleaned);
  } catch {
    // Fallback mock
    parsed = buildMockSimResult(charA.slug, charB.slug, topic, maxTurns);
  }

  // Enforce maxTurns
  if (parsed.messages.length > maxTurns) {
    parsed.messages = parsed.messages.slice(0, maxTurns);
  }

  // Filter flagged messages
  parsed.messages = parsed.messages.filter((m) => {
    const mod = moderateText(m.content);
    return mod.decision !== "HARD_BLOCK";
  });

  // Generate summary if missing or poor
  if (!parsed.sceneSummary || !parsed.sceneSummary.shortLore) {
    parsed.sceneSummary = await generateSummary(parsed.messages, topic);
  }

  // Save to DB
  const conversation = await prisma.conversation.create({
    data: {
      type: "CHARACTER_SIM",
      updatedAt: new Date(),
    },
  });

  // Save messages
  for (const msg of parsed.messages) {
    const char = characters.find((c) => c.slug === msg.speaker);
    await prisma.message.create({
      data: {
        conversationId: conversation.id,
        authorType: "CHARACTER",
        authorCharacterId: char?.id,
        content: msg.content,
      },
    });
  }

  // Save LogCard(SCENE)
  const payload = {
    sceneId: conversation.id,
    topic,
    characterIds,
    characterSlugs: characters.map((c) => c.slug),
    stylePreset,
    maxTurns,
    tags: parsed.sceneSummary.tags,
    shortLore: parsed.sceneSummary.shortLore,
    highlightLines: parsed.sceneSummary.highlightLines,
    views: 0,
    likes: 0,
    createdAt: new Date().toISOString(),
  };

  const card = await prisma.logCard.create({
    data: {
      type: "SCENE",
      payloadJson: JSON.stringify(payload),
      conversationId: conversation.id,
    },
  });

  return {
    messages: parsed.messages,
    sceneSummary: parsed.sceneSummary,
    sceneId: conversation.id,
    cardId: card.id,
  };
}

async function generateSummary(
  messages: SimMessage[],
  topic: string
): Promise<SceneSummary> {
  const provider = getAIProvider();
  const prompt = buildSummaryPrompt(messages, topic);

  try {
    const res = await provider.complete({
      messages: [
        { role: "system", content: "You are a scene curator. Output strict JSON only." },
        { role: "user", content: prompt },
      ],
      temperature: 0.5,
      maxTokens: 512,
    });
    const cleaned = extractJSON(res.content);
    return JSON.parse(cleaned);
  } catch {
    return {
      tags: ["cinematic", "dialogue", "music"],
      shortLore: `${topic}을 주제로 한 두 캐릭터의 대화.`,
      highlightLines: messages.slice(0, 3).map((m) => m.content.slice(0, 80)),
    };
  }
}

function buildMockSimResult(
  slugA: string,
  slugB: string,
  topic: string,
  maxTurns: number
): { messages: SimMessage[]; sceneSummary: SceneSummary } {
  const turns = Math.min(maxTurns, 6);
  const messages: SimMessage[] = [];
  for (let i = 0; i < turns; i++) {
    const speaker = i % 2 === 0 ? slugA : slugB;
    messages.push({
      speaker,
      content: `[${speaker}] ${topic}에 대해 이야기하자면... (턴 ${i + 1})`,
    });
  }
  return {
    messages,
    sceneSummary: {
      tags: ["dialogue", "music", topic.split(" ")[0]],
      shortLore: `${slugA}과 ${slugB}이 ${topic}을 주제로 나눈 대화.`,
      highlightLines: messages.slice(0, 2).map((m) => m.content),
    },
  };
}

function extractJSON(text: string): string {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("No JSON found");
  return text.slice(start, end + 1);
}
