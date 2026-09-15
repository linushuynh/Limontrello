import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd"

// Utils
import displayBackground from "./utils/boardviewBackground.js";
import { submitEdit, submitForm } from "./utils/submitFunctions.js";

// Contexts and Thunks
import { SubmittedContext } from "../../context/SubmittedContext";
import { selectBoardAction } from "../../../store/board";
import { setUser } from "../../../store/session";
import { editCardThunk } from "../../../store/cards";

// CSS import
import styles from "./BoardView.module.css"

// Inner Components
import ListColumn from "./Lists/ListColumn";
import NavBar from "../../globalComponents/NavBar/NavBar.js";
import Sidebar from "../../globalComponents/SideBar/Sidebar.js";
import CreateListForm from "../../forms/CreateListForm";
import NotFound from "../NotFoundPage/NotFound";


const BoardView = () => {
    const dispatch = useDispatch()
    const { boardId } = useParams()

    // Toggle-able states and contexts for re-renders
    const [selectEdit, setSelectEdit] = useState(false)
    const { setHasSubmitted } = useContext(SubmittedContext)

    // Grabbing current user and locating board data using url parameter
    const currentUser = useSelector(state => state.session.user)
    const cards = useSelector(state => Object.values(state.cards))
    let board = currentUser?.boards?.find(b => +b.id === +boardId)

    // Extracting data from current users's boards
    const [name, setName] = useState(board?.name)

    const parseListOrder = (orderValue) => {
        if (!orderValue) {
            return []
        }

        try {
            const parsed = JSON.parse(orderValue)
            return Array.isArray(parsed) ? parsed : []
        } catch (error) {
            return []
        }
    }

    const orderedLists = (() => {
        if (!board?.lists) {
            return []
        }

        const persistedOrder = parseListOrder(board.list_order)
        const listMap = new Map(board.lists.map(list => [Number(list.id), list]))
        const ordered = persistedOrder
            .map(listId => listMap.get(Number(listId)))
            .filter(Boolean)

        const remaining = board.lists.filter(list => !persistedOrder.some(listId => Number(listId) === Number(list.id)))
        return [...ordered, ...remaining]
    })()

    let lists = orderedLists

    const parseCardOrder = (orderValue) => {
        if (!orderValue) {
            return []
        }

        try {
            const parsed = JSON.parse(orderValue)
            return Array.isArray(parsed) ? parsed : []
        } catch (error) {
            return []
        }
    }

    const applyOptimisticDragUpdate = (
        sourceList,
        destinationList,
        grabbedCard,
        sourceCardOrder,
        destinationCardOrder,
    ) => {
        const optimisticUser = JSON.parse(JSON.stringify(currentUser))
        const optimisticBoard = optimisticUser.boards.find(b => +b.id === +boardId)
        const optimisticSourceList = optimisticBoard.lists.find(list => list.id === sourceList.id)
        const optimisticDestinationList = optimisticBoard.lists.find(list => list.id === destinationList.id)

        if (sourceList.id === destinationList.id) {
            optimisticDestinationList.card_order = JSON.stringify(destinationCardOrder)
            dispatch(setUser(optimisticUser))
            return optimisticUser
        }

        const movedCard = optimisticSourceList.cards.find(card => +card.id === +grabbedCard.id) || grabbedCard
        movedCard.list_id = destinationList.id
        optimisticSourceList.cards = optimisticSourceList.cards.filter(card => +card.id !== +grabbedCard.id)
        optimisticSourceList.card_order = JSON.stringify(sourceCardOrder)

        optimisticDestinationList.cards = [...optimisticDestinationList.cards, movedCard]
        optimisticDestinationList.card_order = JSON.stringify(destinationCardOrder)

        dispatch(setUser(optimisticUser))
        return optimisticUser
    }

    const rollbackDragUpdate = (previousUser) => {
        dispatch(setUser(previousUser))
    }

    useEffect(() => {
        dispatch(selectBoardAction(board))
    }, [dispatch, board])

    // After drag is let go, this function is run to update the new data
    const onDragEnd = result => {
        const { destination, source, draggableId } = result

        // Return if card is dropped outside of droppable
        if (!destination) {
            return
        }

        const sourceList = lists.find(list => list.name === source.droppableId)
        const destinationList = lists.find(list => list.name === destination.droppableId)

        if (!sourceList || !destinationList) {
            return
        }

        const grabbedCard = cards.find(card => (
            card.list_id === sourceList.id && card.id.toString() === draggableId.toString()
        ))
        if (!grabbedCard) {
            return
        }

        const sourceOrder = parseCardOrder(sourceList.card_order)
        const destinationOrder = parseCardOrder(destinationList.card_order)

        let destinationCardOrder = [...destinationOrder]
        let sourceCardOrder = sourceOrder.filter(cardId => Number(cardId) !== Number(grabbedCard.id))

        const previousUser = JSON.parse(JSON.stringify(currentUser))

        if (destination.droppableId === source.droppableId) {
            destinationCardOrder = sourceOrder.filter(cardId => Number(cardId) !== Number(grabbedCard.id))
            destinationCardOrder.splice(destination.index, 0, grabbedCard.id)

            const input = {
                title: grabbedCard.title,
                description: grabbedCard.description,
                listId: destinationList.id,
                cardOrder: destinationCardOrder,
                sourceCardOrder: null,
                sourceListId: sourceList.id,
            }

            applyOptimisticDragUpdate(sourceList, destinationList, grabbedCard, sourceCardOrder, destinationCardOrder)
            dispatch(editCardThunk(input, grabbedCard.id))
                .catch(() => rollbackDragUpdate(previousUser))
            return
        }

        destinationCardOrder = [...destinationOrder]
        destinationCardOrder = destinationCardOrder.filter(cardId => Number(cardId) !== Number(grabbedCard.id))
        destinationCardOrder.splice(destination.index, 0, grabbedCard.id)

        const input = {
            title: grabbedCard.title,
            description: grabbedCard.description,
            listId: destinationList.id,
            cardOrder: destinationCardOrder,
            sourceCardOrder: sourceCardOrder,
            sourceListId: sourceList.id,
        }

        applyOptimisticDragUpdate(sourceList, destinationList, grabbedCard, sourceCardOrder, destinationCardOrder)
        dispatch(editCardThunk(input, grabbedCard.id))
            .catch(() => rollbackDragUpdate(previousUser))
    }

    // If board does not exist for this user, Maybe redirect to 404 page later on
    if (!board) {
        return ( <NotFound /> )
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
                                <form onSubmit={(e) => submitForm(e, name, board, setName, setHasSubmitted, dispatch, setSelectEdit)} className={styles.boardHeader}>
                                    <div className={styles.nameNcharCount}>
                                        {/* Display the board name and can be clicked to edit */}
                                        <input
                                            className={styles.boardName}
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                            maxLength={20}
                                            onBlur={() => submitEdit(name, board, setName, setHasSubmitted, dispatch, setSelectEdit)}
                                            onClick={() => setSelectEdit(true)}
                                            />

                                        {/* Character count conditionally renders in edit mode */}
                                        {selectEdit && <div className={styles.editCharCount}>
                                            {name.length}/20 characters
                                        </div>}
                                    </div>
                                </form>

                                {/* Iterate and display all the current board's lists as droppables */}
                                <div className={styles.listsContainer}>
                                    {orderedLists.map((list) => (
                                        <Droppable droppableId={list.name} key={`${list.id}${list.name}`}>
                                            {(provided, snapshot) => (
                                                <div key={list.id} >
                                                    <ListColumn
                                                        list={list}
                                                        setHasSubmitted={setHasSubmitted}
                                                        placeholder={provided.placeholder}
                                                        provided={provided}
                                                        isDraggingOver={snapshot.isDraggingOver}
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
