import { TAG_GROUPS, getTagGroup } from '../data/tagVocabulary';

/** A skill tag, coloured by its group in tagVocabulary.ts. Clickable when onClick is given. */
export default function TagChip({
  tag,
  size = 'sm',
  onClick,
}: {
  tag: string;
  size?: 'xs' | 'sm';
  onClick?: (tag: string) => void;
}) {
  const className = `inline-flex items-center rounded-full font-semibold ${
    size === 'xs' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
  } ${TAG_GROUPS[getTagGroup(tag)].chip}`;
  if (!onClick) return <span className={className}>{tag}</span>;
  return (
    <button
      type="button"
      onClick={() => onClick(tag)}
      className={`${className} transition-[filter] hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40`}
    >
      {tag}
    </button>
  );
}
