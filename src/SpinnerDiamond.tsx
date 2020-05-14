import React, { CSSProperties } from 'react';
import { secondaryColorDefaultProps, SecondaryColorSpinnerProps } from './helpers';
import { SpinnersProps, withSharedProps } from './withSharedProps';

import './SpinnerDiamond.css';

const coords = [
  { x: 3, y: 48 },
  { x: 18, y: 33 },
  { x: 18, y: 48 },
  { x: 18, y: 63 },
  { x: 33, y: 48 },
  // -------------
  { x: 33, y: 18 },
  { x: 33, y: 33 },
  { x: 33, y: 63 },
  { x: 33, y: 78 },
  { x: 48, y: 3 },
  { x: 48, y: 18 },
  { x: 48, y: 33 },
  { x: 48, y: 48 },
  { x: 48, y: 63 },
  { x: 48, y: 78 },
  { x: 48, y: 93 },
  { x: 63, y: 18 },
  { x: 63, y: 33 },
  { x: 63, y: 48 },
  { x: 63, y: 63 },
  { x: 63, y: 78 },
  { x: 78, y: 33 },
  { x: 78, y: 48 },
  { x: 78, y: 63 },
  { x: 93, y: 48 },
];

export type SpinnerDiamondProps = SpinnersProps & SecondaryColorSpinnerProps;

const Component = ({
  secondaryColor,
  speed,
  still,
  thickness,
  ...svgProps
}: SecondaryColorSpinnerProps) => {
  const diamondStyle: CSSProperties = {
    animation: `spinners-react-diamond ${140 / speed}s steps(2, end) infinite`,
  };

  if (still) diamondStyle.animation = 'none';

  return (
    <svg fill="currentColor" {...svgProps} viewBox="0 0 96 96">
      {coords.map((c) => (
        <circle key={`${c.x}-${c.y}`} cx={c.x} cy={c.y} fill={secondaryColor} r={2.5 * (thickness / 100)} />
      ))}
      <g style={diamondStyle}>
        {coords.filter((c, i) => i < 5).map((c) => (
          <circle key={`h-${c.x}-${c.y}`} cx={c.x} cy={c.y} r={3.5 * (thickness / 100)} />
        ))}
      </g>
    </svg>
  );
};

Component.defaultProps = secondaryColorDefaultProps;

export const SpinnerRomb = withSharedProps(Component);
export const SpinnerDiamond = withSharedProps(Component);
