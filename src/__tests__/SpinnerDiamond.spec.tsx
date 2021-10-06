import React from 'react';
import { create, ReactTestRendererJSON } from 'react-test-renderer';

import { SpinnerDiamond } from '../SpinnerDiamond';

describe('SpinnerDiamond', () => {
  const color = 'red';

  it('matches the snapshot', () => {
    const component = create(<SpinnerDiamond color="#fff" size={100} speed={10} thickness={50} />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('matches the snapshot with default props', () => {
    const component = create(<SpinnerDiamond />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders null if disabled', () => {
    const component = create(<SpinnerDiamond enabled={false} />);

    expect(component.toJSON()).toBe(null);
  });

  it('renders still if specified', () => {
    const component = create(<SpinnerDiamond still />);
    const group = component.root.findByType('g');

    expect(group.props.style.animation).toBe('none');
  });

  it('passes props to styles', () => {
    const size = '20%';
    const thickness = 40;
    const speed = 50;
    const component = create(
      <SpinnerDiamond color={color} size={size} speed={speed} thickness={thickness} />,
    );
    const { props: { style } } = component.toJSON() as ReactTestRendererJSON;
    const circles = component.root.findAllByType('circle');
    const last = circles.length - 1;
    const group = component.root.findByType('g');

    expect(style.width).toBe(size);
    expect(circles[0].props.r).toBeCloseTo(2.5 * (thickness / 100));
    expect(circles[last].props.r).toBeCloseTo(3.5 * (thickness / 100));
    expect(group.props.style.animation.includes(140 / speed)).toBe(true);
  });

  it('passes svg props overriding styles', () => {
    const className = 'test-class';
    const component = create(<SpinnerDiamond className={className} color="green" style={{ color }} />);
    const { props } = component.toJSON() as ReactTestRendererJSON;

    expect(props.className).toBe(className);
    expect(props.style.color).toBe(color);
  });
});
