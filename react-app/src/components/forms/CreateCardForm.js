import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCardThunk } from "../../store/cards";
import { getUserThunk } from "../../store/session";
import { loadBoardsThunk, saveBoardsAction } from "../../store/board";
import { selectBoardAction } from "../../store/board";
import styles from "../cssModules/CreateCardForm.module.css"
import { useParams } from "react-router-dom";

const CreateCardForm = ({ listId, setShowAddCardModal, setHasSubmitted }) => {
    const [title, setTitle] = useState("")
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.session.user)
    // let board = useSelector(state => state.boards.selectedBoard)
    let { boardId } = useParams()

    const closeCardForm = (e) => {
        e.preventDefault()
        setShowAddCardModal(false)
    }

    const submitNewCard = async (e) => {
        e.preventDefault()
        let input = {
            title,
            description: "placeholder",
            listId
        }

        await dispatch(createCardThunk(input, currentUser.id))
        // let response = await dispatch(getUserThunk(currentUser.id))
        // await dispatch(saveBoardsAction(response.boards))
        setShowAddCardModal(false)
        let loadedBoards = await dispatch(loadBoardsThunk())
        let selectBoard = loadedBoards.boards.find(board => +board.id === +boardId)
        await dispatch(selectBoardAction(selectBoard))
        // setHasSubmitted(prevValue => !prevValue)
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
