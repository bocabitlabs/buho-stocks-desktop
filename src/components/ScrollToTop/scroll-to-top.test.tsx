import React from 'react';
import {ScrollToTop} from './scroll-to-top';
import { renderWithRouter } from 'utils/test-utils';

describe("<ScrollToTop/> tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('renders component', () => {
    const { container } = renderWithRouter(<div className="mainDiv"><ScrollToTop /></div>);
    expect(container.firstChild).toHaveClass('mainDiv');
  });
});