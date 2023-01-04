import React from "react";
import LoginForm from "../auth/LoginForm";
import styles from "../cssModules/LoginPage.module.css"
// import header from "../../assets/trello-logo-blue.svg"
import bottomLeft from "../../assets/bottom-left-trello.svg"
import bottomRight from "../../assets/bottom-right-trello.svg"
import limontrello from "../../assets/limontrello.png"

const LoginPage = () => {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.centeredContainer}>
                <div className={styles.headerImageContainer}>
                    <img src={limontrello} alt="trello-img" className={styles.trelloHeader}></img>
                    Limontrello
                </div>
                <LoginForm />
            </div>
            <div className={styles.backgroundImgContainer}>
                    <img src={bottomLeft} alt="bottomLeft" className={styles.leftImg} />
                    <img src={bottomRight} alt="bottomRight" className={styles.rightImg} />
            </div>
        </div>
    )
}

export default LoginPage;
