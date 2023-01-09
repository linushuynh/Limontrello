import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "../cssModules/Landing.module.css"
import icon from "../../assets/limontrello.png"

const Landing = () => {
    const currentUser = useSelector(state => state.session.user)
    const history = useHistory()

    if (currentUser) {
        history.push("/dashboard")
    }

    const redirectLogin = () => {
        history.push("/login")
    }

    const redirectSignup = () => {
        history.push("/signup")
    }

    return (
        <>
            {/* <div className={styles.fillerDiv} /> */}
            <div className={styles.mainContainer}>
                <div className={styles.gradientContainer}>
                    <div className={styles.introTextContainer}>
                        <div className={styles.introTextHeader} >Limontrello brings all your tasks, teammates, and tools together</div>
                        <div className={styles.introTextSubheader}>Keep everything in the same place.</div>
                        <div className={styles.introSignupButton} onClick={redirectSignup}>Sign up - it's free!</div>
                    </div>
                    <div className={styles.teamImgContainer}>
                        <img src="https://images.ctfassets.net/rz1oowkt5gyp/75rDABL8fyMtNLlUAtBxrg/c5e145977a86c41c47e17c69410c64f7/TrelloUICollage_4x.png?w=1140&fm=webp" alt="pic" />
                    </div>
                </div>
            </div>

            <div className={styles.navContainer}>
                <div className={styles.limontrelloContainer}>
                    <div className={styles.iconContainer}>
                        <img src={icon} alt="icon" className={styles.limontrelloIcon} />
                    </div>
                    Limontrello
                </div>
                <div className={styles.buttonsContainer}>
                    <div id={styles.loginButton} onClick={redirectLogin}>
                        Log in
                    </div>
                    <div id={styles.signupButton} onClick={redirectSignup} >
                        Join Limontrello for free
                    </div>
                </div>
            </div>
        </>
    )
}

export default Landing;
