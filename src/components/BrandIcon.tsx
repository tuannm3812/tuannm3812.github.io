// Official marks for the profiles we link to, in each brand's own colours as
// their guidelines ask (Mike, 18 Nov). Paths come from Simple Icons, which
// copies them from each brand's press kit:
// - LinkedIn: the "in" bug in LinkedIn Blue #0A66C2, or white on dark.
// - GitHub: the Invertocat in #181717, or white on dark.
// - Kaggle: the "k" from the Kaggle wordmark in Kaggle Blue #20BEFF.
// Do not recolour these to the site's brand blue.

export type Brand = 'linkedin' | 'github' | 'kaggle';

const MARKS: Record<Brand, { viewBox: string; d: string; color: string }> = {
  linkedin: {
    viewBox: '0 0 24 24',
    d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    color: 'text-[#0A66C2] dark:text-white',
  },
  github: {
    viewBox: '0 0 24 24',
    d: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
    color: 'text-[#181717] dark:text-white',
  },
  kaggle: {
    // Just the "k" of the wordmark, framed square.
    viewBox: '-1.68 7.23 7.2 7.2',
    d: 'M.1025 7.3475c-.0681 0-.1022.0341-.1022.102v6.752c0 .0681.034.1022.1022.1022h.7049c.068 0 .1022-.034.1022-.1023v-1.481l.4187-.3985 1.5016 1.91c.041.0477.0884.0716.143.0716h.9091c.0476 0 .0748-.0135.0817-.0407.0135-.041.0066-.075-.0206-.1023l-1.9816-2.4618 1.9002-1.8384c.0204-.0205.0237-.051.01-.092-.0137-.0339-.0408-.051-.0816-.051h-.9398c-.0477 0-.0953.024-.143.0716L.9096 11.607V7.4496c0-.0679-.0342-.102-.1022-.102z',
    color: 'text-[#20BEFF]',
  },
};

export default function BrandIcon({ brand, size = 20 }: { brand: Brand; size?: number }) {
  const { viewBox, d, color } = MARKS[brand];
  return (
    <svg
      viewBox={viewBox}
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className={`shrink-0 fill-current ${color}`}
    >
      <path d={d} />
    </svg>
  );
}
