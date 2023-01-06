import React from "react";
import styles from "../cssModules/DeleteBoardForm.module.css"

const DeleteBoardForm = ({ clickDelete, closeModal }) => {
    return (
        <div className={styles.outerContainer}>
            <div className={styles.XbuttonContainer} >
                <span className="material-symbols-outlined" onClick={closeModal} id={styles.Xbutton}>close</span>
            </div>
            <div>Delete this board?</div>
            <div className={styles.confirmContainer}>
                <div className={styles.cancelButton} onClick={closeModal}>Cancel</div>
                <div onClick={clickDelete} className={styles.deleteButton}>Confirm</div>
            </div>
        </div>
    )
}

export default DeleteBoardForm;
