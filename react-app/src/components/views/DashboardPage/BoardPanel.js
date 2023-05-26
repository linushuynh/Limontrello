import React, { useState } from "react"
import useDeleteBoard from "./utils/useDeleteBoard.js"

// Utils
import displayBackground from "./utils/boardpanelBackground.js"
import useRedirectToBoard from "./utils/useRedirectToBoard.js"

// CSS import
import styles from "./BoardPanel.module.css"

// Thunks and Actions
import { DeleteBoardModal } from "../../context/DeleteBoardModal"

// Other Components
import DeleteBoardForm from "./forms/DeleteBoardForm.js"


const BoardPanel = ({ board, setHasClicked }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    // Custom hooks to redirect to boards and confirm delete boards
    const redirectBoard = useRedirectToBoard(board)
    const deleteBoard = useDeleteBoard(board.id, setHasClicked)

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
                <DeleteBoardForm deleteBoard={deleteBoard} closeModal={flipModal} />
            </DeleteBoardModal>
            )}
        </div>
    )
}

export default BoardPanel;
