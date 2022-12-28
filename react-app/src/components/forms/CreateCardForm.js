import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCardThunk } from "../../store/cards";
import styles from "../cssModules/CreateCardForm.module.css"

const CreateCardForm = ({ listId, setShowAddCardModal }) => {
    const [title, setTitle] = useState("")
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.session.user)

    const closeCardForm = (e) => {
        e.preventDefault()
        setShowAddCardModal(false)
    }

    const submitNewCard = (e) => {
        e.preventDefault()
        let input = {
            title,
            description: "placeholder",
            listId
        }

        dispatch(createCardThunk(input, currentUser.id))
        .then(() => setShowAddCardModal(false))
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
                    <button type="submit" className={styles.addCardButton} onClick={submitNewCard}>Add card</button>
                    <button onClick={closeCardForm} className={styles.Xbutton}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateCardForm
