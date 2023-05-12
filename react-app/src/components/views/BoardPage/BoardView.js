import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd"

// Utils
import displayBackground from "../../../utils/displayBackgrounds/boardviewBackground";

// Contexts and Thunks
import { SubmittedContext } from "../../context/SubmittedContext";
import { selectBoardAction, updateBoardThunk } from "../../../store/board";
import { getUserThunk } from "../../../store/session";
import { editCardThunk } from "../../../store/cards";
import { loadListsAction } from "../../../store/list";

// CSS import
import styles from "./BoardView.module.css"

// Inner Components
import ListColumn from "./Lists/ListColumn";
import NavBar from "../../NavBar";
import Sidebar from "../../Sidebar";
import CreateListForm from "../../forms/CreateListForm";
import NotFound from "../NotFoundPage/NotFound";


const BoardView = () => {
    const dispatch = useDispatch()
    const { boardId } = useParams()

    // Toggle-able states and contexts for re-renders
    const [selectEdit, setSelectEdit] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const { hasSubmitted, setHasSubmitted } = useContext(SubmittedContext)

    // Grabbing current user and locating board data using url parameter
    const currentUser = useSelector(state => state.session.user)
    let board = currentUser.boards.find(b => +b.id === +boardId)

    // Extracting data from current users's boards
    const [name, setName] = useState(board?.name)
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

    // After drag is let go, this function is run to update the new data
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
                listId: destinationList.id,
            }
            setLoaded(false)
            dispatch(editCardThunk(input, grabbedCard.id))
            .then(() => setHasSubmitted(prevValue => !prevValue))
        }
    }

    // Re-render new data when something is submitted
    useEffect(() => {
        dispatch(getUserThunk(currentUser.id))
        dispatch(selectBoardAction(board))
        dispatch(loadListsAction(lists))
        setLoaded(true)
    // eslint-disable-next-line
    }, [dispatch, hasSubmitted])


    // If board does not exist for this user, Maybe redirect to 404 page later on
    if (!board) {
        return (
            <NotFound />
        )
    }

    return (
    <DragDropContext onDragEnd={onDragEnd}>
        {/* Styles specific background based on board's background property */}
        <div className={displayBackground(board?.background)}>
            <div className={styles.outerContainer}>
                {/* Navbar at top */}
                <NavBar />

                {/* Content below the Navbar */}
                <div className={styles.bodyContainer}>
                    {/* Sidebar on left */}
                    <div className={styles.boardListContainer}>
                        <Sidebar boards={currentUser.boards} name={name} setName={setName} />
                    </div>
                    {/* Main content on right of Sidebar */}
                    <div className={styles.backgroundOpacity}>
                        <div className={styles.mainContainer}>
                            {/* Form to edit board name */}
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
                            </form>

                            {/* Iterate and display all the current board's lists as droppables */}
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
                                {/* Button to create new list */}
                                <CreateListForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </DragDropContext>
    )
}

export default BoardView
