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
import { editCardThunk } from "../../store/cards";
import NotFound from "./404";

const BoardView = () => {
    const currentUser = useSelector(state => state.session.user)
    const [selectEdit, setSelectEdit] = useState(false)
    const { hasSubmitted, setHasSubmitted } = useContext(SubmittedContext)
    const { boardId } = useParams()
    const dispatch = useDispatch()
    let board = currentUser.boards.find(bored => +bored.id === +boardId)
    let usersBoards = currentUser.boards
    const [name, setName] = useState(board?.name)
    const [loaded, setLoaded] = useState(false)
    let lists = board?.lists

    // Called when the board title input is deselected
    const submitEdit = async () => {
        if (name === "") {
            setName(board.name)
        }
        let input = {
            name: name,
            background: board.background,
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
            background: board.background,
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
        const { destination, source, draggableId } = result
        // Return if card is dropped outside of droppable
        if (!destination) {
            return
        }

        // If card is dropped in different list column, send thunk to move it
        if (destination.droppableId !== source.droppableId) {
            // UPDATE AND MATCH THE DROPPABLE ID FORMAT AND DRAGGABLE ID FORMAT
            let sourceList = lists.find(list => list.name === source.droppableId)
            let destinationList = lists.find(list => list.name === destination.droppableId)
            let grabbedCard = sourceList?.cards.find(card => card.id.toString() === draggableId.toString())
            let input = {
                title: grabbedCard.title,
                description: grabbedCard.description,
                listId: destinationList.id
            }
            setLoaded(false)
            dispatch(editCardThunk(input, grabbedCard.id))
            .then(() => setHasSubmitted(prevValue => !prevValue))
        }
    }

    useEffect(() => {
        dispatch(getUserThunk(currentUser.id))
        dispatch(loadBoardsThunk())
        dispatch(selectBoardAction(board))
        setLoaded(true)
    }, [dispatch, hasSubmitted])


    const displayBackground = (background) => {
        if (background === "snowmountain") {
            return styles.snowmountainContainer
        } else if (background === "forest") {
            return styles.forestContainer
        } else if (background === "beach") {
            return styles.beachContainer
        }
        return styles.container
    }

    // If board does not exist for this user, Maybe redirect to 404 page later on
    if (!board) {
        return (
            <NotFound />
        )
    }


    return (
    <DragDropContext onDragEnd={onDragEnd}>
        <div className={displayBackground(board?.background)}>
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
                                <Droppable droppableId={list.name} key={`${list.id}${list.name}`}>
                                    {(provided, snapshot) => (
                                        <div key={list.id} >
                                            <ListColumn
                                                list={list}
                                                setHasSubmitted={setHasSubmitted}
                                                placeholder={provided.placeholder}
                                                provided={provided}
                                                isDraggingOver={snapshot.isDraggingOver}
                                                loaded={loaded}
                                            >
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
