import React from "react";
// import NavBar from "../NavBar";
import styles from "../cssModules/NotFound.module.css"
import jt from "../../assets/johntravolta.gif"
import { useHistory } from "react-router-dom";

const NotFound = () => {
    const history = useHistory()

    const redirectHome = () => {
        history.push("/")
    }

    return (
            <div className={styles.mainContainer}>
                <div className={styles.mainText}>
                    Page not found.
                </div>
                <div className={styles.subText}>
                This page is private or does not exist.
                </div>
                <div>
                    <img alt="jt" src={jt} className={styles.jt}/>
                </div>
                <div className={styles.returnButton} onClick={redirectHome}>Take me back</div>
            </div>
    )
}

export default NotFound
