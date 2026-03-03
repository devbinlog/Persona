interface CharacterChipProps {
  slug: string;
  displayName?: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function CharacterChip({ slug, displayName, selected, onClick }: CharacterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg border text-sm transition-all ${
        selected
          ? "bg-ep-accent/20 border-ep-accent text-ep-accent"
          : "bg-transparent border-ep-border text-gray-400 hover:border-gray-500 hover:text-white"
      }`}
    >
      {displayName ?? slug}
    </button>
  );
}
