/**
 * Internal seed dataset for music recommendations.
 * Spotify API is an optional extension — interface is ready.
 */

export interface SeedTrack {
  id: string;
  title: string;
  artist: string;
  genre: string;
  tags: string[];
  energy: number;      // 0-100
  valence: number;     // -1 to 1
  soundDescription: string;
  externalLink?: string; // metadata only, no streaming
}

export const SEED_TRACKS: SeedTrack[] = [
  {
    id: "t001",
    title: "Weightless",
    artist: "Marconi Union",
    genre: "ambient",
    tags: ["calm", "slow", "floating", "sleep"],
    energy: 10,
    valence: 0.1,
    soundDescription: "Layered drones and gentle piano create a near-weightless texture.",
  },
  {
    id: "t002",
    title: "Experience",
    artist: "Ludovico Einaudi",
    genre: "neoclassical",
    tags: ["introspective", "piano", "cinematic", "calm"],
    energy: 25,
    valence: 0.2,
    soundDescription: "Sparse piano lines over string swells — like watching a memory replay.",
  },
  {
    id: "t003",
    title: "Teardrop",
    artist: "Massive Attack",
    genre: "trip-hop",
    tags: ["echo", "dark", "beats", "vocal"],
    energy: 40,
    valence: -0.2,
    soundDescription: "Warm bass pulse beneath a fragile vocal — familiar but distant.",
  },
  {
    id: "t004",
    title: "Intro",
    artist: "The xx",
    genre: "indie",
    tags: ["soft", "guitar", "atmospheric", "echo"],
    energy: 30,
    valence: 0.05,
    soundDescription: "Interlocking guitar melodies with room for silence.",
  },
  {
    id: "t005",
    title: "Runaway",
    artist: "Kanye West",
    genre: "hip-hop",
    tags: ["piano", "emotional", "overdrive", "cinematic"],
    energy: 65,
    valence: -0.1,
    soundDescription: "Simple piano loop expanded into an emotional monument.",
  },
  {
    id: "t006",
    title: "Motion Picture Soundtrack",
    artist: "Radiohead",
    genre: "art rock",
    tags: ["hollow", "orchestral", "sad", "cinematic"],
    energy: 20,
    valence: -0.6,
    soundDescription: "Organ and strings dissolve into near-silence — grief made audible.",
  },
  {
    id: "t007",
    title: "Midnight City",
    artist: "M83",
    genre: "synth-pop",
    tags: ["nostalgia", "drive", "spark", "80s"],
    energy: 75,
    valence: 0.5,
    soundDescription: "Saxophone break over synth chords — the feeling of being young in a city at night.",
  },
  {
    id: "t008",
    title: "Four Minutes Thirty-Three Seconds",
    artist: "John Cage",
    genre: "experimental",
    tags: ["static", "silence", "concept", "minimal"],
    energy: 5,
    valence: 0.0,
    soundDescription: "The sound of a room listening to itself.",
  },
  {
    id: "t009",
    title: "Bittersweet Symphony",
    artist: "The Verve",
    genre: "britpop",
    tags: ["strings", "melancholy", "echo", "walk"],
    energy: 55,
    valence: -0.15,
    soundDescription: "Orchestral loop beneath resigned vocals — moving without going anywhere.",
  },
  {
    id: "t010",
    title: "Paper Planes",
    artist: "M.I.A.",
    genre: "hip-hop",
    tags: ["spark", "playful", "global", "beats"],
    energy: 70,
    valence: 0.4,
    soundDescription: "Mischievous energy wrapped in a deceptively simple loop.",
  },
  {
    id: "t011",
    title: "Holocene",
    artist: "Bon Iver",
    genre: "folk",
    tags: ["introspective", "landscape", "echo", "soft"],
    energy: 30,
    valence: 0.1,
    soundDescription: "Voice and guitar that feel wide as an open field.",
  },
  {
    id: "t012",
    title: "Dissolve Me",
    artist: "Alt-J",
    genre: "indie rock",
    tags: ["dreamlike", "sparse", "calm", "texture"],
    energy: 35,
    valence: 0.2,
    soundDescription: "Unconventional vocal harmonics over minimal percussion.",
  },
  {
    id: "t013",
    title: "99 Problems",
    artist: "Jay-Z",
    genre: "hip-hop",
    tags: ["overdrive", "energy", "confrontational", "hard"],
    energy: 88,
    valence: 0.1,
    soundDescription: "Guitar riff driven with aggressive confidence — controlled release.",
  },
  {
    id: "t014",
    title: "Breathe (2 AM)",
    artist: "Anna Nalick",
    genre: "singer-songwriter",
    tags: ["hollow", "vulnerability", "piano", "acoustic"],
    energy: 22,
    valence: -0.3,
    soundDescription: "Confessional vocals over piano — raw and unguarded.",
  },
  {
    id: "t015",
    title: "Crystalised",
    artist: "The xx",
    genre: "indie",
    tags: ["static", "sparse", "whisper", "cold"],
    energy: 25,
    valence: -0.4,
    soundDescription: "Near-silence between beats — the sound of something ending.",
  },
];

export function recommendBySignals(
  energy: number,
  valence: number,
  genres: string[],
  count = 4
): SeedTrack[] {
  let candidates = SEED_TRACKS;

  if (genres.length > 0) {
    const genreFiltered = candidates.filter((t) =>
      genres.some(
        (g) =>
          t.genre.toLowerCase().includes(g.toLowerCase()) ||
          t.tags.some((tag) => tag.toLowerCase().includes(g.toLowerCase()))
      )
    );
    if (genreFiltered.length >= 2) candidates = genreFiltered;
  }

  const scored = candidates.map((t) => ({
    track: t,
    score:
      Math.sqrt(
        Math.pow((t.energy - energy) / 100, 2) +
          Math.pow(t.valence - valence, 2)
      ),
  }));

  return scored
    .sort((a, b) => a.score - b.score)
    .slice(0, count)
    .map((s) => s.track);
}
