/**
 * User memory: summary + preferences.
 * Reads and writes from DB (MemorySummary model).
 */

import { prisma } from "@/lib/db/prisma";

export interface UserPreferences {
  favoriteGenres: string[];
  dislikedGenres: string[];
  moodHistory: string[];
  topicBlacklist: string[];
}

export interface UserMemory {
  summary: string;
  preferences: UserPreferences;
}

export async function getUserMemory(userId: string): Promise<UserMemory> {
  const record = await prisma.memorySummary.findUnique({ where: { userId } });
  if (!record) {
    return {
      summary: "",
      preferences: {
        favoriteGenres: [],
        dislikedGenres: [],
        moodHistory: [],
        topicBlacklist: [],
      },
    };
  }
  return {
    summary: record.summary,
    preferences: JSON.parse(record.preferencesJson) as UserPreferences,
  };
}

export async function upsertUserMemory(
  userId: string,
  update: Partial<UserMemory>
): Promise<void> {
  const existing = await getUserMemory(userId);
  const merged: UserMemory = {
    summary: update.summary ?? existing.summary,
    preferences: {
      ...existing.preferences,
      ...(update.preferences ?? {}),
    },
  };

  await prisma.memorySummary.upsert({
    where: { userId },
    create: {
      userId,
      summary: merged.summary,
      preferencesJson: JSON.stringify(merged.preferences),
    },
    update: {
      summary: merged.summary,
      preferencesJson: JSON.stringify(merged.preferences),
    },
  });
}

export function buildMemoryContextBlock(memory: UserMemory): string {
  if (!memory.summary && memory.preferences.favoriteGenres.length === 0) {
    return "";
  }
  const lines: string[] = [];
  if (memory.summary) lines.push(`Previous session summary: ${memory.summary}`);
  if (memory.preferences.favoriteGenres.length > 0)
    lines.push(`Favorite genres: ${memory.preferences.favoriteGenres.join(", ")}`);
  if (memory.preferences.moodHistory.length > 0)
    lines.push(
      `Recent moods: ${memory.preferences.moodHistory.slice(-3).join(" → ")}`
    );
  return lines.length ? `\nUSER MEMORY:\n${lines.join("\n")}\n` : "";
}
