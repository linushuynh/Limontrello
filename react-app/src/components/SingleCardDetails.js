import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCardThunk, editCardThunk } from "../store/cards";
// import { getUserThunk } from "../store/session";
// import { loadBoardsThunk, saveBoardsAction, selectBoardAction } from "../store/board";
import styles from "./cssModules/SingleCardDetails.module.css"
import { SubmittedContext } from "./context/SubmittedContext";

const SingleCardDetails = ({ card, setShowCardDetailsModal}) => {
    const dispatch = useDispatch()
    const lists = useSelector(state => state.boards.selectedBoard.lists)
    const selectedList = lists.find(list => list.id = card.list_id)
    const [showEditCard, setShowEditCard] = useState(false)
    const [title, setTitle] = useState(card.title)
    const [description, setDescription] = useState(card.description)
    const descriptionRef = useRef(null)
    const { setHasSubmitted } = useContext(SubmittedContext)

    useEffect(() => {
        if (showEditCard) {
            descriptionRef.current.focus()
            descriptionRef.current.setSelectionRange(description.length, description.length)
        }

    }, [showEditCard])

    const submitEdit = (e) => {
        e.preventDefault()
        let input = {
            title,
            description,
            listId: selectedList.id
        }
        dispatch(editCardThunk(input, card.id))
        .then(() => setHasSubmitted(prev => !prev))
        .then(() => setShowEditCard(false))
    }

    const handleDelete = async () => {
        await dispatch(deleteCardThunk(card.id))
        setShowCardDetailsModal(false)
        setHasSubmitted(prevValue => !prevValue)
    }

    if (!card) return null

    return (
        <div className={styles.outerContainer}>
            <div className={styles.iconColumn}>
                <div className={styles.titleIconContainer}>
                    <span className={`styles.titleIcon material-symbols-outlined`}>web</span>
                </div>
                <div className={styles.descriptionIconContainer}>
                    <span className={`styles.descriptionIcon material-symbols-outlined`}>notes</span>
                </div>
            </div>
            <div className={styles.bigBody}>
                <div className={styles.headerContainer}>
                    <div className={styles.titleXcontainer}>
                    <input
                        id={styles.titleText}
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        onBlur={submitEdit}
                        maxLength={50}
                        />
                    <span className="material-symbols-outlined" onClick={() => setShowCardDetailsModal(false)} id={styles.Xbutton}>close</span>
                    </div>
                    <div id={styles.listText} >in list {selectedList.name}</div>
                </div>
                <div className={styles.bodyContainer} >
                    <div className={styles.bodyDetails}>
                        <div className={styles.detailContainer}>
                            <div className={styles.categoryTitle}>
                            Description
                            {!showEditCard && (
                                <div className={styles.editButton} onClick={() => setShowEditCard(true)} >
                                    Edit
                                </div>
                            )}
                            </div>
                            <form onSubmit={submitEdit}>
                                <textarea
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    onClick={() => setShowEditCard(true)}
                                    onBlur={submitEdit}
                                    ref={descriptionRef}
                                    id={styles.descriptionBox}
                                    maxLength={255}
                                    placeholder={"Give this card a description..."}
                                    />
                                <div className={showEditCard ? styles.editFooter : styles.noShow }>
                                    <div>(Click off the box to save)</div>
                                    {/* <button className={styles.saveButton} type='submit'>Save</button> */}
                                    <div className={styles.charCount}>{description.length}/255 characters</div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className={styles.moreOptions}>
                        <div className={styles.deleteButton} onClick={handleDelete} >
                            <span className="material-symbols-outlined">remove</span>
                            <span>Delete Card</span>
                        </div>
                        <span>More button options soon!</span>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SingleCardDetails;
