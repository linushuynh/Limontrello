import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

// Util functions
import { redirectBoard, redirectDash } from "./utils/redirect.js";
import { dashBoardHighlightCheck, boardHighlightCheck } from "./utils/highlightStyles.js";
import { displayIcon } from "./utils/displayIcon.js";

// CSS and assets
import styles from "./Sidebar.module.css"


const Sidebar = ({ boards, setName }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const location = useLocation()

    // Load current user's data from store and extract username's first initial
    const currentUser = useSelector(state => state.session.user)
    const firstLetter = currentUser.username[0].toUpperCase()


    return (
            <div className={styles.outerContainer}>
                {/* Header with giant colored letter and Main Workspace text */}
                <div className={styles.headerInfo}>
                    <div className={styles.firstLetter}>{firstLetter}</div>
                    <div className={styles.headerText}>
                        <div className={styles.workspaceText}>
                            Main Workspace
                        </div>
                    </div>
                </div>

                {/* Styled divider */}
                <div className={styles.hrContainer}><hr className={styles.hrBar} /></div>

                {/* Container for all options given to the user including dashboard and every board */}
                <div className={styles.centeredContainer}>
                    {/* Hightlightable bar for redirecting to dashboard */}
                    <div className={dashBoardHighlightCheck(styles.dashboardContainer, location.pathname)} onClick={() => redirectDash(dispatch, history)}>
                        <span className="material-symbols-outlined" id={styles.dashboardIcon}>grid_view</span>
                        <span>Dashboard</span>
                    </div>

                    {/* Styled text for Your Boards label*/}
                    <div className={styles.yourBoards}>
                        <span>Your Boards</span>
                    </div>

                    {/* Map out all the boards of the user in its own styled div with a corresponding icon */}
                    {boards.map((eachBoard) => (
                        <div key={eachBoard.id} className={boardHighlightCheck(styles.boardItem, eachBoard.id, location.pathname)} onClick={() => redirectBoard(eachBoard, dispatch, history, setName)}>
                            <img alt="boardIcon" src={displayIcon(eachBoard.background)} className={styles.boardIcon} />
                            <span>{eachBoard.name}</span>
                        </div>
                    ))}

                </div>
            </div>
)}

export default Sidebar;
