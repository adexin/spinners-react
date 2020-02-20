import React, { CSSProperties } from 'react';
import { defaultProps, normalizeSize, SpinnerProps } from './helpers';

import './SpinnerCircular.css';

export type SpinnerCircularProps = SpinnerProps;

export const SpinnerCircular = ({
  color,
  enabled,
  size,
  speed,
  still,
  thickness,
  style,
  ...svgProps
}: SpinnerCircularProps) => {
  const strokeWidth = 4 * (thickness / 100);
  const svgStyle: CSSProperties = {
    color,
    overflow: 'visible',
    width: normalizeSize(size),
    ...style,
  };
  const circleStyle: CSSProperties = !still
    ? { animation: `spinners-react-circular ${140 / speed}s linear infinite` }
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
        strokeDasharray="1, 174"
        strokeDashoffset="306"
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        style={circleStyle}
      />
    </svg>
  );
};
SpinnerCircular.defaultProps = defaultProps;
