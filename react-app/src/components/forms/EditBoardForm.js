import React, { useState } from "react";
import styles from "../cssModules/EditBoardForm.module.css"
import boardPreview from "../../assets/board-preview.svg"
import { useDispatch, useSelector } from "react-redux";
import { saveBoardsAction, selectBoardAction, updateBoardThunk } from "../../store/board";
import { getUserThunk } from "../../store/session";

const EditBoardForm = ({ board, setShowEditModal, setHasSubmitted }) => {
    const currentUser = useSelector(state => state.session.user)
    let loadedName = board.name
    const [name, setName] = useState(loadedName)
    const dispatch = useDispatch()

    const onSubmit = async (e) => {
        e.preventDefault();
        let input = {
            name: name,
            background: "default",
            private: false,
            boardId: board.id
        }
        await dispatch(updateBoardThunk(input))
        let response = await dispatch(getUserThunk(currentUser.id))
        await dispatch(saveBoardsAction(response.boards))
        await dispatch(selectBoardAction(response.boards[board.id]))
        setShowEditModal(prevValue => !prevValue)
        setHasSubmitted(prevValue => !prevValue)
    }

    return (
        <div className={styles.outerContainer}>
            <div className={styles.createBoardText}>Edit Board</div>
            <div className={styles.hrBarContainer}><hr id={styles.hrBar}/></div>
            <div>
                <img src={boardPreview} alt="boardPreview" />
            </div>
            <div className={styles.formContainer}>
                <form className={styles.form} onSubmit={onSubmit}>
                    <div className={styles.boardTitleContainer}>
                        <div className={styles.boardTitleText}>Board title <span className={styles.asterisk}>*</span></div>
                        <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className={styles.inputBar}
                        />
                    </div>
                    <div className={styles.submitContainer}>
                        <button type="submit" className={styles.submitButton}>
                            Confirm changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditBoardForm
