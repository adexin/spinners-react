import React, { CSSProperties } from 'react';
import { defaultProps, normalizeSize, SpinnerProps } from './helpers';

import './SpinnerRound.css';

export type SpinnerRoundProps = SpinnerProps;

export const SpinnerRound = ({
  color,
  enabled,
  size,
  speed,
  still,
  thickness,
  style,
  ...svgProps
}: SpinnerRoundProps) => {
  const strokeWidth = 3 * (thickness / 100);
  const svgStyle: CSSProperties = {
    color,
    overflow: 'visible',
    width: normalizeSize(size),
    ...style,
  };
  const circleStyle: CSSProperties = {
    animation: `spinners-react-round ${140 / speed}s ease-in-out infinite`,
    transformOrigin: 'center',
  };

  if (still) circleStyle.animation = 'none';
  if (!enabled) return null;

  return (
    <svg fill="none" {...svgProps} style={svgStyle} viewBox="0 0 65 66">
      <circle
        cx="33.0911"
        cy="33.7809"
        fill="none"
        r={28}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        style={circleStyle}
      />
    </svg>
  );
};
SpinnerRound.defaultProps = defaultProps;
