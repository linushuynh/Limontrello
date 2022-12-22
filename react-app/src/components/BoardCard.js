import React, { useContext, useEffect } from "react"
import styles from "./cssModules/BoardCard.module.css"
import { deleteBoardThunk } from "../store/board"
import { useDispatch } from "react-redux"
import { getUserThunk } from "../store/session"
// import { SubmittedContext } from "./context/SubmittedContext"

const BoardCard = ({ board, hasClicked, setHasClicked, currentUserId }) => {
    const dispatch = useDispatch()

    if (!board) return null

    // const onClick = () => {
    //     return console.log("THIS IS CLICKED BOARD", board)
    // }

    const clickDelete = () => {
        dispatch(deleteBoardThunk(board.id))
        .then(() => setHasClicked(prevValue => !prevValue))
    }


    return (
        <div className={styles.container} >
            <div className={styles.nameText}>
                <span>{board.name}</span>
                <span onClick={clickDelete} className={`material-symbols-outlined ${styles.trashIcon}`}>delete</span>
            </div>
            {/* <div className={board.background === "default" ? styles.defaultBackground : styles.variableBackground}></div> */}
            {/* <div className={styles.opacityLayer}></div> */}
            {/* <div className={styles.trashContainer}>

            </div> */}
        </div>
    )
}

export default BoardCard
