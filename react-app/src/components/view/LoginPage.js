import React, { useState } from "react";
import LoginForm from "../auth/LoginForm";
import styles from "../cssModules/LoginPage.module.css"
import bottomLeft from "../../assets/bottom-left-trello.svg"
import bottomRight from "../../assets/bottom-right-trello.svg"
import limontrello from "../../assets/limontrello.png"
import atlassian from "../../assets/atlassian-logo.svg"
import linkedin from "../../assets/linkedin.png"
import github from "../../assets/github.svg"
import { useHistory } from "react-router-dom";

const LoginPage = () => {
    const history = useHistory()
    const [loaded, setLoaded] = useState(true)

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
                    <LoginForm loaded={loaded} setLoaded={setLoaded} />
                    <div>
                        <hr className={styles.hrBar} />
                        <div className={styles.footerContainer}>
                            <img alt="atlassianImg" src={atlassian} className={styles.atlassian} />
                        </div>
                        <div className={styles.aboutMeContainer}>
                            <div className={styles.nameCard}>
                                <div className={styles.linkContainer}>
                                <div>Linus Huynh</div>
                                    <div>
                                    <a
                                    className={styles.gitContainer}
                                    href="https://github.com/linushuynh"
                                    target="_blank"
                                    rel="noreferrer"
                                    >
                                        <img
                                        className={styles.githubImg}
                                        src={github}
                                        alt="github-icon"
                                        />
                                        {/* <div className={styles.gitText}>Github</div> */}
                                    </a>
                                    </div>
                                    <div>
                                    <a
                                    className={styles.linkedInContainer}
                                    href="https://www.linkedin.com/in/linus-huynh/"
                                    target="_blank"
                                    rel="noreferrer"
                                    >
                                        <img
                                            src={linkedin}
                                            alt="linkedIn-icon"
                                            className={styles.linkedInImg}
                                            />
                                        {/* <span className={styles.linkedInText}>LinkedIn</span> */}
                                    </a>
                                    </div>
                                </div>
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
