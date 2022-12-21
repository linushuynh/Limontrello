import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserThunk } from "../store/session";
import styles from "./cssModules/Dashboard.module.css"
import NavBar from "./NavBar";
import BoardCard from "./BoardCard";

const Dashboard = () => {
    const currentUser = useSelector(state => state.session.user)
    const currentUserId = currentUser.id
    const dispatch = useDispatch();
    const history = useHistory();
    const boards = currentUser.boards

    if (!currentUser) {
        history.push("/login")
    }

    useEffect(() => {
        dispatch(getUserThunk(currentUserId))
    }, [dispatch, currentUserId])

    return (
        <div className={styles.outerContainer}>
            <NavBar />
            <div className={styles.centeredContainer}>
                <div className={styles.workspaceContainer}>Workspaces</div>
                <div className={styles.mainContainer}>
                    <div className={styles.workspaceText}>Your Workspaces</div>
                    <div className={styles.workspaceSettings}>Main Workspace</div>
                    <div className={styles.boardsContainer}>
                        Map out each board here
                        {boards && boards.map((board) => (
                            <BoardCard board={board} />
                        ))}
                        <div className={styles.addBoardContainer}>
                            <div>Create a new board</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Dashboard
