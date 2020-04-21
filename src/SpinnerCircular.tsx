import React, { CSSProperties } from 'react';
import { secondaryColorDefaultProps, SecondaryColorSpinnerProps } from './helpers';
import { SpinnersProps, withSharedProps } from './withSharedProps';

import './SpinnerCircular.css';

export type SpinnerCircularProps = SpinnersProps & SecondaryColorSpinnerProps;

const Component = ({
  secondaryColor,
  speed,
  still,
  thickness,
  ...svgProps
}: SecondaryColorSpinnerProps) => {
  const strokeWidth = 4 * (thickness / 100);
  const circleStyle: CSSProperties = !still
    ? { animation: `spinners-react-circular ${140 / speed}s linear infinite` }
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
        strokeDasharray="1, 174"
        strokeDashoffset="306"
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        style={circleStyle}
      />
    </svg>
  );
};

Component.defaultProps = secondaryColorDefaultProps;

export const SpinnerCircular = withSharedProps(Component);
