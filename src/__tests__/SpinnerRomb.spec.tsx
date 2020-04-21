import React from 'react';
import { create } from 'react-test-renderer';

import { SpinnerRomb } from '../SpinnerRomb';

describe('SpinnerRomb', () => {
  it('exists for backward compatibility', () => {
    const component = create(<SpinnerRomb color="#fff" size={100} speed={10} thickness={50} />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
