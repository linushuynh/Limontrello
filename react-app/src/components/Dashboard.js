import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserThunk } from "../store/session";
import styles from "./cssModules/Dashboard.module.css"
import NavBar from "./NavBar";
import BoardCard from "./BoardCard";
// import { Modal } from "./context/Modal.js"
import { CreateBoardModal } from "./context/CreateBoardModal";
import CreateBoardForm from "./forms/CreateBoardForm";
import { saveBoardsAction } from "../store/board";

const Dashboard = () => {
    let boardsObj = useSelector(state => state.boards.savedBoards)
    const currentUser = useSelector(state => state.session.user)
    const currentUserId = currentUser.id
    const dispatch = useDispatch();
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);

    let boards;
    // Uses boards from current user if there is no state. And if there is a boards state, then load it instead
    if (!boardsObj) {
        // console.log("loading from current user's boards")
        boards = currentUser.boards
    } else {
        // console.log("loading from board state")
        boards = Object.values(boardsObj)
    }

    if (!currentUser) {
        history.push("/login")
    }

    // On first render, load user state and save current boards to state
    useEffect(() => {
        dispatch(getUserThunk(currentUserId))
        dispatch(saveBoardsAction(boards))
    }, [dispatch, currentUserId])


    if (!boards) return null

    return (
        <div className={styles.outerContainer}>
            <NavBar />
            <div className={styles.centeredContainer}>
                <div className={styles.workspaceContainer}>Workspaces Dropdown</div>
                <div className={styles.mainContainer}>
                    <div className={styles.workspaceText}>Your Workspaces</div>
                    <div className={styles.workspaceSettings}>Main Workspace</div>
                    <div className={styles.boardsContainer}>
                        {boards && boards.map((board) => (
                            <div key={board.id}>
                                <BoardCard board={board} />
                            </div>
                        ))}

                        <div className={styles.addBoardContainer} >
                            <div className={styles.createBoardText} onClick={() => setShowModal(true)}>
                               Create new board
                            </div>
                            <div>
                            {showModal && (<CreateBoardModal onClose={() => setShowModal(false)}>
                                <CreateBoardForm setShowModal={setShowModal} />
                            </CreateBoardModal>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Dashboard
