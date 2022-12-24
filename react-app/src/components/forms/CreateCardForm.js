import React, { useState } from "react";
import styles from "../cssModules/CreateCardForm.module.css"

const CreateCardForm = ({ listId, setShowAddCardModal }) => {
    const [title, setTitle] = useState("")

    const closeCardForm = (e) => {
        e.preventDefault()
        setShowAddCardModal(false)
    }

    return (
        <div className={styles.formContainer}>
            <form className={styles.form}>
                <div className={styles.inputContainer}>
                    <textarea
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a title for this card..."
                    className={styles.inputArea}
                    />
                </div>
                <div className={styles.buttonsContainer}>
                    <button type="submit" className={styles.addCardButton}>Add card</button>
                    <button onClick={closeCardForm} className={styles.Xbutton}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateCardForm
