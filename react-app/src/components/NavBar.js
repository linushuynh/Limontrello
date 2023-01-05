import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
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
  const location = useLocation()
  let navClass;

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

  const redirectHome = async () => {
    await dispatch(loadBoardsThunk())
    history.push("/dashboard")
  }

  return (
    <div className={setNavClass()}>
          <div>
            <div className={setTitleClass()} onClick={redirectHome}>
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
