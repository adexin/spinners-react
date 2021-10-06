import React from 'react';
import { create, ReactTestRendererJSON } from 'react-test-renderer';

import { SpinnerInfinity } from '../SpinnerInfinity';

describe('SpinnerInfinity', () => {
  const color = 'red';

  it('matches the snapshot', () => {
    const component = create(<SpinnerInfinity color="#fff" size={100} speed={10} thickness={50} />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('matches the snapshot with default props', () => {
    const component = create(<SpinnerInfinity />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders null if disabled', () => {
    const component = create(<SpinnerInfinity enabled={false} />);

    expect(component.toJSON()).toBe(null);
  });

  it('renders still if specified', () => {
    const component = create(<SpinnerInfinity still />);
    const uses = component.root.findAllByType('use');

    expect(uses[1].props.style.animation).toBeUndefined();
  });

  it('passes props to styles', () => {
    const size = '20%';
    const thickness = 40;
    const speed = 50;
    const component = create(
      <SpinnerInfinity color={color} size={size} speed={speed} thickness={thickness} />,
    );
    const { props: { style } } = component.toJSON() as ReactTestRendererJSON;
    const uses = component.root.findAllByType('use');
    const strokeWidth = 7 * (thickness / 100);

    expect(style.width).toBe(size);
    expect(uses[0].props.strokeWidth).toBeCloseTo(strokeWidth);
    expect(uses[1].props.strokeWidth).toBeCloseTo(strokeWidth);
    expect(uses[1].props.style.animation.includes(140 / speed)).toBe(true);
  });

  it('passes svg props overriding styles', () => {
    const className = 'test-class';
    const component = create(<SpinnerInfinity className={className} color="green" style={{ color }} />);
    const { props } = component.toJSON() as ReactTestRendererJSON;

    expect(props.className).toBe(className);
    expect(props.style.color).toBe(color);
  });
});
