import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// Assets
import styles from "./Landing.module.css"
import icon from "../../../assets/limontrello.png"
import waves from "../../../assets/limonwaves.svg"


const Landing = () => {
    const currentUser = useSelector(state => state.session.user)
    const history = useHistory()

    // Redirect user to dashboard if currentuser is already logged in
    if (currentUser) {
        history.push("/dashboard")
    }

    // Take users to login/signup page accordingly
    const redirectLogin = () => history.push("/login")
    const redirectSignup = () => history.push("/signup")

    return (
        <>
            <div className={styles.mainContainer}>
                {/* Intro section with moving waves */}
                <div className={styles.gradient} />
                <img src={waves} alt="waves" className={styles.waves} draggable="false" />
                <section>
                    <div className={styles.contentContainer}>
                        <div className={styles.introTextContainer}>
                            <div className={styles.introTextHeader} >Limontrello brings all your tasks, teammates, and tools together</div>
                            <div className={styles.introTextSubheader}>Keep everything in the same place.</div>
                            <div className={styles.introSignupButton} onClick={redirectSignup}>Sign up - it's free!</div>
                        </div>
                        <div className={styles.teamImgContainer}>
                            <img src="https://images.ctfassets.net/rz1oowkt5gyp/75rDABL8fyMtNLlUAtBxrg/c5e145977a86c41c47e17c69410c64f7/TrelloUICollage_4x.png?w=1140&fm=webp" alt="teampic" draggable="false" />
                        </div>
                    </div>
                </section>

                {/* Second section */}
                <div className={styles.gradient2} />
                <section className={styles.section}>
                    <div className={styles.miniHeader}>
                        Limontrello 101
                    </div>
                    <div className={styles.sectionHeader} >
                        A productivity powerhouse
                    </div>
                    <div className={styles.sectionInfo}>
                        Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a clear view of who’s doing what and what needs to get done.
                    </div>

                    <div className={styles.carousel}>
                        <button className={styles.carousel_board}>
                            <div className={styles.carousel_item}>
                                <p>Boards</p>
                                <div>Limontrello boards keep tasks organized and work moving forward. In a glance, see everything from "things to do" to "aww yeah, we did it!"</div>
                            </div>
                        </button>
                        <button className={styles.carousel_list}>
                            <div className={styles.carousel_item}>
                                <p>Lists</p>
                                <div>The different stages of a task. Start as simple as To Do, Doing or Done—or build a workflow custom fit to your team’s needs. There’s no wrong way to Limontrello.</div>
                            </div>
                        </button>
                        <button className={styles.carousel_card}>
                            <div className={styles.carousel_item}>
                                <p>Cards</p>
                                <div>Cards represent tasks and ideas and hold all the information to get the job done. As you make progress, move cards across lists to show their status.</div>
                            </div>
                        </button>
                        <div className={styles.carousel_img}>

                        </div>
                    </div>
                </section>
            </div>

            {/* Landing Navbar */}
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
