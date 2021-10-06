import React from 'react';
import { create, ReactTestRendererJSON } from 'react-test-renderer';

import { SpinnerDotted } from '../SpinnerDotted';

describe('SpinnerDotted', () => {
  const color = 'red';

  it('matches the snapshot', () => {
    const component = create(<SpinnerDotted color="#fff" size={100} speed={10} thickness={50} />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('matches the snapshot with default props', () => {
    const component = create(<SpinnerDotted />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders null if disabled', () => {
    const component = create(<SpinnerDotted enabled={false} />);

    expect(component.toJSON()).toBe(null);
  });

  it('renders still if specified', () => {
    const component = create(<SpinnerDotted still />);
    const circles = component.root.findAllByType('circle');
    const last = circles.length - 1;

    expect(circles[0].props.style.animation).toBeUndefined();
    expect(circles[last].props.style.animation).toBeUndefined();
    expect(circles[last].props.style.display).toBe('none');
  });

  it('passes props to styles', () => {
    const size = '20%';
    const thickness = 40;
    const speed = 50;
    const component = create(
      <SpinnerDotted color={color} size={size} speed={speed} thickness={thickness} />,
    );
    const { props: { style } } = component.toJSON() as ReactTestRendererJSON;
    const circles = component.root.findAllByType('circle');
    const last = circles.length - 1;
    const animationDuration = 200 / speed;

    expect(style.width).toBe(size);
    expect(circles[0].props.r).toBeCloseTo(3 * (thickness / 100));
    expect(circles[0].props.style.animation.includes(animationDuration)).toBe(true);
    expect(circles[last].props.r).toBeCloseTo(6 * (thickness / 100));
    expect(circles[last].props.style.animation.includes(animationDuration)).toBe(true);
  });

  it('passes svg props overriding styles', () => {
    const className = 'test-class';
    const component = create(<SpinnerDotted className={className} color="green" style={{ color }} />);
    const { props } = component.toJSON() as ReactTestRendererJSON;

    expect(props.className).toBe(className);
    expect(props.style.color).toBe(color);
  });
});
