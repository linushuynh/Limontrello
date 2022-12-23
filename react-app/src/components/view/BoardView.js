import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "../cssModules/BoardView.module.css"
import ListColumn from "../ListColumn";
import NavBar from "../NavBar";

const BoardView = () => {
    const currentUser = useSelector(state => state.session.user)
    const { boardId } = useParams()
    let usersBoards = currentUser.boards
    console.log("usersBoards",usersBoards)
    let board = currentUser.boards.find(bored => +bored.id === +boardId)
    console.log(board)
    let lists = board.lists

    // If board does not exist for this user, Maybe redirect to 404 page later on
    if (!board) return "The board was not found or not yours"

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
