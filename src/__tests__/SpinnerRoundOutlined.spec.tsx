import React from 'react';
import { create, ReactTestRendererJSON } from 'react-test-renderer';

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
    const component = create(<SpinnerRoundOutlined color="#fff" size={100} speed={10} thickness={50} />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('matches the snapshot with default props', () => {
    const component = create(<SpinnerRoundOutlined />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders null if disabled', () => {
    const component = create(<SpinnerRoundOutlined enabled={false} />);

    expect(component.toJSON()).toBe(null);
  });

  it('renders still if specified', () => {
    const component = create(<SpinnerRoundOutlined still />);
    const circles = component.root.findAllByType('circle');

    circles.forEach((circle) => {
      expect(circle.props.style.animation).toBeUndefined();
    });
  });

  it('passes props to styles', () => {
    const size = '20%';
    const thickness = 40;
    const speed = 50;
    const component = create(
      <SpinnerRoundOutlined color={color} size={size} speed={speed} thickness={thickness} />,
    );
    const { props: { style } } = component.toJSON() as ReactTestRendererJSON;
    const circles = component.root.findAllByType('circle');

    expect(style.width).toBe(size);
    circles.forEach((circle, index) => {
      if (index) {
        expect(circle.props.style.animation.includes(140 / speed)).toBe(true);
        expect(circle.props.style.animation.includes(animations[index].name)).toBe(true);
        expect(circle.props.strokeWidth).toBeCloseTo(3 * (thickness / 100));
      } else {
        expect(circle.props.strokeWidth).toBe(animations[index].strokeWidth);
        expect(circle.props.style.animation).toBeUndefined();
      }
    });
  });

  it('passes svg props overriding styles', () => {
    const className = 'test-class';
    const component = create(<SpinnerRoundOutlined className={className} color="green" style={{ color }} />);
    const { props } = component.toJSON() as ReactTestRendererJSON;

    expect(props.className).toBe(className);
    expect(props.style.color).toBe(color);
  });
});
