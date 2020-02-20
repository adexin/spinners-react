import React, { CSSProperties } from 'react';
import { defaultProps, normalizeSize, SpinnerProps } from './helpers';

import './SpinnerRoundFilled.css';

export type SpinnerRoundFilledProps = SpinnerProps;

export const SpinnerRoundFilled = ({
  color,
  enabled,
  size,
  speed,
  still,
  thickness,
  style,
  ...svgProps
}: SpinnerRoundFilledProps) => {
  const svgStyle: CSSProperties = {
    color,
    overflow: 'visible',
    width: normalizeSize(size),
    ...style,
  };
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

  if (!enabled) return null;

  return (
    <svg fill="none" {...svgProps} style={svgStyle} viewBox="0 0 65 66">
      {animations.map((animation) => (
        <circle
          key={animation.name || 'still'}
          cx="33.0911"
          cy="33.7809"
          fill="currentColor"
          r={animation.r * (animation.name ? (thickness / 100) : 1)}
          style={{
            opacity: animation.name ? 0.25 : 1,
            animation: (!animation.name || still)
              ? 'none'
              : `${animation.name} ${140 / speed}s ease-in-out infinite`,
          }}
        />
      ))}
    </svg>
  );
};
SpinnerRoundFilled.defaultProps = defaultProps;
