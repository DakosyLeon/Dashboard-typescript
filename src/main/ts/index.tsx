// tslint:disable-next-line
import 'app.scss';
import React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';

export function render(wrapper: (app: JSX.Element) => JSX.Element) {
  ReactDOM.render(wrapper(<App />), document.getElementById('app'));
}
