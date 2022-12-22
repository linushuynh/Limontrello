import React from "react";
import styles from "../cssModules/BoardView.module.css"

const BoardView = () => {
    return (
        <div className={styles.outerContainer}>
            <div className={styles.headerContainer}>
                Header
            </div>
            <div className={styles.bodyContainer}>
                <div className={styles.boardListContainer}>board list</div>
                <div className={styles.mainContainer}>
                    
                </div>
            </div>
        </div>
    )
}

export default BoardView
