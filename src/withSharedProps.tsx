import React, { ComponentType, CSSProperties } from 'react';
import { SpinnerProps } from './helpers';

const defaultProps = {
  color: '#38ad48' as CSSProperties['color'],
  enabled: true,
  size: 50 as CSSProperties['width'],
  style: {} as CSSProperties,
};
const normalizeSize = (size: CSSProperties['width']) => (parseFloat(size.toString()).toString() === size.toString()
  ? `${size}px`
  : size.toString());

export type SpinnersProps = Partial<typeof defaultProps>;

export const withSharedProps = <P extends SpinnerProps>(
  Component: ComponentType<P>,
) => {
  function Wrapper(props: SpinnersProps & P) {
    const {
      color = defaultProps.color,
      enabled = defaultProps.enabled,
      size = defaultProps.size,
      style = defaultProps.style,
      ...otherProps
    } = props;
    const componentProps = {
      ...otherProps,
      style: {
        color,
        overflow: 'visible',
        width: normalizeSize(size),
        ...style,
      },
    };

    if (!enabled) return null;

    return <Component {...(componentProps as P)} />;
  }

  return Wrapper;
};
