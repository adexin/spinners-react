import React, { CSSProperties } from 'react';
import { defaultProps, normalizeSize, SpinnerProps } from './helpers';

import './SpinnerCircularSplit.css';

export type SpinnerCircularSplitProps = SpinnerProps;

export const SpinnerCircularSplit = ({
  color,
  enabled,
  size,
  speed,
  still,
  thickness,
  style,
  ...svgProps
}: SpinnerCircularSplitProps) => {
  const strokeWidth = 4 * (thickness / 100);
  const svgStyle: CSSProperties = {
    color,
    overflow: 'visible',
    width: normalizeSize(size),
    ...style,
  };
  const circleStyle: CSSProperties = !still
    ? { animation: `spinners-react-circular-split ${140 / speed}s linear infinite` }
    : {};

  if (!enabled) return null;

  return (
    <svg fill="none" {...svgProps} style={svgStyle} viewBox="0 0 66 66">
      <circle
        cx="33"
        cy="33"
        fill="none"
        r="28"
        stroke="rgba(0,0,0,0.44)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx="33"
        cy="33"
        fill="none"
        r="28"
        stroke="currentColor"
        strokeDasharray="5, 170"
        strokeDashoffset="1"
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        style={circleStyle}
        transform="rotate(-90 33.0911 33.7809)"
      />
    </svg>
  );
};
SpinnerCircularSplit.defaultProps = defaultProps;
