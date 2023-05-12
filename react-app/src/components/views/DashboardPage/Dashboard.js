import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// CSS import
import styles from "./Dashboard.module.css"

// Inner Components
import BoardCard from "../../BoardCard";
import NavBar from "../../NavBar";
import Sidebar from "../../Sidebar";
import CreateBoardForm from "../../forms/CreateBoardForm";

// Thunks and Modals
import { getUserThunk } from "../../../store/session";
import { saveBoardsAction } from "../../../store/board";
import { CreateBoardModal } from "../../context/CreateBoardModal";


const Dashboard = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    // Togglable states for re-render
    const [showModal, setShowModal] = useState(false);
    const [hasClicked, setHasClicked] = useState(false);

    // Grab currentUser from redux state
    const currentUser = useSelector(state => state.session.user)
    const firstLetter = currentUser.username[0].toUpperCase()

    // Grab boards object from redux state
    let boardsObj = useSelector(state => state.boards.savedBoards)
    let boards;

    // Uses boards from current user if there is no state. And if there is a boards state, then load it instead
    if (!boardsObj) {
        boards = currentUser.boards
    } else {
        boards = Object.values(boardsObj)
    }

    // Redirect if not logged in
    if (!currentUser) {
        history.push("/login")
    }

    // Load user state and save current boards to state
    useEffect(() => {
        dispatch(getUserThunk(currentUser.id))
        dispatch(saveBoardsAction(boards))
    // eslint-disable-next-line
    }, [dispatch, currentUser.id])

    if (!boards) return null

    return (
        <div className={styles.outerContainer}>
            {/* Navbar at the top */}
            <NavBar />

            {/* Section below the Nav bar */}
            <div className={styles.centeredContainer}>
                {/* Sidebar on the left  */}
                <div className={styles.workspaceContainer}>
                    <Sidebar boards={boards} />
                </div>

                {/* Main Content to right of Sidebar */}
                <div className={styles.mainContainer}>
                    <div className={styles.centerBody}>
                        {/* Header with first letter of username */}
                        <div className={styles.headerContainer}>
                            <div className={styles.headerInfo}>
                                <div className={styles.firstLetter}>{firstLetter}</div>
                                <div className={styles.headerText}>
                                    <div className={styles.workspaceText}>
                                        Your Workspace
                                    </div>
                                    <div className={styles.privateText}>
                                        <span className="material-symbols-outlined" id={styles.lock}>lock</span>
                                        Private
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr className={styles.hr} />

                        {/* Boards section */}
                        <section>
                            <div className={styles.boardsText}>Boards</div>
                            <div className={styles.boardsContainer}>
                                {/* Create new board section */}
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

                                {/* Display every board from user */}
                                {boards && boards.map((board) => (
                                    <div key={board.id}>
                                        <BoardCard board={board} hasClicked={hasClicked} setHasClicked={setHasClicked} currentUserId={currentUser.id} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Dashboard
