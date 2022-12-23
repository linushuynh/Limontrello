import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { saveBoardsAction, selectBoardAction } from "../../store/board";
import { getUserThunk } from "../../store/session";
import styles from "../cssModules/BoardView.module.css"
import ListColumn from "../ListColumn";
import NavBar from "../NavBar";

const BoardView = () => {
    const selectedBoard = useSelector(state => state.boards.selectedBoard)
    const currentUser = useSelector(state => state.session.user)
    const { boardId } = useParams()
    const dispatch = useDispatch()
    let board;
    let usersBoards = currentUser.boards

    useEffect(() => {
        dispatch(saveBoardsAction(usersBoards))
        dispatch(selectBoardAction(board))
    }, [dispatch])

    if (!selectedBoard) {
        board = currentUser.boards.find(bored => +bored.id === +boardId)
    } else {
        board = selectedBoard
    }

    // If board does not exist for this user, Maybe redirect to 404 page later on
    if (!board) return "The board was not found or not yours"
    let lists = board.lists

    return (
        <div className={styles.outerContainer}>
            <div className={styles.headerContainer}>
                <NavBar />
            </div>
            <div className={styles.bodyContainer}>
                <div className={styles.boardListContainer}>
                    <div>
                        My Boards
                    {usersBoards.map((userBoard) =>(
                        <div key={userBoard.id}>{userBoard.name}</div>
                    ))}
                    </div>
                </div>
                <div className={styles.mainContainer}>
                    <div className={styles.boardHeader}>Board header</div>
                    <div className={styles.listsContainer}>
                        {lists.map((list) => (
                            <div key={list.id}>
                                <ListColumn list={list} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BoardView
