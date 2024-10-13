import { render } from '@testing-library/react';
import React from 'react';

import { SpinnerRoundOutlined } from '../SpinnerRoundOutlined';

describe('SpinnerRoundOutlined', () => {
  const color = 'red';
  const animations = [
    {
      r: 2,
      strokeWidth: 4,
    },
    {
      name: 'spinners-react-round-outlined',
      r: 14,
    },
    {
      name: 'spinners-react-round-outlined',
      r: 28,
    },
  ];

  it('matches the snapshot', () => {
    const { container } = render(
      <SpinnerRoundOutlined color="#fff" size={100} speed={10} thickness={50} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('matches the snapshot with default props', () => {
    const { container } = render(<SpinnerRoundOutlined />);

    expect(container).toMatchSnapshot();
  });

  it('renders null if disabled', () => {
    const { container } = render(<SpinnerRoundOutlined enabled={false} />);

    expect(container.firstChild).toBe(null);
  });

  it('renders still if specified', () => {
    const { container } = render(<SpinnerRoundOutlined still />);
    const circles = container.querySelectorAll('circle');

    circles.forEach((circle) => {
      expect(circle.style.animation).toBe('');
    });
  });

  it('passes props to styles', () => {
    const size = '20%';
    const thickness = 40;
    const speed = 50;
    const { container } = render(
      <SpinnerRoundOutlined
        color={color}
        size={size}
        speed={speed}
        thickness={thickness}
      />,
    );
    const circles = container.querySelectorAll('circle');

    expect(container.firstChild).toHaveStyle({ width: size });
    circles.forEach((circle, index) => {
      if (index) {
        expect(circle.style.animation.includes(`${140 / speed}`)).toBe(true);
        expect(circle.style.animation.includes(animations[index].name)).toBe(
          true,
        );
        expect(circle).toHaveAttribute(
          'stroke-width',
          `${3 * (thickness / 100)}`,
        );
      } else {
        expect(circle).toHaveAttribute(
          'stroke-width',
          `${animations[index].strokeWidth}`,
        );
        expect(circle.style.animation).toBe('');
      }
    });
  });

  it('passes svg props overriding styles', () => {
    const className = 'test-class';
    const { container } = render(
      <SpinnerRoundOutlined
        className={className}
        color="green"
        style={{ color }}
      />,
    );

    expect(container.firstChild).toHaveClass(className);
    expect(container.firstChild).toHaveStyle({ color });
  });
});
