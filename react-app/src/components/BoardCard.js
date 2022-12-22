import React from "react"
import styles from "./cssModules/BoardCard.module.css"
import { addBoardAction } from "../store/board"
import { useDispatch } from "react-redux"

const BoardCard = ({ board }) => {
    const dispatch = useDispatch()

    if (!board) return null

    const onClick = () => {
        // dispatch(addBoardAction(board))
        return console.log("THIS IS CLICKED BOARD", board)
    }

    return (
        <div className={styles.container} onClick={onClick}>
            <div className={styles.nameText}>{board.name}</div>
            <div className={board.background === "default" ? styles.defaultBackground : styles.variableBackground}></div>
            {/* <div className={styles.opacityLayer}></div> */}
        </div>
    )
}

export default BoardCard
