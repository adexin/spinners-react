import React, { CSSProperties } from 'react';
import { defaultProps, SpinnerProps } from './helpers';
import { SpinnersProps, withSharedProps } from './withSharedProps';

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

export type SpinnerDottedProps = SpinnersProps & SpinnerProps;

export const Component = ({
  speed,
  still,
  thickness,
  ...svgProps
}: SpinnerProps) => {
  const duration = 200 / speed;
  const generateCircleStyle = (i: number): CSSProperties => (!still
    ? { animation: `spinners-react-dotted-shrink ${duration}s cubic-bezier(0, 0.9, 0, 0.9) ${(duration / 20) * i}s infinite` }
    : {});
  const centerStyle: CSSProperties = !still
    ? {
      animation: `spinners-react-dotted-center ${duration}s ease-out infinite`,
      transformOrigin: 'center',
    }
    : { display: 'none' };

  return (
    <svg fill="none" viewBox="0 0 66 66" {...svgProps}>
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

Component.defaultProps = defaultProps;

export const SpinnerDotted = withSharedProps(Component);
