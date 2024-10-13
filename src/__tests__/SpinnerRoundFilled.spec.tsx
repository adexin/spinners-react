import { render } from '@testing-library/react';
import React from 'react';

import { SpinnerRoundFilled } from '../SpinnerRoundFilled';

describe('SpinnerRoundFilled', () => {
  const color = 'red';
  const animations = [
    { r: 4 },
    {
      name: 'spinners-react-round-filled-inner',
      r: 12.66,
    },
    {
      name: 'spinners-react-round-filled-center',
      r: 20.32,
    },
    {
      name: 'spinners-react-round-filled-outer',
      r: 27.5,
    },
  ];

  it('matches the snapshot', () => {
    const { container } = render(
      <SpinnerRoundFilled color="#fff" size={100} speed={10} thickness={50} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('matches the snapshot with default props', () => {
    const { container } = render(<SpinnerRoundFilled />);

    expect(container).toMatchSnapshot();
  });

  it('renders null if disabled', () => {
    const { container } = render(<SpinnerRoundFilled enabled={false} />);

    expect(container.firstChild).toBe(null);
  });

  it('renders still if specified', () => {
    const { container } = render(<SpinnerRoundFilled still />);
    const circles = container.querySelectorAll('circle');

    circles.forEach((circle, index) => {
      expect(circle.style.animation).toBe('none');
      expect(circle).toHaveAttribute('r', `${animations[index].r}`);
    });
  });

  it('passes props to styles', () => {
    const size = '20%';
    const thickness = 40;
    const speed = 50;
    const { container } = render(
      <SpinnerRoundFilled
        color={color}
        size={size}
        speed={speed}
        thickness={thickness}
      />,
    );
    const circles = container.querySelectorAll('circle');

    expect(container.firstChild).toHaveStyle({ width: size });
    circles.forEach((circle, index) => {
      expect(
        circle.style.animation.includes(animations[index].name || 'none'),
      ).toBe(true);
      if (index) {
        expect(circle.style.animation.includes(`${140 / speed}`)).toBe(true);
      }
      expect(circle).toHaveAttribute(
        'r',
        `${
          index ? animations[index].r * (thickness / 100) : animations[index].r
        }`,
      );
    });
  });

  it('passes svg props overriding styles', () => {
    const className = 'test-class';
    const { container } = render(
      <SpinnerRoundFilled
        className={className}
        color="green"
        style={{ color }}
      />,
    );

    expect(container.firstChild).toHaveClass(className);
    expect(container.firstChild).toHaveStyle({ color });
  });
});
