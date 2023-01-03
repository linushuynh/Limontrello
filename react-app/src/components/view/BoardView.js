import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { saveBoardsAction, selectBoardAction } from "../../store/board";
import { getUserThunk } from "../../store/session";
import { EditBoardModal } from "../context/EditBoardModal";
// import { getUserThunk } from "../../store/session";
import styles from "../cssModules/BoardView.module.css"
import EditBoardForm from "../forms/EditBoardForm";
import ListColumn from "../ListColumn";
import NavBar from "../NavBar";

const BoardView = () => {
    const selectedBoard = useSelector(state => state.boards.selectedBoard)
    const savedBoards = useSelector(state => state.boards.savedBoards)
    const currentUser = useSelector(state => state.session.user)
    const [showEditModal, setShowEditModal] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const { boardId } = useParams()
    const dispatch = useDispatch()
    let board;
    let usersBoards;

    useEffect(() => {
        dispatch(getUserThunk(currentUser.id))
        dispatch(saveBoardsAction(usersBoards))
        dispatch(selectBoardAction(board))
    }, [dispatch])

    if (!selectedBoard) {
        board = currentUser.boards.find(bored => +bored.id === +boardId)
    } else {
        board = selectedBoard
    }

    if (!savedBoards) {
        usersBoards = currentUser.boards
    } else {
        usersBoards = Object.values(savedBoards)
    }

    // If board does not exist for this user, Maybe redirect to 404 page later on
    if (!board) return "The board was not found or not yours"
    let lists = board.lists

    return (
        <div className={styles.outerContainer}>
            <div className={styles.headerContainer}>
                <NavBar />
            </div>
            <div className={styles.bodyContainer}>
                <div className={styles.boardListContainer}>
                    <div>
                        My Boards
                    {usersBoards.map((userBoard) =>(
                        <div key={userBoard.id}>{userBoard.name}</div>
                    ))}
                    </div>
                </div>
                <div className={styles.mainContainer}>
                    <div className={styles.boardHeader}>
                        <div className={styles.boardName}>{board.name}</div>
                        <div className={styles.editModal} >
                            <div onClick={() => setShowEditModal(true)}>
                                Edit Board
                            </div>
                            <div>
                                {showEditModal && (<EditBoardModal onClose={() => setShowEditModal(false)}>
                                    <EditBoardForm board={board} setShowEditModal={setShowEditModal} setHasSubmitted={setHasSubmitted} />
                                </EditBoardModal>)}
                            </div>
                        </div>
                    </div>
                    <div className={styles.listsContainer}>
                        {lists.map((list) => (
                            <div key={list.id}>
                                <ListColumn list={list} setHasSubmitted={setHasSubmitted} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BoardView
