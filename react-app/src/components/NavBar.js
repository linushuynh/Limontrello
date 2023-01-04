import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loadBoardsThunk } from '../store/board';
// import { getUserThunk } from '../store/session';
import LogoutButton from './auth/LogoutButton';
import styles from "./cssModules/NavBar.module.css"
import icon from "../assets/limontrello.png"
// import gif from "../assets/trello.gif"

const NavBar = () => {
  // const currentUser = useSelector(state => state.session.user)
  const history = useHistory()
  const dispatch = useDispatch()

  const redirectHome = async () => {
    await dispatch(loadBoardsThunk())
    history.push("/dashboard")
  }

  return (
    <div className={styles.navBarContainer}>
          <div>
            <div className={styles.title} onClick={redirectHome}>
              <img src={icon} alt="gif" className="trelloIcon" />
              {/* <img src={gif} alt="gif" className={styles.gif} /> */}
              Limontrello
            </div>
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
