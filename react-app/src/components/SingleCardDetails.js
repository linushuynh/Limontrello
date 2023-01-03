import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCardThunk } from "../store/cards";
// import { getUserThunk } from "../store/session";
import { loadBoardsThunk, saveBoardsAction, selectBoardAction } from "../store/board";
import styles from "./cssModules/SingleCardDetails.module.css"
import { useParams } from "react-router-dom";

const SingleCardDetails = ({ card, setShowCardDetailsModal }) => {
    const dispatch = useDispatch()
    // const currentUser = useSelector(state => state.session.user)
    const { boardId } = useParams()
    // console.log("clicked card",card)
    const lists = useSelector(state => state.boards.selectedBoard.lists)
    const selectedList = lists.find(list => list.id = card.list_id)
    // const board = useSelector(state => state.boards.selectedBoard)
    const [showEditCard, setShowEditCard] = useState(false)
    const [description, setDescription] = useState(card.description)
    const descriptionRef = useRef(null)

    useEffect(() => {
        if (showEditCard) {
            descriptionRef.current.focus()
            descriptionRef.current.setSelectionRange(description.length, description.length)
        }
    }, [showEditCard])

    const handleDelete = async () => {
        await dispatch(deleteCardThunk(card.id))
        setShowCardDetailsModal(false)
        // let response = await dispatch(getUserThunk(currentUser.id))
        // await dispatch(loadBoardsThunk())
        // await dispatch(selectBoardAction(response.boards[board.id]))
        let loadedBoards = await dispatch(loadBoardsThunk())
        let selectBoard = loadedBoards.boards.find(board => +board.id === +boardId)
        await dispatch(selectBoardAction(selectBoard))
    }

    if (!card) return null

    return (
        <div className={styles.outerContainer}>
            <div className={styles.iconColumn}>icons</div>
            <div className={styles.bigBody}>
                <div className={styles.headerContainer}>
                    <div id={styles.titleText} >{card.title}</div>
                    <div id={styles.listText} >in list {selectedList.name}</div>
                </div>
                <div className={styles.bodyContainer} >
                    <div className={styles.bodyDetails}>
                        <div className={styles.detailContainer}>
                            <div className={styles.categoryTitle}>
                            Description (255 characters)
                            {!showEditCard && (
                                <div className={styles.editButton} onClick={() => setShowEditCard(true)} >
                                    Edit
                                </div>
                            )}
                            </div>
                            {showEditCard ? (<>
                                <textarea
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    onBlur={() => setShowEditCard(false)}
                                    ref={descriptionRef}
                                    id={styles.editDescriptionBox}
                                    maxLength={255}
                                    />
                                <div className={styles.editFooter}>
                                    <div className={styles.saveButton}>Save</div>
                                    <div className={styles.charCount}>{description.length}/255 characters</div>
                                </div>
                                </>
                                ) : (
                                <div id={styles.descriptionBox} onClick={() => setShowEditCard(true)}>
                                    {description}
                                </div>
                            )}

                        </div>
                    </div>
                    <div className={styles.moreOptions}>
                        More button options
                        <div className={styles.deleteButton} onClick={handleDelete} >
                            <span className="material-symbols-outlined">remove</span>
                            <span>Delete</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SingleCardDetails;
