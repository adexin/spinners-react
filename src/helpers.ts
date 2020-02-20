import { CSSProperties } from 'react';

export type SpinnerProps = React.HTMLAttributes<SVGElement> & {
  color: CSSProperties['color'],
  enabled: boolean,
  speed: number,
  still: boolean,
  thickness: number,
  size: CSSProperties['width'],
  style: CSSProperties,
};

export const defaultProps = {
  color: '#38ad48',
  enabled: true,
  still: false,
  size: 50,
  speed: 100,
  thickness: 100,
  style: {},
};

export const normalizeSize = (size: CSSProperties['width']) => (parseFloat(size.toString()).toString() === size.toString()
  ? `${size}px`
  : size.toString());
