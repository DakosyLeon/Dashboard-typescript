import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <div className="nav">
      <ul>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/App">App</NavLink>
        </li>
      </ul>
    </div>
  );
}
export default Navigation;
