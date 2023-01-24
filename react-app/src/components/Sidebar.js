import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { loadBoardsThunk, loadSelectedBoardThunk, selectBoardAction } from "../store/board";
import snowmountain from "../assets/snowmountain.jpg"
import forest from "../assets/forest.jpg"
import beach from "../assets/beach.jpg"
import { SubmittedContext } from "./context/SubmittedContext";
import styles from "./cssModules/Sidebar.module.css"


const Sidebar = ({ setName }) => {
    // const [isSelected, setIsSelected] = useState("")
    const { setHasSubmitted } = useContext(SubmittedContext)
    const boards = useSelector(state => state.boards.savedBoards)
    const { boardId } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const location = useLocation()
    const currentUser = useSelector(state => state.session.user)
    const firstLetter = currentUser.username[0].toUpperCase()

    useEffect(() => {
        dispatch(loadBoardsThunk())
    }, [])

    // Apply sideBarHighlight className when on dashboard
    const dashBoardHighlightCheck = (mainClass) => {
        if (location.pathname === "/dashboard") {
            return `${mainClass} sideBarHighlight`
        }
        return mainClass
    }

    // Apply sideBarHighlight className to current selected board
    const boardHighlightCheck = (boardId) => {
        if (+location.pathname[location.pathname.length - 1] === +boardId) {
            return `${styles.boardItem} sideBarHighlight`
        }
        return styles.boardItem
    }

    const redirectBoard = async (eachBoard) => {
        await dispatch(selectBoardAction(eachBoard))
        history.push(`/b/${eachBoard.id}`)
        if (setName) {
            setName(eachBoard.name)
        }

    }

    const redirectDash = async () => {
        await dispatch(selectBoardAction(null))
        history.push(`/dashboard`)
    }

    // Conditionally renders icon
    const displayBackground = (background) => {
        if (background === "snowmountain") {
            return snowmountain
        } else if (background === "forest") {
            return forest
        } else if (background === "beach") {
            return beach
        }
        return snowmountain
    }

    if (!boards) return null

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
                    <div className={dashBoardHighlightCheck(styles.dashboardContainer)} onClick={redirectDash}>
                        <span className="material-symbols-outlined" id={styles.dashboardIcon}>grid_view</span>
                        <span>Dashboard</span>
                    </div>
                    <div className={styles.yourBoards}>
                        <span>Your Boards</span>
                        {/* <span className="material-symbols-outlined">add</span> */}
                    </div>
                    {Object.values(boards).map((eachBoard) =>(
                        <div key={eachBoard.id} className={boardHighlightCheck(eachBoard.id)} onClick={() => redirectBoard(eachBoard)}>
                                <img alt="boardIcon" src={displayBackground(eachBoard.background)} className={styles.boardIcon} ></img>
                            {eachBoard.name}
                        </div>
                        ))}
                </div>
            </div>
        </>
)}

export default Sidebar;
