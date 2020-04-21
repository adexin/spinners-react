import { CSSProperties, HTMLAttributes } from 'react';

export const defaultProps = {
  speed: 100,
  still: false,
  thickness: 100,
};

export const secondaryColorDefaultProps = {
  ...defaultProps,
  secondaryColor: 'rgba(0,0,0,0.44)' as CSSProperties['color'],
};

export type SpinnerProps = HTMLAttributes<SVGElement> & Partial<typeof defaultProps>;

export type SecondaryColorSpinnerProps = SpinnerProps & Partial<typeof secondaryColorDefaultProps>;
