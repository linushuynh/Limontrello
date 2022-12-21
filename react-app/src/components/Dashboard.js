import React from "react";
import styles from "./cssModules/Dashboard.module.css"
import NavBar from "./NavBar";

const Dashboard = () => {
    return (
        <div className={styles.outerContainer}>
            <NavBar />
            <div className={styles.centeredContainer}>
                <div className={styles.workspaceContainer}>Workspaces</div>
                <div className={styles.mainContainer}>
                    <div className={styles.workspaceText}>Your Workspaces</div>
                    <div className={styles.workspaceSettings}>Main Workspace</div>
                    <div className={styles.boardsContainer}>
                        Map out each board here
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Dashboard
