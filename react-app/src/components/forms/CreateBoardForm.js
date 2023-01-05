import React, { useEffect, useRef, useState } from "react";
import styles from "../cssModules/CreateBoardForm.module.css"
import boardPreview from "../../assets/board-preview.svg"
import { useDispatch, useSelector } from "react-redux";
import { addBoardAction, createBoardThunk, selectBoardAction } from "../../store/board";
import { useHistory } from "react-router-dom";
import { getUserThunk } from "../../store/session";

const CreateBoardForm = ({ setShowModal }) => {
    const currentUser = useSelector(state => state.session.user)
    const [name, setName] = useState("")
    const dispatch = useDispatch()
    const history = useHistory()
    const boardRef = useRef(null)

    useEffect(() => {
        boardRef.current.focus()
    }, [boardRef])

    const onSubmit = async (e) => {
        e.preventDefault();
        let input = {
            name: name,
            background: "default",
            private: false
        }
        let response = await dispatch(createBoardThunk(input))
        await dispatch(getUserThunk(currentUser.id))
        await dispatch(selectBoardAction(response))
        await dispatch(addBoardAction(response))
        history.push(`/b/${response.id}`)
    }

    return (
        <div className={styles.outerContainer}>
            <div className={styles.createBoardText}>Create Board</div>
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
                        ref={boardRef}
                        maxLength={20}
                        />
                    </div>
                    <div className={styles.nameCount}>
                        {name.length}/20 characters
                    </div>
                    <div className={styles.submitContainer}>
                        <button type="submit" className={styles.submitButton} disabled={!name}>
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateBoardForm
