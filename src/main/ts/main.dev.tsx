// tslint:disable-next-line
import 'polyfills';

import React from 'react';
import { AppContainer } from 'react-hot-loader';

import { render } from './index';

function _render() {
  render(app => <AppContainer>{app}</AppContainer>);
}

_render();

if (module.hot) {
  module.hot.accept('./index', _render);
}
