import React from "react";
import LoginForm from "../auth/LoginForm";
import styles from "../cssModules/LoginPage.module.css"
import bottomLeft from "../../assets/bottom-left-trello.svg"
import bottomRight from "../../assets/bottom-right-trello.svg"
import limontrello from "../../assets/limontrello.png"
import atlassian from "../../assets/atlassian-logo.svg"

const LoginPage = () => {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.centeredContainer}>
                <div className={styles.headerImageContainer}>
                    <img src={limontrello} alt="trello-img" className={styles.trelloHeader}></img>
                    Limontrello
                </div>
                <div className={styles.formNbarContainer}>
                    <LoginForm />
                    <div>
                        <hr className={styles.hrBar} />
                        <div className={styles.footerContainer}>
                            <img alt="atlassianImg" src={atlassian} className={styles.atlassian} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.backgroundImgContainer}>
                    <img src={bottomLeft} alt="bottomLeft" className={styles.leftImg} />
                    <img src={bottomRight} alt="bottomRight" className={styles.rightImg} />
            </div>
        </div>
    )
}

export default LoginPage;
