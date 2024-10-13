import { render } from '@testing-library/react';
import React from 'react';

import { SpinnerDotted } from '../SpinnerDotted';

describe('SpinnerDotted', () => {
  const color = 'red';

  it('matches the snapshot', () => {
    const { container } = render(
      <SpinnerDotted color="#fff" size={100} speed={10} thickness={50} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('matches the snapshot with default props', () => {
    const { container } = render(<SpinnerDotted />);

    expect(container).toMatchSnapshot();
  });

  it('renders null if disabled', () => {
    const { container } = render(<SpinnerDotted enabled={false} />);

    expect(container.firstChild).toBe(null);
  });

  it('renders still if specified', () => {
    const { container } = render(<SpinnerDotted still />);
    const circles = container.querySelectorAll('circle');
    const last = circles.length - 1;

    expect(circles[0].style.animation).toBe('');
    expect(circles[last].style.animation).toBe('');
    expect(circles[last]).toHaveStyle({ display: 'none' });
  });

  it('passes props to styles', () => {
    const size = '20%';
    const thickness = 40;
    const speed = 50;
    const { container } = render(
      <SpinnerDotted
        color={color}
        size={size}
        speed={speed}
        thickness={thickness}
      />,
    );
    const circles = container.querySelectorAll('circle');
    const last = circles.length - 1;
    const animationDuration = `${200 / speed}`;

    expect(container.firstChild).toHaveStyle({ width: size });
    expect(circles[0]).toHaveAttribute('r', `${3 * (thickness / 100)}`);
    expect(circles[0].style.animation.includes(animationDuration)).toBe(true);
    expect(circles[last]).toHaveAttribute('r', `${6 * (thickness / 100)}`);
    expect(circles[last].style.animation.includes(animationDuration)).toBe(
      true,
    );
  });

  it('passes svg props overriding styles', () => {
    const className = 'test-class';
    const { container } = render(
      <SpinnerDotted className={className} color="green" style={{ color }} />,
    );

    expect(container.firstChild).toHaveClass(className);
    expect(container.firstChild).toHaveStyle({ color });
  });
});
