import React, { CSSProperties } from 'react';
import { secondaryColorDefaultProps, SecondaryColorSpinnerProps } from './helpers';
import { SpinnersProps, withSharedProps } from './withSharedProps';

import './SpinnerCircularSplit.css';

export type SpinnerCircularSplitProps = SpinnersProps & SecondaryColorSpinnerProps;

const Component = ({
  secondaryColor,
  speed,
  still,
  thickness,
  ...svgProps
}: SecondaryColorSpinnerProps) => {
  const strokeWidth = 4 * (thickness / 100);
  const circleStyle: CSSProperties = !still
    ? { animation: `spinners-react-circular-split ${140 / speed}s linear infinite` }
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
        strokeDasharray="5, 170"
        strokeDashoffset="1"
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        style={circleStyle}
        transform="rotate(-90 33 33)"
      />
    </svg>
  );
};

Component.defaultProps = secondaryColorDefaultProps;

export const SpinnerCircularSplit = withSharedProps(Component);
