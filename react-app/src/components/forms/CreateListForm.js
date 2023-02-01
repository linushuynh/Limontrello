import { useContext, useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { createListThunk } from "../../store/list"
import { SubmittedContext } from "../context/SubmittedContext"
import styles from "../cssModules/CreateListForm.module.css"


const CreateListForm = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [name, setName] = useState("")
    const dispatch = useDispatch()
    const inputRef = useRef(null)
    const { boardId } = useParams()
    const { setHasSubmitted } = useContext(SubmittedContext)

    const flipOpenState = (e) => {
        e.preventDefault()
        setName("")
        setIsOpen(!isOpen)
    }

    const submitList = async (e) => {
        e.preventDefault()
        const input = {
            name,
            boardId: +boardId
        }
        setIsOpen(!isOpen)
        await dispatch(createListThunk(input))
        setHasSubmitted(prev => !prev)
    }

    // When menu is opened, automatically select the input bar for the user
    useEffect(() => {
        inputRef.current?.focus()
    }, [isOpen, inputRef])

    return (
        <div className={styles.addListContainer} >
            {isOpen ? (
                <form className={styles.openStyle}>
                    <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className={styles.inputBar}
                    placeholder="Enter list title..."
                    ref={inputRef}
                    required
                    maxLength={20}
                    />
                    <div className={styles.buttonContainer}>
                        <button type="submit" className={styles.addListButton} onClick={submitList}>
                            Add list
                        </button>
                        <button onClick={e => flipOpenState(e)} className={styles.Xbutton}>
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                </form>
            ) : (
                <div className={styles.closedStyle} onClick={(e) => flipOpenState(e)}>
                    <span className="material-symbols-outlined" id={styles.plusSign}>add</span>
                    <span>Add another list</span>
                </div>
            )}
        </div>
    )
}

export default CreateListForm;
