import React from 'react';
import { renderWithRedux } from '../testRenderWithRedux'
import Toolbar from './Toolbar';
import 'jest-styled-components';

test('it works', () => {
    const { container } = renderWithRedux(<Toolbar />);
    expect(container.firstChild).toMatchSnapshot()
})
