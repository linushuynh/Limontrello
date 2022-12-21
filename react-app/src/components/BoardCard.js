import React from "react"
import styles from "./cssModules/BoardCard.module.css"

const BoardCard = ({ board }) => {
    return (
        <div className={styles.container}>
            <div className={styles.nameText}>{board.name}</div>
            <div className={styles.background}></div>
        </div>
    )
}

export default BoardCard
