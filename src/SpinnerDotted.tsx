import React, { CSSProperties } from 'react';
import { defaultProps, normalizeSize, SpinnerProps } from './helpers';

import './SpinnerDotted.css';

const coords = [
  { x: 54.9545, y: 13.099 },
  { x: 62.0454, y: 33.19 },
  { x: 54.9545, y: 53.281 },
  { x: 32.5, y: 62.7355 },
  { x: 10.0454, y: 53.281 },
  { x: 2.95455, y: 33.19 },
  { x: 10.0454, y: 13.099 },
  { x: 32.5, y: 3.64461 },
];

export type SpinnerDottedProps = SpinnerProps;

export const SpinnerDotted = ({
  color,
  enabled,
  size,
  speed,
  still,
  thickness,
  style,
  ...svgProps
}: SpinnerDottedProps) => {
  const duration = 200 / speed;
  const svgStyle: CSSProperties = {
    color,
    overflow: 'visible',
    width: normalizeSize(size),
    ...style,
  };
  const generateCircleStyle = (i: number): CSSProperties => (!still
    ? { animation: `spinners-react-dotted-shrink ${duration}s cubic-bezier(0, 0.9, 0, 0.9) ${(duration / 20) * i}s infinite` }
    : {});
  const centerStyle: CSSProperties = !still
    ? {
      animation: `spinners-react-dotted-center ${duration}s ease-out infinite`,
      transformOrigin: 'center',
    }
    : { display: 'none' };

  if (!enabled) return null;

  return (
    <svg fill="none" viewBox="0 0 65 66" {...svgProps} style={svgStyle}>
      {coords.map((c, i) => (
        <circle
          key={`${c.x}-${c.y}`}
          cx={c.x}
          cy={c.y}
          fill="currentColor"
          r={3 * (thickness / 100)}
          style={generateCircleStyle(i)}
        />
      ))}
      <circle
        cx="33.0911"
        cy="33.7809"
        fill="currentColor"
        r={6 * (thickness / 100)}
        style={centerStyle}
      />
    </svg>
  );
};
SpinnerDotted.defaultProps = defaultProps;
