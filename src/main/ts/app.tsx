import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Navigation from './navigation/navigation';
import Dashboard from './ships/dashboard';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="index">
          <Navigation />
          {/* <Route exact={true} path="/login" component={Login} /> */}
          <Route exact={true} path="/dashboard" component={Dashboard} />
          {/*  <Route exact={true} path="/App" component={App} /> */}
        </div>
      </HashRouter>
    );
  }
}

export default App;
