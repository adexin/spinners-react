import React from 'react';
import { defaultProps, SpinnerProps } from './helpers';
import { SpinnersProps, withSharedProps } from './withSharedProps';

import './SpinnerRoundFilled.css';

const animations = [
  { r: 4 },
  {
    name: 'spinners-react-round-filled-inner',
    r: 12.66,
  },
  {
    name: 'spinners-react-round-filled-center',
    r: 20.32,
  },
  {
    name: 'spinners-react-round-filled-outer',
    r: 27.5,
  },
];

export type SpinnerRoundFilledProps = SpinnersProps & SpinnerProps;

const Component = ({
  speed,
  still,
  thickness,
  ...svgProps
}: SpinnerProps) => (
  <svg fill="none" {...svgProps} viewBox="0 0 66 66">
    {animations.map((animation) => (
      <circle
        key={animation.name || 'still'}
        cx="33"
        cy="33"
        fill="currentColor"
        r={animation.r * (animation.name ? (thickness / 100) : 1)}
        style={{
          opacity: animation.name ? 0.25 : 1,
          transformOrigin: 'center',
          animation: (!animation.name || still)
            ? 'none'
            : `${animation.name} ${140 / speed}s ease-in-out infinite`,
        }}
      />
    ))}
  </svg>
);

Component.defaultProps = defaultProps;

export const SpinnerRoundFilled = withSharedProps(Component);
