import React from 'react';
import { useLocation } from 'react-router-dom';

// Other components
import LogoutButton from '../../auth/LogoutButton';

// Util Functions
import { setNavClass, setTitleClass } from './classSwitchFunctions';

// CSS and assets
import styles from "./NavBar.module.css"
import icon from "../../../assets/limontrello.png"


const NavBar = () => {
  const location = useLocation()

  return (
    <div className={setNavClass(location.pathname)}>
          <div>
            <div className={setTitleClass(location.pathname)}>
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
