import React, { CSSProperties } from 'react';
import { defaultProps, normalizeSize, SpinnerProps } from './helpers';

import './SpinnerRoundOutlined.css';

export type SpinnerRoundOutlinedProps = SpinnerProps;

export const SpinnerRoundOutlined = ({
  color,
  enabled,
  size,
  speed,
  still,
  thickness,
  style,
  ...svgProps
}: SpinnerRoundOutlinedProps) => {
  const svgStyle: CSSProperties = {
    color,
    overflow: 'visible',
    width: normalizeSize(size),
    ...style,
  };
  const strokeWidth = 3 * (thickness / 100);
  const animations = [
    {
      r: 2,
      strokeWidth: 4,
    },
    {
      name: 'spinners-react-round-outlined-inner',
      r: 14,
      strokeWidth,
    },
    {
      name: 'spinners-react-round-outlined-outer',
      r: 28,
      strokeWidth,
    },
  ];

  if (!enabled) return null;

  return (
    <svg fill="none" {...svgProps} style={svgStyle} viewBox="0 0 65 66">
      {animations.map((animation) => (
        <circle
          key={animation.name || 'still'}
          cx="33.0911"
          cy="33.7809"
          fill="none"
          r={animation.r}
          stroke="currentColor"
          strokeWidth={animation.strokeWidth}
          style={animation.name && !still
            ? { animation: `${animation.name} ${140 / speed}s ease-in-out infinite` }
            : {}}
        />
      ))}
    </svg>
  );
};
SpinnerRoundOutlined.defaultProps = defaultProps;
