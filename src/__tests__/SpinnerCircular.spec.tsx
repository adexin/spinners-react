import React from 'react';
import { create, ReactTestRendererJSON } from 'react-test-renderer';

import { SpinnerCircular } from '../SpinnerCircular';

describe('SpinnerCircular', () => {
  const color = 'red';

  it('matches the snapshot', () => {
    const component = create(<SpinnerCircular color="#fff" size={100} speed={10} thickness={50} />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('matches the snapshot with default props', () => {
    const component = create(<SpinnerCircular />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders null if disabled', () => {
    const component = create(<SpinnerCircular enabled={false} />);

    expect(component.toJSON()).toBe(null);
  });

  it('renders still if specified', () => {
    const component = create(<SpinnerCircular still />);
    const circles = component.root.findAllByType('circle');

    expect(circles[1].props.style.animation).toBeUndefined();
  });

  it('passes props to styles', () => {
    const size = '20%';
    const thickness = 40;
    const speed = 50;
    const component = create(
      <SpinnerCircular color={color} size={size} speed={speed} thickness={thickness} />,
    );
    const { props: { style } } = component.toJSON() as ReactTestRendererJSON;
    const circles = component.root.findAllByType('circle');

    expect(style.width).toBe(size);
    expect(circles[0].props.strokeWidth).toBeCloseTo(4 * (thickness / 100));
    expect(circles[1].props.style.animation.includes(140 / speed)).toBe(true);
  });

  it('passes svg props overriding styles', () => {
    const className = 'test-class';
    const component = create(<SpinnerCircular className={className} color="green" style={{ color }} />);
    const { props } = component.toJSON() as ReactTestRendererJSON;

    expect(props.className).toBe(className);
    expect(props.style.color).toBe(color);
  });
});
