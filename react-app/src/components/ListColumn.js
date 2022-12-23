import React from "react";
import styles from "./cssModules/ListColumn.module.css"

const ListColumn = ({ list }) => {
    if (!list) return null

    return (
        <div className={styles.listColumnContainer}>
            {list.name}
        </div>
    )
}

export default ListColumn
