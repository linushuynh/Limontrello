import React, { useState } from "react";
import styles from "../cssModules/CreateBoardForm.module.css"
import boardPreview from "../../assets/board-preview.svg"
import { useDispatch } from "react-redux";
import { createBoardThunk } from "../../store/board";
// import { useHistory } from "react-router-dom";

const CreateBoardForm = ({ setShowModal }) => {
    const [name, setName] = useState("")
    const dispatch = useDispatch()
    // const history = useHistory()

    const onSubmit = async (e) => {
        e.preventDefault();
        let input = {
            name: name,
            background: "default",
            private: false
        }
        let response = await dispatch(createBoardThunk(input))
        .then(() => setShowModal(false))
        // .then((response) => history.push('/dashboard'))
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
                        />
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
