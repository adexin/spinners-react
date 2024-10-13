import { render } from '@testing-library/react';
import React from 'react';

import { SpinnerInfinity } from '../SpinnerInfinity';

describe('SpinnerInfinity', () => {
  const color = 'red';

  it('matches the snapshot', () => {
    const { container } = render(
      <SpinnerInfinity color="#fff" size={100} speed={10} thickness={50} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('matches the snapshot with default props', () => {
    const { container } = render(<SpinnerInfinity />);

    expect(container).toMatchSnapshot();
  });

  it('renders null if disabled', () => {
    const { container } = render(<SpinnerInfinity enabled={false} />);

    expect(container.firstChild).toBe(null);
  });

  it('renders still if specified', () => {
    const { container } = render(<SpinnerInfinity still />);
    const uses = container.querySelectorAll('use');

    expect(uses[1].style.animation).toBe('');
  });

  it('passes props to styles', () => {
    const size = '20%';
    const thickness = 40;
    const speed = 50;
    const { container } = render(
      <SpinnerInfinity
        color={color}
        secondaryColor="blue"
        size={size}
        speed={speed}
        thickness={thickness}
      />,
    );
    const uses = container.querySelectorAll('use');
    const strokeWidth = `${7 * (thickness / 100)}`;

    expect(container.firstChild).toHaveStyle({ width: size });
    expect(uses[0]).toHaveAttribute('stroke-width', strokeWidth);
    expect(uses[1]).toHaveAttribute('stroke-width', strokeWidth);
    expect(uses[1].style.animation.includes(`${140 / speed}`)).toBe(true);
  });

  it('passes svg props overriding styles', () => {
    const className = 'test-class';
    const { container } = render(
      <SpinnerInfinity className={className} color="green" style={{ color }} />,
    );

    expect(container.firstChild).toHaveClass(className);
    expect(container.firstChild).toHaveStyle({ color });
  });
});
