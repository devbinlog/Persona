/**
 * Moderation layer — word filter + AI safety check.
 */

export type ModerationDecision = "ALLOW" | "SOFT_BLOCK" | "HARD_BLOCK";

export interface ModerationResult {
  decision: ModerationDecision;
  reasons: string[];
  suggestedRewrite?: string;
}

// Hard-blocked patterns — no \b for Korean (non-ASCII word boundaries don't work)
const HARD_BLOCK_PATTERNS: RegExp[] = [
  /(hate\s*speech|fuck\s*you|kill\s*yourself|자살|자해|살인)/i,
  /(child|minor)\s*(sex|porn|nude)/i,
  /(폭탄|bomb|테러|terror)/i,
];

// Soft-blocked patterns
const SOFT_BLOCK_PATTERNS: RegExp[] = [
  /(가사\s*전문|전체\s*가사|full\s*lyrics|write\s*me\s*lyrics)/i,
  /(스트리밍|streaming|다운로드|download)/i,
  /(진단|diagnosis|처방|prescription)/i,
];

const LOUNGE_BAN_WORDS = [
  "씨발", "개새끼", "fuck", "asshole", "bitch", "nigger",
  "hate", "kill", "porn", "sex",
];

export function moderateText(text: string): ModerationResult {
  for (const pattern of HARD_BLOCK_PATTERNS) {
    if (pattern.test(text)) {
      return {
        decision: "HARD_BLOCK",
        reasons: ["Prohibited content detected"],
        suggestedRewrite: undefined,
      };
    }
  }

  for (const pattern of SOFT_BLOCK_PATTERNS) {
    if (pattern.test(text)) {
      return {
        decision: "SOFT_BLOCK",
        reasons: ["Request falls outside allowed scope"],
        suggestedRewrite:
          "그 부분은 답하기 어려워. 대신 음악의 분위기나 사운드 특성으로 이야기해볼게.",
      };
    }
  }

  return { decision: "ALLOW", reasons: [] };
}

export function moderateLounge(text: string): { ok: boolean; reason?: string } {
  const lower = text.toLowerCase();
  for (const word of LOUNGE_BAN_WORDS) {
    if (lower.includes(word)) {
      return { ok: false, reason: "금칙어가 포함된 메시지입니다." };
    }
  }
  if (text.length > 500) {
    return { ok: false, reason: "메시지가 너무 깁니다 (최대 500자)." };
  }
  return { ok: true };
}
