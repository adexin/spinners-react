import { render } from '@testing-library/react';
import React from 'react';

import { SpinnerCircularFixed } from '../SpinnerCircularFixed';

describe('SpinnerCircularFixed', () => {
  const color = 'red';

  it('matches the snapshot', () => {
    const { container } = render(
      <SpinnerCircularFixed color="#fff" size={100} speed={10} thickness={50} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('matches the snapshot with default props', () => {
    const { container } = render(<SpinnerCircularFixed />);

    expect(container).toMatchSnapshot();
  });

  it('renders null if disabled', () => {
    const { container } = render(<SpinnerCircularFixed enabled={false} />);

    expect(container.firstChild).toBe(null);
  });

  it('renders still if specified', () => {
    const { container } = render(<SpinnerCircularFixed still />);
    const circles = container.querySelectorAll('circle');

    expect(circles[1].style.animation).toBe('');
  });

  it('passes props to styles', () => {
    const size = '20%';
    const thickness = 40;
    const speed = 50;
    const { container } = render(
      <SpinnerCircularFixed
        color={color}
        secondaryColor="blue"
        size={size}
        speed={speed}
        thickness={thickness}
      />,
    );
    const circles = container.querySelectorAll('circle');

    expect(container.firstChild).toHaveStyle({ width: size });
    expect(circles[0]).toHaveAttribute(
      'stroke-width',
      `${4 * (thickness / 100)}`,
    );
    expect(circles[1].style.animation.includes(`${140 / speed}`)).toBe(true);
  });

  it('passes svg props overriding styles', () => {
    const className = 'test-class';
    const { container } = render(
      <SpinnerCircularFixed
        className={className}
        color="green"
        style={{ color }}
      />,
    );

    expect(container.firstChild).toHaveClass(className);
    expect(container.firstChild).toHaveStyle({ color });
  });
});
