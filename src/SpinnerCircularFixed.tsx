import React, { CSSProperties } from 'react';
import { secondaryColorDefaultProps, SecondaryColorSpinnerProps } from './helpers';
import { SpinnersProps, withSharedProps } from './withSharedProps';

import './SpinnerCircularFixed.css';

export type SpinnerCircularFixedProps = SpinnersProps & SecondaryColorSpinnerProps;

const Component = ({
  secondaryColor,
  speed,
  still,
  thickness,
  ...svgProps
}: SecondaryColorSpinnerProps) => {
  const strokeWidth = 4 * (thickness / 100);
  const circleStyle: CSSProperties = !still
    ? { animation: `spinners-react-circular-fixed ${140 / speed}s linear infinite` }
    : {};

  return (
    <svg fill="none" {...svgProps} viewBox="0 0 66 66">
      <circle
        cx="33"
        cy="33"
        fill="none"
        r="28"
        stroke={secondaryColor}
        strokeWidth={strokeWidth}
      />
      <circle
        cx="33"
        cy="33"
        fill="none"
        r="28"
        stroke="currentColor"
        strokeDasharray="40, 134"
        strokeDashoffset="325"
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        style={circleStyle}
      />
    </svg>
  );
};

Component.defaultProps = secondaryColorDefaultProps;

export const SpinnerCircularFixed = withSharedProps(Component);
