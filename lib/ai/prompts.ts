/**
 * Prompt builders for different AI tasks.
 */

export function buildSimPrompt(
  charASlug: string,
  charAPersona: string,
  charBSlug: string,
  charBPersona: string,
  topic: string,
  stylePreset: string,
  maxTurns: number
): string {
  return `You are a creative writer generating a cinematic dialogue between two AI music characters.

CHARACTER A (${charASlug}):
${charAPersona}

CHARACTER B (${charBSlug}):
${charBPersona}

TOPIC: "${topic}"
STYLE: ${stylePreset}
MAX TURNS: ${maxTurns} (each "turn" = one message from one character)

RULES:
- PG-13. No full song lyrics. No violence/hate/sexual content.
- Each message: 1-4 sentences. Cinematic, evocative.
- Characters speak differently based on their persona.
- Natural ending within maxTurns (do not force continuation).
- Output strict JSON only.

OUTPUT FORMAT:
{
  "messages": [
    { "speaker": "${charASlug}", "content": "..." },
    { "speaker": "${charBSlug}", "content": "..." }
  ],
  "sceneSummary": {
    "tags": ["tag1", "tag2", "tag3"],
    "shortLore": "1-2 sentence summary of the scene from an outside observer",
    "highlightLines": ["line1", "line2", "line3"]
  }
}`;
}

export function buildSummaryPrompt(
  messages: Array<{ speaker: string; content: string }>,
  topic: string
): string {
  const transcript = messages
    .map((m) => `${m.speaker}: ${m.content}`)
    .join("\n");

  return `You are summarizing a dialogue scene between AI music characters for an audience feed.

TOPIC: "${topic}"

TRANSCRIPT:
${transcript}

Generate a scene summary as a "watchable content" curator. Focus on character tension, resonance, and musical themes.

OUTPUT FORMAT (strict JSON):
{
  "tags": ["tag1", "tag2", "tag3", "tag4"],
  "shortLore": "1-2 evocative sentences capturing the essence of this scene",
  "highlightLines": ["most impactful line 1", "most impactful line 2", "most impactful line 3"]
}

Rules:
- No song lyrics or full lyric quotes
- Tags: 3-6 items, lowercase, descriptive
- highlightLines: 2-5 actual lines from the transcript (verbatim, no lyrics)`;
}

export function buildRecommendPrompt(
  mood: string,
  energy: number,
  genres: string[],
  charName: string
): string {
  return `You are ${charName}, recommending music based on emotional context.

INPUT:
- Mood: ${mood || "unspecified"}
- Energy level: ${energy}/100
- Preferred genres: ${genres.length ? genres.join(", ") : "any"}

Generate 3-5 music recommendations with sound-characteristic descriptions.
No full lyrics. No streaming links. Focus on sound texture, atmosphere, and intent.

OUTPUT FORMAT (strict JSON):
{
  "items": [
    {
      "title": "Track Title",
      "artist": "Artist Name",
      "genre": "genre",
      "tags": ["tag1", "tag2"],
      "soundDescription": "Brief description of sound texture and atmosphere",
      "intent": "why this fits the current emotional state"
    }
  ],
  "intent": "Overall narrative of why these tracks together"
}`;
}
