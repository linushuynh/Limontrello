import React from "react";
import LoginForm from "../auth/LoginForm";
import styles from "../cssModules/LoginPage.module.css"
import bottomLeft from "../../assets/bottom-left-trello.svg"
import bottomRight from "../../assets/bottom-right-trello.svg"
import limontrello from "../../assets/limontrello.png"
import atlassian from "../../assets/atlassian-logo.svg"
import { useHistory } from "react-router-dom";

const LoginPage = () => {
    const history = useHistory()

    const redirectHome = () => {
        history.push("/")
    }

    return (
        <div className={styles.pageContainer}>
            <div className={styles.centeredContainer}>
                <div className={styles.headerImageContainer} onClick={redirectHome}>
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
                        <div className={styles.aboutMeContainer}>
                            <div className={styles.nameCard}>
                                <div>Linus Huynh</div>
                                <a
                                className={styles.gitContainer}
                                href="https://github.com/linushuynh"
                                target="_blank"
                                rel="noreferrer"
                                >
                                    <div>
                                      <img
                                        className={styles.githubImg}
                                        src="https://img.icons8.com/ios-glyphs/30/FFFFFF/github.png"
                                        alt="github-icon"
                                      />
                                    </div>
                                    <div className={styles.gitText}>Github</div>
                                </a>
                            </div>
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
