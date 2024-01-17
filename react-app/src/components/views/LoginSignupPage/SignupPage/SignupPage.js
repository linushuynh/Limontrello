import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Other components
import SignUpForm from "../../../auth/SignUpForm";
import Footer from "../Footer.js";

// CSS Styles
import styles from "../LoginPage/LoginPage.module.css"

// Assets
import limontrello from "../../../../assets/limontrello.png"
import bottomLeft from "../../../../assets/bottom-left-trello.svg"
import bottomRight from "../../../../assets/bottom-right-trello.svg"


const SignupPage = () => {
    const history = useHistory()
    const [loaded, setLoaded] = useState(true)

    // Takes user to landing page when function is called
    const redirectHome = () => history.push("/")

    return (
        <div className={styles.pageContainer}>
            <div className={styles.centeredContainer}>
                <div className={styles.headerImageContainer} onClick={redirectHome}>
                    <img src={limontrello} alt="trello-img" className={styles.trelloHeader}></img>
                    Limontrello
                </div>
                <div className={styles.formNbarContainer}>
                    <SignUpForm loaded={loaded} setLoaded={setLoaded} />
                    <Footer />
                </div>
            </div>

            {/* Bottom left and right worker SVG's */}
            <div className={styles.backgroundImgContainer}>
                    <img src={bottomLeft} alt="bottomLeft" className={styles.leftImg} />
                    <img src={bottomRight} alt="bottomRight" className={styles.rightImg} />
            </div>
        </div>
    )
}

export default SignupPage;
