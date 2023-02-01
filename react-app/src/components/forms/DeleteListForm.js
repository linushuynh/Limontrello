import React from "react";
import styles from "../cssModules/DeleteListForm.module.css"

const DeleteListForm = ({ listName, submitDelete, flipDeleteModal }) => {
    return (
        <div className={styles.outerContainer}>
            <div className={styles.XbuttonContainer} >
                <span className="material-symbols-outlined" onClick={flipDeleteModal} id={styles.Xbutton}>close</span>
            </div>
            <div style={{ textAlign: 'center', marginTop: '0.5rem', textOverflow: 'clip' }} >
                Delete list named {listName}?
            </div>
            <div className={styles.confirmContainer}>
                <div className={styles.cancelButton} onClick={flipDeleteModal}>Cancel</div>
                <div onClick={submitDelete} className={styles.deleteButton}>Confirm</div>
            </div>
        </div>
    )
}

export default DeleteListForm;
