import React, { useState } from "react"
import styles from "./cssModules/BoardCard.module.css"
import { deleteBoardThunk, selectBoardAction } from "../store/board"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { DeleteBoardModal } from "./context/DeleteBoardModal"
import DeleteBoardForm from "./forms/DeleteBoardForm"
// import { SubmittedContext } from "./context/SubmittedContext"

const BoardCard = ({ board, hasClicked, setHasClicked, currentUserId }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    if (!board) return null

    const redirectClick = async () => {
        await dispatch(selectBoardAction(board))
        history.push(`/b/${board.id}`)
    }

    const clickDelete = () => {
        dispatch(deleteBoardThunk(board.id))
        .then(() => setHasClicked(prevValue => !prevValue))
    }

    const openModal = () => {
        setShowDeleteModal(true)
    }

    const closeModal = () => {
        setShowDeleteModal(false)
    }

    return (
        <div className={styles.container} >
            <div className={styles.boardCard} onClick={redirectClick}>
                <span className={styles.nameText}>{board.name}</span>
            </div>
            <span onClick={openModal} className={`material-symbols-outlined ${styles.trashIcon}`}>delete</span>
            {showDeleteModal && (<DeleteBoardModal onClose={closeModal}>
                <DeleteBoardForm clickDelete={clickDelete} closeModal={closeModal} />
            </DeleteBoardModal>
            )}
        </div>
    )
}

export default BoardCard
