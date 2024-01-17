import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Context and thunks
import { SubmittedContext } from "../../../../context/SubmittedContext";
import { deleteCardThunk, editCardThunk } from "../../../../../store/cards";

// CSS import
import styles from "./SingleCardDetails.module.css"

// Other components
import CommentForm from "../../../../forms/CommentForm";

const SingleCardDetails = ({ card, setShowCardDetailsModal}) => {
    const dispatch = useDispatch()
    const descriptionRef = useRef(null)

    // Setup for toggle-able context and states for re-renders
    const { setHasSubmitted } = useContext(SubmittedContext)
    const [showEditCard, setShowEditCard] = useState(false)

    // Backtracking into store to find the list the card belongs in for display
    const lists = useSelector(state => state.boards.selectedBoard.lists)
    const selectedList = lists.find(list => list.id = card.list_id)

    // Setting default state for controlled inputs using card props
    const [title, setTitle] = useState(card.title)
    const [description, setDescription] = useState(card.description)

    // Extracting comments from card for display
    const comments = card?.comments

    // When edit mode is turned on, the re-render will auto-select the text box for user
    useEffect(() => {
        if (showEditCard) {
            descriptionRef.current.focus()
            descriptionRef.current.setSelectionRange(description.length, description.length)
        }
    // eslint-disable-next-line
    }, [showEditCard])

    // Function to call thunk to send new edits to database
    const submitEditDescription = (e) => {
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

    // Function to call thunk to delete card from database
    const handleDelete = async () => {
        await dispatch(deleteCardThunk(card.id))
        setShowCardDetailsModal(false)
        setHasSubmitted(prevValue => !prevValue)
    }

    if (!card) return null

    return (
        <div className={styles.outerContainer}>
            {/* Left column with icons */}
            <div className={styles.iconColumn}>
                <div className={styles.titleIconContainer}>
                    <span className={`styles.titleIcon material-symbols-outlined`}>web</span>
                </div>
                <div className={styles.descriptionIconContainer}>
                    <span className={`styles.descriptionIcon material-symbols-outlined`}>notes</span>
                </div>
            </div>
            {/* Middle section with main content */}
            <div className={styles.bigBody}>
                {/* Header with card info and close button */}
                <div className={styles.headerContainer}>
                    <div className={styles.titleXcontainer}>
                    <input
                        id={styles.titleText}
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        onBlur={submitEditDescription}
                        maxLength={50}
                        />
                    <span className="material-symbols-outlined" onClick={() => setShowCardDetailsModal(false)} id={styles.Xbutton}>close</span>
                    </div>
                    <div id={styles.listText} >in list {selectedList.name}</div>
                </div>
                {/* Main content below header */}
                <div className={styles.bodyContainer} >
                    <div className={styles.bodyDetails}>
                        <div className={styles.detailContainer}>
                            <div className={styles.categoryTitle}>
                            <span>Description</span>
                            {!showEditCard && (
                                <div className={styles.editButton} onClick={() => setShowEditCard(true)} >
                                    Edit
                                </div>
                            )}
                            </div>
                            {/* Form to submit any edits on the Description property of the card */}
                            <form onSubmit={submitEditDescription}>
                                <textarea
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    onClick={() => setShowEditCard(true)}
                                    onBlur={submitEditDescription}
                                    ref={descriptionRef}
                                    id={styles.descriptionBox}
                                    maxLength={255}
                                    placeholder={"Give this card a description..."}
                                    />
                                <div className={showEditCard ? styles.editFooter : styles.noShow }>
                                    <button className={styles.saveButton} type='submit'>Save</button>
                                    <div className={styles.charCount}>{description.length}/255 characters</div>
                                </div>
                            </form>
                        </div>
                        {/* Component containing the comments */}
                        <CommentForm comments={comments} cardId={card.id} />
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
