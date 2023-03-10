import React from 'react';
import { useLocation } from 'react-router-dom';
// import { loadBoardsThunk } from '../store/board';
// import { getUserThunk } from '../store/session';
import LogoutButton from './auth/LogoutButton';
import styles from "./cssModules/NavBar.module.css"
import icon from "../assets/limontrello.png"

const NavBar = () => {
  // const currentUser = useSelector(state => state.session.user)
  const location = useLocation()

  const setNavClass = () => {
    if (location.pathname === "/dashboard") {
      return styles.navBarContainer
    } else {
      return styles.transparentNavBarContainer
    }
  }

  const setTitleClass = () => {
    if (location.pathname === "/dashboard") {
      return styles.title
    } else {
      return styles.titleBoard
    }
  }

  return (
    <div className={setNavClass()}>
          <div>
            <div className={setTitleClass()}>
              <div className={styles.iconContainer}>
                <img src={icon} alt="icon" className="trelloIcon" />
              </div>
              Limontrello
            </div>
          </div>
          <div>
            <LogoutButton />
          </div>
    </div>
  );
}

export default NavBar;
