import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCardThunk } from "../../store/cards";
import styles from "../cssModules/CreateCardForm.module.css"
import { SubmittedContext } from "../context/SubmittedContext";

const CreateCardForm = ({ listId, setShowAddCardModal }) => {
    const [title, setTitle] = useState("")
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.session.user)
    // let board = useSelector(state => state.boards.selectedBoard)
    let textRef = useRef(null)
    const { setHasSubmitted } = useContext(SubmittedContext)

    useEffect(() => {
        textRef.current.focus()
    }, [ textRef ])

    const closeCardForm = (e) => {
        e.preventDefault()
        setShowAddCardModal(false)
    }

    const submitNewCard = async (e) => {
        e.preventDefault()
        let input = {
            title,
            description: "",
            listId
        }

        await dispatch(createCardThunk(input, currentUser.id))
        setShowAddCardModal(false)
        setHasSubmitted(prev => !prev)
    }

    return (
        <div className={styles.formContainer}>
            <form className={styles.form}>
                <div className={styles.inputContainer}>
                    <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a title for this card..."
                    className={styles.inputArea}
                    ref={textRef}
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
