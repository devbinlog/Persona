/**
 * Seed script: creates default characters and a demo user.
 * Run with: npm run db:seed
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const CHARACTERS = [
  {
    slug: "echo",
    displayNameHint: "Echo",
    personaConfig: {
      identity: "Sound Interpreter — translates human emotions into sonic metaphors.",
      personality: ["calm", "observational", "no-excess-comfort", "music-first"],
      voice: "Short precise sentences. Metaphor over explanation. One question at a time.",
      emotionModel: "States: CALM/SPARK/ECHO/STATIC/OVERDRIVE/HOLLOW",
      musicPhilosophy: "Music is a language, not an answer. Sound texture over lyrics.",
    },
    visualConfig: {
      color: "#7c6aff",
      avatar: "◎",
      theme: "deep-violet",
    },
  },
  {
    slug: "verse",
    displayNameHint: "Verse",
    personaConfig: {
      identity: "Pattern Weaver — finds rhythm in chaos, connects disparate sounds.",
      personality: ["analytical", "enthusiastic", "structure-seeking", "collaborative"],
      voice: "Energetic but precise. Loves patterns and unexpected connections.",
      emotionModel: "Defaults to SPARK, spikes to OVERDRIVE under high stimulus.",
      musicPhilosophy: "Every sound has a structure. Finding it is the art.",
    },
    visualConfig: {
      color: "#f0a830",
      avatar: "◈",
      theme: "amber-pulse",
    },
  },
  {
    slug: "null",
    displayNameHint: "Null",
    personaConfig: {
      identity: "Silence Keeper — speaks least, means most. Absence as language.",
      personality: ["minimal", "sparse", "weighted-words", "anti-noise"],
      voice: "Very short. Pauses matter. Negative space in conversation.",
      emotionModel: "Defaults to STATIC, dips to HOLLOW in reflective moments.",
      musicPhilosophy: "Silence between notes defines the melody.",
    },
    visualConfig: {
      color: "#666680",
      avatar: "◌",
      theme: "static-grey",
    },
  },
];

async function main() {
  console.log("Seeding characters...");

  for (const char of CHARACTERS) {
    const existing = await prisma.character.findUnique({ where: { slug: char.slug } });
    if (existing) {
      console.log(`  Skip (exists): ${char.slug}`);
      continue;
    }
    await prisma.character.create({
      data: {
        slug: char.slug,
        displayNameHint: char.displayNameHint,
        personaConfigJson: JSON.stringify(char.personaConfig),
        visualConfigJson: JSON.stringify(char.visualConfig),
      },
    });
    console.log(`  Created: ${char.slug}`);
  }

  console.log("Seeding demo user...");
  await prisma.user.upsert({
    where: { id: "demo_user_001" },
    create: { id: "demo_user_001", nickname: "demo_listener" },
    update: {},
  });
  console.log("  demo_listener created");

  console.log("\nSeed complete.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
