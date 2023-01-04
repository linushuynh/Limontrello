import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { selectBoardAction } from "../store/board";
import styles from "./cssModules/Sidebar.module.css"


const Sidebar = ({ boards }) => {
    const [isSelected, setIsSelected] = useState("")
    const history = useHistory()
    const dispatch = useDispatch()
    const location = useLocation()

    const highlightCheck = (mainClass) => {
        if (location.pathname === "/dashboard") {
            return `${mainClass} sideBarHighlight`
        }
        return mainClass
    }

    const redirectBoard = async (eachBoard) => {
        await dispatch(selectBoardAction(eachBoard))
        history.push(`/b/${eachBoard.id}`)
    }

    const redirectDash = async () => {
        await dispatch(selectBoardAction(null))
        history.push(`/dashboard`)
    }

    return (
        <>
            <div className={styles.outerContainer}>
                <div className={styles.workspaceTitle} >Main Workspace</div>
                <div className={styles.hrContainer}><hr className={styles.hrBar} /></div>
                <div className={styles.centeredContainer}>
                    <div className={highlightCheck(styles.boardsTab)} onClick={redirectDash}>
                        Dashboard
                    </div>
                    <div className={styles.yourBoards}>
                        <span>Your Boards</span> <span className="material-symbols-outlined">add</span>
                    </div>
                    {boards.map((eachBoard) =>(
                        <div key={eachBoard.id} className={styles.boardItem} onClick={() => redirectBoard(eachBoard)}>{eachBoard.name}</div>
                        ))}
                </div>
            </div>
        </>
)}

export default Sidebar;
