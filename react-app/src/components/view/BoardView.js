import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadBoardsThunk, selectBoardAction, updateBoardThunk } from "../../store/board";
import { getUserThunk } from "../../store/session";
import styles from "../cssModules/BoardView.module.css"
import ListColumn from "../ListColumn";
import NavBar from "../NavBar";
import { SubmittedContext } from "../context/SubmittedContext";
import Sidebar from "../Sidebar";
import { DragDropContext, Droppable } from "react-beautiful-dnd"

const BoardView = () => {
    // const selectedBoard = useSelector(state => state.boards.selectedBoard)
    // const savedBoards = useSelector(state => state.boards.savedBoards)
    const currentUser = useSelector(state => state.session.user)
    const [selectEdit, setSelectEdit] = useState(false)
    const { hasSubmitted, setHasSubmitted } = useContext(SubmittedContext)
    const { boardId } = useParams()
    const dispatch = useDispatch()
    let board = currentUser.boards.find(bored => +bored.id === +boardId)
    let usersBoards = currentUser.boards
    const [name, setName] = useState(board.name)
    // const [showEditBar, setShowEditBar] = useState(false)

    // Called when the board title input is deselected
    const submitEdit = async () => {
        if (name === "") {
            setName(board.name)
        }
        let input = {
            name: name,
            background: "default",
            private: false,
            boardId: board.id
        }
        setHasSubmitted(prevValue => !prevValue)
        await dispatch(updateBoardThunk(input))
        setSelectEdit(false)
    }

    // Same function as above but separate to prevent blur on blur loop
    const submitForm = async (e) => {
        e.preventDefault();
        if (name === "") {
            setName(board.name)
        }
        let input = {
            name: name,
            background: "default",
            private: false,
            boardId: board.id
        }
        await dispatch(updateBoardThunk(input))
        setHasSubmitted(prevValue => !prevValue)
        setSelectEdit(false)
        document.activeElement.blur();
    }

    // const flipEditBar = () => {
    //     setShowEditBar(prevValue => !prevValue)
    // }

    const onDragEnd = result => {
        // for later
    }

    useEffect(() => {
        dispatch(getUserThunk(currentUser.id))
        dispatch(loadBoardsThunk())
        dispatch(selectBoardAction(board))
    }, [dispatch, hasSubmitted, currentUser.id])


    // If board does not exist for this user, Maybe redirect to 404 page later on
    if (!board) return "The board was not found or not yours"
    let lists = board.lists

    return (
    <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.backgroundImg}>
            <div className={styles.outerContainer}>
                <NavBar />
                <div className={styles.bodyContainer}>
                    <div className={styles.boardListContainer}>
                        <Sidebar boards={usersBoards} name={name} setName={setName} />
                    </div>
                    <div className={styles.backgroundOpacity}>
                    <div className={styles.mainContainer}>
                        <form onSubmit={submitForm} className={styles.boardHeader}>
                            <div className={styles.nameNcharCount}>
                                <input
                                    className={styles.boardName}
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    maxLength={20}
                                    onBlur={submitEdit}
                                    onClick={() => setSelectEdit(true)}
                                    />
                                {selectEdit && <div className={styles.editCharCount}>
                                    {name.length}/20 characters
                                </div>}
                            </div>
                            {/* <div className={styles.ellipses} onClick={flipEditBar}>
                            •••
                            </div> */}
                        </form>
                        <div className={styles.listsContainer}>
                            {lists.map((list) => (
                                <Droppable droppableId={list.name} key={list.id}>
                                    {(provided, snapshot) => (
                                        <div key={list.id}
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            <ListColumn
                                                list={list}
                                                setHasSubmitted={setHasSubmitted}
                                            >
                                                {provided.placeholder}
                                            </ListColumn>
                                        </div>
                                    )}
                                </Droppable>
                                )
                            )}
                        </div>
                    {/* <div className={showEditBar? styles.editBar : styles.hidden}>
                        Edit Board here
                    </div> */}
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </DragDropContext>
    )
}

export default BoardView
