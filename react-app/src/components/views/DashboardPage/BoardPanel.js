import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"

// Utils
import displayBackground from "../../../utils/displayBackgrounds/boardpanelBackground"

// CSS import
import styles from "./BoardPanel.module.css"

// Thunks and Actions
import { deleteBoardThunk, selectBoardAction } from "../../../store/board"
import { DeleteBoardModal } from "../../context/DeleteBoardModal"

// Other Components
import DeleteBoardForm from "../../forms/DeleteBoardForm"


const BoardPanel = ({ board, hasClicked, setHasClicked }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    // Sends user to new board url using the id of the board panel clicked
    const redirectClick = async () => {
        await dispatch(selectBoardAction(board))
        history.push(`/b/${board.id}`)
    }

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
            <div className={styles.boardCard} onClick={redirectClick}>
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
