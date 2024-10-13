import { render } from '@testing-library/react';
import React from 'react';

import { SpinnerDiamond } from '../SpinnerDiamond';

describe('SpinnerDiamond', () => {
  const color = 'red';

  it('matches the snapshot', () => {
    const { container } = render(
      <SpinnerDiamond color="#fff" size={100} speed={10} thickness={50} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('matches the snapshot with default props', () => {
    const { container } = render(<SpinnerDiamond />);

    expect(container).toMatchSnapshot();
  });

  it('renders null if disabled', () => {
    const { container } = render(<SpinnerDiamond enabled={false} />);

    expect(container.firstChild).toBe(null);
  });

  it('renders still if specified', () => {
    const { container } = render(<SpinnerDiamond still />);
    const group = container.querySelector('g');

    expect(group?.style.animation).toBe('none');
  });

  it('passes props to styles', () => {
    const size = '20%';
    const thickness = 40;
    const speed = 50;
    const { container } = render(
      <SpinnerDiamond
        color={color}
        secondaryColor="blue"
        size={size}
        speed={speed}
        thickness={thickness}
      />,
    );
    const circles = container.querySelectorAll('circle');
    const last = circles.length - 1;
    const group = container.querySelector('g');

    expect(container.firstChild).toHaveStyle({ width: size });
    expect(circles[0]).toHaveAttribute('r', `${2.5 * (thickness / 100)}`);
    expect(circles[last]).toHaveAttribute('r', `${3.5 * (thickness / 100)}`);
    expect(group?.style.animation.includes(`${140 / speed}`)).toBe(true);
  });

  it('passes svg props overriding styles', () => {
    const className = 'test-class';
    const { container } = render(
      <SpinnerDiamond className={className} color="green" style={{ color }} />,
    );

    expect(container.firstChild).toHaveClass(className);
    expect(container.firstChild).toHaveStyle({ color });
  });
});
