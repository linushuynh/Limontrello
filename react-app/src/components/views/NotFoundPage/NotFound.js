import React from "react";
import { useHistory } from "react-router-dom";

import styles from "./NotFound.module.css"

import jt from "../../../assets/johntravolta.gif"


const NotFound = () => {
    const history = useHistory()

    // Redirects users back to landing
    const redirectHome = () => {
        history.push("/")
    }

    return (
            <div className={styles.mainContainer}>
                {/* Header text */}
                <div className={styles.mainText}>
                    Page not found.
                </div>
                <div className={styles.subText}>
                This page is private or does not exist.
                </div>

                {/* John travolta being lost gif */}
                <div>
                    <img alt="jt" src={jt} className={styles.jt}/>
                </div>

                {/* Return home button */}
                <div className={styles.returnButton} onClick={redirectHome}>Take me back</div>
            </div>
    )
}

export default NotFound
