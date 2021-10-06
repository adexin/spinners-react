import React from 'react';
import { create, ReactTestRendererJSON } from 'react-test-renderer';

import { SpinnerRound } from '../SpinnerRound';

describe('SpinnerRound', () => {
  const color = 'red';

  it('matches the snapshot', () => {
    const component = create(<SpinnerRound color="#fff" size={100} speed={10} thickness={50} />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('matches the snapshot with default props', () => {
    const component = create(<SpinnerRound />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders null if disabled', () => {
    const component = create(<SpinnerRound enabled={false} />);

    expect(component.toJSON()).toBe(null);
  });

  it('renders still if specified', () => {
    const component = create(<SpinnerRound still />);
    const circle = component.root.findByType('circle');

    expect(circle.props.style.animation).toBe('none');
  });

  it('passes props to styles', () => {
    const size = '20%';
    const thickness = 40;
    const speed = 50;
    const component = create(
      <SpinnerRound color={color} size={size} speed={speed} thickness={thickness} />,
    );
    const { props: { style } } = component.toJSON() as ReactTestRendererJSON;
    const circle = component.root.findByType('circle');

    expect(style.width).toBe(size);
    expect(circle.props.strokeWidth).toBeCloseTo(3 * (thickness / 100));
    expect(circle.props.style.animation.includes(140 / speed)).toBe(true);
  });

  it('passes svg props overriding styles', () => {
    const className = 'test-class';
    const component = create(<SpinnerRound className={className} color="green" style={{ color }} />);
    const { props } = component.toJSON() as ReactTestRendererJSON;

    expect(props.className).toBe(className);
    expect(props.style.color).toBe(color);
  });
});
