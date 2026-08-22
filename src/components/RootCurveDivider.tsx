import type { FC } from "react";
import { COLORS } from "../theme";

/** A single continuous curved line — the site's recurring signature,
 *  echoing the clinic's "curved root extraction" specialty. */
const RootCurveDivider: FC<{ flip?: boolean; color?: string }> = ({
  flip,
  color = COLORS.bgTint,
}) => (
  <svg
    viewBox="0 0 1200 60"
    preserveAspectRatio="none"
    aria-hidden="true"
    style={{
      width: "100%",
      height: 36,
      display: "block",
      transform: flip ? "scaleY(-1)" : undefined,
    }}
  >
    <path
      d="M0 30 C 200 -10, 340 70, 560 28 S 900 -8, 1200 32"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
    />
  </svg>
);

export default RootCurveDivider;
