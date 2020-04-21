import React, { CSSProperties } from 'react';
import { secondaryColorDefaultProps, SecondaryColorSpinnerProps } from './helpers';
import { SpinnersProps, withSharedProps } from './withSharedProps';

import './SpinnerInfinity.css';

export type SpinnerInfinityProps = SpinnersProps & SecondaryColorSpinnerProps;

const Component = ({
  secondaryColor,
  speed,
  still,
  thickness,
  ...svgProps
}: SecondaryColorSpinnerProps) => {
  const strokeWidth = 7 * (thickness / 100);
  const dashStyle: CSSProperties = !still
    ? { animation: `spinners-react-infinity ${140 / speed}s linear infinite` }
    : {};

  return (
    <svg fill="none" viewBox="0 0 131 55" {...svgProps}>
      <defs>
        <path
          d="M46.57 45.5138C36.346 55.4954 19.8919 55.4954 9.66794 45.5138C-0.55598 35.5321 -0.55598 19.4678 9.66794 9.48624C19.8919 -0.495412 36.346 -0.495412 46.57 9.48624L84.4303 45.5138C94.6543 55.4954 111.108 55.4954 121.332 45.5138C131.556 35.5321 131.556 19.4678 121.332 9.48624C111.108 -0.495412 94.6543 -0.495412 84.4303 9.48624L46.57 45.5138Z"
          id="spinners-react-infinity-path"
        />
      </defs>
      <use stroke={secondaryColor} strokeWidth={strokeWidth} xlinkHref="#spinners-react-infinity-path" />
      <use
        fill="none"
        stroke="currentColor"
        strokeDasharray="1, 347"
        strokeDashoffset="75"
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        style={dashStyle}
        xlinkHref="#spinners-react-infinity-path"
      />
    </svg>
  );
};

Component.defaultProps = secondaryColorDefaultProps;

export const SpinnerInfinity = withSharedProps(Component);
