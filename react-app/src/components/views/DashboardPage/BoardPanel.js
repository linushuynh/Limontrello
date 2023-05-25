import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"

// Utils
import displayBackground from "./utils/boardpanelBackground.js"
import useRedirectToBoard from "./utils/useRedirectToBoard.js"

// CSS import
import styles from "./BoardPanel.module.css"

// Thunks and Actions
import { deleteBoardThunk } from "../../../store/board"
import { DeleteBoardModal } from "../../context/DeleteBoardModal"

// Other Components
import DeleteBoardForm from "../../forms/DeleteBoardForm"



const BoardPanel = ({ board, hasClicked, setHasClicked }) => {
    const dispatch = useDispatch()
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const redirectBoard = useRedirectToBoard(board)

    // This will send the thunk to delete board from database
    const clickDelete = () => {
        dispatch(deleteBoardThunk(board.id))
        .then(() => setHasClicked(prevValue => !prevValue))
    }

    // Flips the state to open/close the modal that confirms delete
    const flipModal = () => setShowDeleteModal(!showDeleteModal)

    if (!board) return null

    return (
        <div className={displayBackground(board?.background)} >
            {/* Display name of board panel */}
            <div className={styles.boardCard} onClick={() => redirectBoard()}>
                <span className={styles.nameText}>{board.name}</span>
            </div>

            {/* Trash Can Icon */}
            <span onClick={flipModal} className={`material-symbols-outlined ${styles.trashIcon}`}>delete</span>

            {/* Confirm delete modal */}
            {showDeleteModal && (<DeleteBoardModal onClose={flipModal}>
                <DeleteBoardForm clickDelete={clickDelete} closeModal={flipModal} />
            </DeleteBoardModal>
            )}
        </div>
    )
}

export default BoardPanel;
