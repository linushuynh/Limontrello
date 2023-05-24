import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Other components
import LoginForm from "../../../auth/LoginForm";
import Footer from "../Footer.js";

// CSS Styles
import styles from "./LoginPage.module.css"

// Assets
import limontrello from "../../../../assets/limontrello.png"
import bottomLeft from "../../../../assets/bottom-left-trello.svg"
import bottomRight from "../../../../assets/bottom-right-trello.svg"


const LoginPage = () => {
    const history = useHistory()
    const [loaded, setLoaded] = useState(true)

    // Takes user to landing page when function is called
    const redirectHome = () => history.push("/")

    return (
        <div className={styles.pageContainer}>
            {/* Center of screen with header, form, and footer */}
            <div className={styles.centeredContainer}>
                {/* Header Section */}
                <div className={styles.headerImageContainer} onClick={redirectHome}>
                    <img src={limontrello} alt="trello-img" className={styles.trelloHeader}></img>
                    Limontrello
                </div>

                {/* Section for Login Form and Footer Components */}
                <div className={styles.formNbarContainer}>
                    <LoginForm loaded={loaded} setLoaded={setLoaded} />
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

export default LoginPage;
