import { render } from '@testing-library/react';
import React from 'react';

import { SpinnerRound } from '../SpinnerRound';

describe('SpinnerRound', () => {
  const color = 'red';

  it('matches the snapshot', () => {
    const { container } = render(
      <SpinnerRound color="#fff" size={100} speed={10} thickness={50} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('matches the snapshot with default props', () => {
    const { container } = render(<SpinnerRound />);

    expect(container).toMatchSnapshot();
  });

  it('renders null if disabled', () => {
    const { container } = render(<SpinnerRound enabled={false} />);

    expect(container.firstChild).toBe(null);
  });

  it('renders still if specified', () => {
    const { container } = render(<SpinnerRound still />);
    const circle = container.querySelector('circle');

    expect(circle?.style.animation).toBe('none');
  });

  it('passes props to styles', () => {
    const size = '20%';
    const thickness = 40;
    const speed = 50;
    const { container } = render(
      <SpinnerRound
        color={color}
        size={size}
        speed={speed}
        thickness={thickness}
      />,
    );
    const circle = container.querySelector('circle');

    expect(container.firstChild).toHaveStyle({ width: size });
    expect(circle).toHaveAttribute('stroke-width', `${3 * (thickness / 100)}`);
    expect(circle?.style.animation.includes(`${140 / speed}`)).toBe(true);
  });

  it('passes svg props overriding styles', () => {
    const className = 'test-class';
    const { container } = render(
      <SpinnerRound className={className} color="green" style={{ color }} />,
    );

    expect(container.firstChild).toHaveClass(className);
    expect(container.firstChild).toHaveStyle({ color });
  });
});
