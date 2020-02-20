import React, { CSSProperties } from 'react';
import { defaultProps, normalizeSize, SpinnerProps } from './helpers';

import './SpinnerRomb.css';

const coords = [
  { x: 18.5, y: 33.1901 },
  { x: 18.5, y: 48.1901 },
  { x: 18.5, y: 63.1901 },
  { x: 3.5, y: 48.1901 },
  { x: 33.5, y: 48.1901 },
  { x: 79.5, y: 48.1901 },
  { x: 33.5, y: 33.1901 },
  { x: 33.5, y: 18.1901 },
  { x: 94.5, y: 48.1901 },
  { x: 79.5, y: 33.1901 },
  { x: 33.5, y: 63.1901 },
  { x: 33.5, y: 78.1901 },
  { x: 49.5, y: 18.1901 },
  { x: 49.5, y: 3.19006 },
  { x: 49.5, y: 48.1901 },
  { x: 49.5, y: 33.1901 },
  { x: 49.5, y: 63.1901 },
  { x: 49.5, y: 78.1901 },
  { x: 49.5, y: 93.1901 },
  { x: 64.5, y: 18.1901 },
  { x: 64.5, y: 48.1901 },
  { x: 64.5, y: 33.1901 },
  { x: 64.5, y: 63.1901 },
  { x: 64.5, y: 78.1901 },
  { x: 79.5, y: 63.1901 },
];

export type SpinnerRombProps = SpinnerProps;

export const SpinnerRomb = ({
  color,
  enabled,
  size,
  speed,
  still,
  thickness,
  style,
  ...svgProps
}: SpinnerRombProps) => {
  const svgStyle: CSSProperties = {
    color,
    overflow: 'visible',
    width: normalizeSize(size),
    ...style,
  };
  const rombStyle: CSSProperties = {
    animation: `spinners-react-romb ${140 / speed}s steps(2, end) infinite`,
  };

  if (still) rombStyle.animation = 'none';
  if (!enabled) return null;

  return (
    <svg fill="currentColor" {...svgProps} style={svgStyle} viewBox="0 0 97 96">
      {coords.map((c) => (
        <circle key={`${c.x}-${c.y}`} cx={c.x} cy={c.y} fill="rgba(0,0,0,0.44)" r={2.5 * (thickness / 100)} />
      ))}
      <g style={rombStyle}>
        {coords.filter((c, i) => i < 5).map((c) => (
          <circle key={`h-${c.x}-${c.y}`} cx={c.x} cy={c.y} r={3.5 * (thickness / 100)} />
        ))}
      </g>
    </svg>
  );
};
SpinnerRomb.defaultProps = defaultProps;
