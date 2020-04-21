import React from 'react';
import { defaultProps, SpinnerProps } from './helpers';
import { SpinnersProps, withSharedProps } from './withSharedProps';

import './SpinnerRoundOutlined.css';

const animations = [
  {
    r: 2,
  },
  {
    name: 'spinners-react-round-outlined',
    r: 14,
  },
  {
    name: 'spinners-react-round-outlined',
    r: 28,
  },
];

export type SpinnerRoundOutlinedProps = SpinnersProps & SpinnerProps;

const Component = ({
  speed,
  still,
  thickness,
  ...svgProps
}: SpinnerProps) => {
  const strokeWidth = 3 * (thickness / 100);

  return (
    <svg fill="none" {...svgProps} viewBox="0 0 66 66">
      {animations.map((animation, i) => (
        <circle
          key={`spinner-round-outlined-r${animation.r}`}
          cx="33"
          cy="33"
          fill="none"
          r={animation.r}
          stroke="currentColor"
          strokeWidth={i ? strokeWidth : 4}
          style={animation.name && !still
            ? { animation: `${animation.name} ${140 / speed}s ease-in-out infinite` }
            : {}}
        />
      ))}
    </svg>
  );
};

Component.defaultProps = defaultProps;

export const SpinnerRoundOutlined = withSharedProps(Component);
