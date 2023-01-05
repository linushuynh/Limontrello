import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { selectBoardAction } from "../store/board";
// import { SubmittedContext } from "./context/SubmittedContext";
import styles from "./cssModules/Sidebar.module.css"



const Sidebar = ({ boards, setName }) => {
    // const [isSelected, setIsSelected] = useState("")
    const history = useHistory()
    const dispatch = useDispatch()
    const location = useLocation()
    const currentUser = useSelector(state => state.session.user)
    const firstLetter = currentUser.username[0].toUpperCase()
    // const { setHasSubmitted } = useContext(SubmittedContext)

    const highlightCheck = (mainClass) => {
        if (location.pathname === "/dashboard") {
            return `${mainClass} sideBarHighlight`
        }
        return mainClass
    }

    const redirectBoard = async (eachBoard) => {
        await dispatch(selectBoardAction(eachBoard))
        history.push(`/b/${eachBoard.id}`)
        if (setName) {
            setName(eachBoard.name)
        }
        // setHasSubmitted(prevValue => !prevValue)
    }

    const redirectDash = async () => {
        await dispatch(selectBoardAction(null))
        history.push(`/dashboard`)
    }

    return (
        <>
            <div className={styles.outerContainer}>
                {/* <div className={styles.workspaceTitle} >Main Workspace</div> */}
                <div className={styles.headerInfo}>
                    <div className={styles.firstLetter}>{firstLetter}</div>
                    <div className={styles.headerText}>
                        <div className={styles.workspaceText}>
                            Main Workspace
                        </div>
                    </div>
                </div>
                <div className={styles.hrContainer}><hr className={styles.hrBar} /></div>
                <div className={styles.centeredContainer}>
                    <div className={highlightCheck(styles.dashboardContainer)} onClick={redirectDash}>
                        <span className="material-symbols-outlined" id={styles.dashboardIcon}>grid_view</span>
                        <span>Dashboard</span>
                    </div>
                    <div className={styles.yourBoards}>
                        <span>Your Boards</span>
                        {/* <span className="material-symbols-outlined">add</span> */}
                    </div>
                    {boards.map((eachBoard) =>(
                        <div key={eachBoard.id} className={styles.boardItem} onClick={() => redirectBoard(eachBoard)}>
                                <img alt="boardIcon" src="https://wallpaper.dog/large/5526740.jpg" className={styles.boardIcon} ></img>
                            {eachBoard.name}
                        </div>
                        ))}
                </div>
            </div>
        </>
)}

export default Sidebar;
