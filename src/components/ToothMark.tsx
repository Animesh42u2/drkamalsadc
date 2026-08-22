import type { FC, CSSProperties } from "react";

/** Line-art tooth used as an icon / hero motif — one shape, reused everywhere. */
const ToothMark: FC<{ style?: CSSProperties; color?: string }> = ({ style, color = "currentColor" }) => (
  <svg viewBox="0 0 120 130" style={style} aria-hidden="true">
    <path
      d="M60 6c-16 0-24 9-34 9C13 15 4 24 4 42c0 14 6 22 6 34
         0 16 6 22 6 30 0 10 6 18 14 18 10 0 12-22 20-22
         2 0 3 6 5 12 3 9 6 14 11 14 6 0 8-9 10-20
         3-17 3-32 3-32s10 4 14-6c3-8 3-16 3-22
         0-16-8-28-22-28C86 15 76 6 60 6z"
      fill="none"
      stroke={color}
      strokeWidth="2.4"
      strokeLinejoin="round"
    />
  </svg>
);

export default ToothMark;
