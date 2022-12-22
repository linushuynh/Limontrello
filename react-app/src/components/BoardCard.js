import React from "react"
import styles from "./cssModules/BoardCard.module.css"

const BoardCard = ({ board }) => {
    if (!board) return null

    return (
        <div className={styles.container}>
            <div className={styles.nameText}>{board.name}</div>
            {/* <div className={board.background === "default" ? styles.defaultBackground : styles.variableBackground}></div> */}
        </div>
    )
}

export default BoardCard
