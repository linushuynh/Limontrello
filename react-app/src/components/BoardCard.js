import React from "react"
import styles from "./cssModules/BoardCard.module.css"
import { deleteBoardThunk, selectBoardAction } from "../store/board"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
// import { SubmittedContext } from "./context/SubmittedContext"

const BoardCard = ({ board, hasClicked, setHasClicked, currentUserId }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    if (!board) return null

    const redirectClick = async () => {
        await dispatch(selectBoardAction(board))
        // console.log("redirecting")
        history.push(`/b/${board.id}`)
    }

    const clickDelete = () => {
        dispatch(deleteBoardThunk(board.id))
        .then(() => setHasClicked(prevValue => !prevValue))
    }


    return (
        <div className={styles.container} >
            <div className={styles.boardCard} onClick={redirectClick}>
                <span className={styles.nameText}>{board.name}</span>
            </div>
            {/* <div className={board.background === "default" ? styles.defaultBackground : styles.variableBackground}></div> */}
            {/* <div className={styles.opacityLayer}></div> */}
            <span onClick={clickDelete} className={`material-symbols-outlined ${styles.trashIcon}`}>delete</span>
        </div>
    )
}

export default BoardCard
