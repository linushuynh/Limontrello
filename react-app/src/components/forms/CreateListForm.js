import { useState } from "react"
import styles from "../cssModules/CreateListForm.module.css"

const CreateListForm = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [name, setName] = useState()

    const flipOpenState = (e) => {
        e.preventDefault()
        setIsOpen(!isOpen)
    }

    return (
        <>
            <div className={styles.addListContainer}>
                {isOpen ? (
                    <form className={styles.openStyle}>
                        <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className={styles.inputBar}
                        />
                        <div className={styles.buttonContainer}>
                            <button className={styles.addListButton}>
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
        </>
    )
}

export default CreateListForm;
