import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

class LoginComponent extends React.Component<RouteComponentProps> {
  render() {
    return (
      <div className="Login">
        <header>
          <h1>Login</h1>
        </header>
        <div>
          <input placeholder="Emailadresse" />
          <br />
          <input placeholder="Passwort" type="password" />
        </div>
        <button onClick={() => this.props.history.push('/dashboard')}>Log In</button>
      </div>
    );
  }
}
const Login = withRouter(LoginComponent);
export default LoginComponent;
