import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import styles from "./cssModules/NavBar.module.css"

const NavBar = () => {
  return (
    <div className={styles.navBarContainer}>
          <div>
            <NavLink to='/dashboard' exact={true} activeClassName='active' className={styles.navBar}>
              Limontrello
            </NavLink>
          </div>
          {/* <li>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </li> */}
          <div>
            <LogoutButton />
          </div>
    </div>
  );
}

export default NavBar;
