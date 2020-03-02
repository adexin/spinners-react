import React, { CSSProperties } from 'react';
import { defaultProps, normalizeSize, SpinnerProps } from './helpers';

import './SpinnerDotted.css';

const coords = [
  { x: 22, y: -20 },
  { x: 29, y: 0 },
  { x: 22, y: 20 },
  { x: 0, y: 30 },
  { x: -23, y: 20 },
  { x: -30, y: 0 },
  { x: -23, y: -20 },
  { x: 0, y: -30 },
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
    <svg fill="none" viewBox="0 0 66 66" {...svgProps} style={svgStyle}>
      {coords.map((c, i) => (
        <circle
          key={`${c.x}-${c.y}`}
          cx="33"
          cy="33"
          fill="currentColor"
          r={3 * (thickness / 100)}
          style={{
            transform: `translate(${c.x}px, ${c.y}px)`,
            ...generateCircleStyle(i),
          }}
        />
      ))}
      <circle
        cx="33"
        cy="33"
        fill="currentColor"
        r={6 * (thickness / 100)}
        style={centerStyle}
      />
    </svg>
  );
};
SpinnerDotted.defaultProps = defaultProps;
