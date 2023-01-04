import React from "react";
import styles from "../cssModules/LoginPage.module.css"
import limontrello from "../../assets/limontrello.png"
import bottomLeft from "../../assets/bottom-left-trello.svg"
import bottomRight from "../../assets/bottom-right-trello.svg"
import SignUpForm from "../auth/SignUpForm";
import atlassian from "../../assets/atlassian-logo.svg"

const SignupPage = () => {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.centeredContainer}>
                <div className={styles.headerImageContainer}>
                    <img src={limontrello} alt="trello-img" className={styles.trelloHeader}></img>
                    Limontrello
                </div>
                <div className={styles.formNbarContainer}>
                    <SignUpForm />
                    <hr className={styles.hrBar} />
                    <div className={styles.footerContainer}>
                        <img alt="atlassianImg" src={atlassian} className={styles.atlassian} />
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

export default SignupPage;
