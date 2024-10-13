import { render } from '@testing-library/react';
import React from 'react';

import { SpinnerRomb } from '../SpinnerRomb';

describe('SpinnerRomb', () => {
  it('exists for backward compatibility', () => {
    const { container } = render(
      <SpinnerRomb color="#fff" size={100} speed={10} thickness={50} />,
    );

    expect(container).toMatchSnapshot();
  });
});
