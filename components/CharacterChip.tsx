interface CharacterChipProps {
  slug: string;
  displayName?: string;
  selected?: boolean;
  onClick?: () => void;
  color?: string;
}

export default function CharacterChip({
  slug, displayName, selected, onClick, color,
}: CharacterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
        selected
          ? "bg-ep-accent-bg border-blue-300 text-ep-accent shadow-sm"
          : "bg-white border-ep-border text-ep-muted hover:border-ep-border2 hover:text-ep-text"
      }`}
    >
      {displayName ?? slug}
    </button>
  );
}
