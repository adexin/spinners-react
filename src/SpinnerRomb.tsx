import React, { CSSProperties } from 'react';
import { defaultProps, normalizeSize, SpinnerProps } from './helpers';

import './SpinnerRomb.css';

const coords = [
  { x: 3, y: 48 },
  { x: 18, y: 33 },
  { x: 18, y: 48 },
  { x: 18, y: 63 },
  { x: 33, y: 48 },
  // -------------
  { x: 33, y: 18 },
  { x: 33, y: 33 },
  { x: 33, y: 63 },
  { x: 33, y: 78 },
  { x: 49, y: 3 },
  { x: 49, y: 18 },
  { x: 49, y: 33 },
  { x: 49, y: 48 },
  { x: 49, y: 63 },
  { x: 49, y: 78 },
  { x: 49, y: 93 },
  { x: 64, y: 18 },
  { x: 64, y: 33 },
  { x: 64, y: 48 },
  { x: 64, y: 63 },
  { x: 64, y: 78 },
  { x: 79, y: 33 },
  { x: 79, y: 48 },
  { x: 79, y: 63 },
  { x: 94, y: 48 },
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
    <svg fill="currentColor" {...svgProps} style={svgStyle} viewBox="0 0 96 96">
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
