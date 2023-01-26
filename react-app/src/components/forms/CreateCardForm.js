import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCardThunk } from "../../store/cards";
import styles from "../cssModules/CreateCardForm.module.css"
import { SubmittedContext } from "../context/SubmittedContext";

const CreateCardForm = ({ listId, setShowAddCardModal, displayAddButtons, setDisplayAddButtons }) => {
    const [title, setTitle] = useState("")
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.session.user)
    const board = useSelector(state => state.boards.selectedBoard)
    const lists = board?.lists.find(list => list.id === listId)
    const textRef = useRef(null)
    const { setHasSubmitted } = useContext(SubmittedContext)

    // Places text cursor and scrolls into view
    useEffect(() => {
        textRef.current.focus()
        textRef.current.scrollIntoView()
    }, [textRef])

    const closeCardForm = (e) => {
        e.preventDefault()
        setShowAddCardModal(false)
        setDisplayAddButtons()
    }

    const submitNewCard = async (e) => {
        e.preventDefault()
            let input = {
                title,
                description: "",
                position: lists.cards.length,
                listId
            }
            setShowAddCardModal(false)
            await dispatch(createCardThunk(input, currentUser.id))
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
                    maxLength={100}
                    type="text"
                    />
                </div>
                <div className={styles.titleCount}>
                    {title.length}/100 characters
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
