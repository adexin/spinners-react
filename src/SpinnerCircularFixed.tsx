import React, { CSSProperties } from 'react';
import { defaultProps, normalizeSize, SpinnerProps } from './helpers';

import './SpinnerCircularFixed.css';

export type SpinnerCircularFixedProps = SpinnerProps;

export const SpinnerCircularFixed = ({
  color,
  enabled,
  size,
  speed,
  still,
  thickness,
  style,
  ...svgProps
}: SpinnerCircularFixedProps) => {
  const strokeWidth = 4 * (thickness / 100);
  const svgStyle: CSSProperties = {
    color,
    overflow: 'visible',
    width: normalizeSize(size),
    ...style,
  };
  const circleStyle: CSSProperties = !still
    ? { animation: `spinners-react-circular-fixed ${140 / speed}s linear infinite` }
    : {};

  if (!enabled) return null;

  return (
    <svg fill="none" {...svgProps} style={svgStyle} viewBox="0 0 65 66">
      <circle
        cx="33.0911"
        cy="33.7809"
        fill="none"
        r="28"
        stroke="rgba(0,0,0,0.44)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx="33.0911"
        cy="33.7809"
        fill="none"
        r="28"
        stroke="currentColor"
        strokeDasharray="40, 134"
        strokeDashoffset="325"
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        style={circleStyle}
      />
    </svg>
  );
};
SpinnerCircularFixed.defaultProps = defaultProps;
