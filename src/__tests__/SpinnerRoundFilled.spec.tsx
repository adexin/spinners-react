import React from 'react';
import { create, ReactTestRendererJSON } from 'react-test-renderer';

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
    const component = create(<SpinnerRoundFilled color="#fff" size={100} speed={10} thickness={50} />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('matches the snapshot with default props', () => {
    const component = create(<SpinnerRoundFilled />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders null if disabled', () => {
    const component = create(<SpinnerRoundFilled enabled={false} />);

    expect(component.toJSON()).toBe(null);
  });

  it('renders still if specified', () => {
    const component = create(<SpinnerRoundFilled still />);
    const circles = component.root.findAllByType('circle');

    circles.forEach((circle, index) => {
      expect(circle.props.style.animation).toBe('none');
      expect(circle.props.r).toBe(animations[index].r);
    });
  });

  it('passes props to styles', () => {
    const size = '20%';
    const thickness = 40;
    const speed = 50;
    const component = create(
      <SpinnerRoundFilled color={color} size={size} speed={speed} thickness={thickness} />,
    );
    const { props: { style } } = component.toJSON() as ReactTestRendererJSON;
    const circles = component.root.findAllByType('circle');

    expect(style.width).toBe(size);
    circles.forEach((circle, index) => {
      expect(circle.props.style.animation.includes(animations[index].name || 'none')).toBe(true);
      if (index) expect(circle.props.style.animation.includes(140 / speed)).toBe(true);
      expect(circle.props.r).toBeCloseTo(
        index ? animations[index].r * (thickness / 100) : animations[index].r,
      );
    });
  });

  it('passes svg props overriding styles', () => {
    const className = 'test-class';
    const component = create(<SpinnerRoundFilled className={className} color="green" style={{ color }} />);
    const { props } = component.toJSON() as ReactTestRendererJSON;

    expect(props.className).toBe(className);
    expect(props.style.color).toBe(color);
  });
});
