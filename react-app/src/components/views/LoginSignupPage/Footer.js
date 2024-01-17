import React from "react";

// CSS import
import styles from "./LoginPage/LoginPage.module.css"

// Assets
import linkedin from "../../../assets/linkedin.png"
import github from "../../../assets/github.svg"
import atlassian from "../../../assets/atlassian-logo.svg"

// Footer component for both Login/Signup pages
const Footer = () => {

    return (
        <section>
            {/* Divider */}
            <hr className={styles.hrBar} />

            {/* Atlassian Icon */}
            <div className={styles.footerContainer}>
                <img alt="atlassianImg" src={atlassian} className={styles.atlassian} />
            </div>

            {/* Row with Name, GitHub, and LinkedIn */}
            <div className={styles.aboutMeContainer}>
                <div className={styles.nameCard}>
                    <div className={styles.linkContainer}>
                        {/* Display my name */}
                        <div>Linus Huynh</div>

                        {/* Clickable GitHub Icon */}
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
                            </a>
                        </div>

                        {/* Clickable LinkedIn Icon */}
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
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
)}

export default Footer;
