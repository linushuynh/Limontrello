import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCardThunk } from "../store/cards";
import { getUserThunk } from "../store/session";
import { saveBoardsAction, selectBoardAction } from "../store/board";
import styles from "./cssModules/SingleCardDetails.module.css"

const SingleCardDetails = ({ card, setShowCardDetailsModal }) => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.session.user)
    console.log("clicked card",card)
    const lists = useSelector(state => state.boards.selectedBoard.lists)
    const selectedList = lists.find(list => list.id = card.list_id)
    const board = useSelector(state => state.boards.selectedBoard)

    const handleDelete = async () => {
        await dispatch(deleteCardThunk(card.id))
        setShowCardDetailsModal(false)
        let response = await dispatch(getUserThunk(currentUser.id))
        await dispatch(saveBoardsAction(response.boards))
        await dispatch(selectBoardAction(response.boards[board.id]))
    }


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
                            Description
                            </div>
                            <div id={styles.descriptionBox}>
                                {card.description}
                            </div>
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
