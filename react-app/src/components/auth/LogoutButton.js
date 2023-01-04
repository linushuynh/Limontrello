import React from 'react';
import { useDispatch } from 'react-redux';
import { saveBoardsAction } from '../../store/board';
import { logout } from '../../store/session';
import styles from "../cssModules/LoginSignupButton.module.css"

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    await dispatch(saveBoardsAction(null))
  };

  return <button onClick={onLogout} className={styles.logoutButton}>Logout</button>;
};

export default LogoutButton;
