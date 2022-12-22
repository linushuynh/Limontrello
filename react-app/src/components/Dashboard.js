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

const Dashboard = () => {
    const currentUser = useSelector(state => state.session.user)
    const currentUserId = currentUser.id
    const dispatch = useDispatch();
    const history = useHistory();
    const boards = currentUser.boards;
    const [showModal, setShowModal] = useState(false);

    if (!currentUser) {
        history.push("/login")
    }

    useEffect(() => {
        dispatch(getUserThunk(currentUserId))
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
                            <div>
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
