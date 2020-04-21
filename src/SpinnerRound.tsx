import React, { CSSProperties } from 'react';
import { defaultProps, SpinnerProps } from './helpers';
import { SpinnersProps, withSharedProps } from './withSharedProps';

import './SpinnerRound.css';

export type SpinnerRoundProps = SpinnersProps & SpinnerProps;

const Component = ({
  speed,
  still,
  thickness,
  ...svgProps
}: SpinnerProps) => {
  const strokeWidth = 3 * (thickness / 100);
  const circleStyle: CSSProperties = {
    animation: `spinners-react-round ${140 / speed}s ease-in-out infinite`,
    transformOrigin: 'center',
  };

  if (still) circleStyle.animation = 'none';

  return (
    <svg fill="none" {...svgProps} viewBox="0 0 66 66">
      <circle
        cx="33"
        cy="33"
        fill="none"
        r={28}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        style={circleStyle}
      />
    </svg>
  );
};

Component.defaultProps = defaultProps;

export const SpinnerRound = withSharedProps(Component);
