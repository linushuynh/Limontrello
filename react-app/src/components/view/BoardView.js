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
import pikarun from "../../assets/pikarun.gif"

const BoardView = () => {
    const currentUser = useSelector(state => state.session.user)
    const [selectEdit, setSelectEdit] = useState(false)
    const { hasSubmitted, setHasSubmitted } = useContext(SubmittedContext)
    const { boardId } = useParams()
    const dispatch = useDispatch()
    let board = currentUser.boards.find(bored => +bored.id === +boardId)
    let usersBoards = currentUser.boards
    const [name, setName] = useState(board.name)
    const [loaded, setLoaded] = useState(false)
    // const [showEditBar, setShowEditBar] = useState(false)
    let lists = board?.lists
    // const [cardLists, setCardLists] = useState(lists)

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

    const pikarunCheck = () => {
        if (loaded) {
            return styles.hidden
        } else return styles.pikarun
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
        const { destination, source, draggableId } = result
        // Return if card is dropped outside of droppable
        if (!destination) {
            return
        }

        // if (destination.droppableId === source.droppableId) {
        //     //set new state
        //     let newState = Array.from(cardLists)
        //     console.log('newstate before', newState)
        //     // find the list of the card
        //     let sourceList = newState.find(list => list.name === source.droppableId)
        //     // grab the array of cards from list
        //     let sourceListCards = sourceList?.cards
        //     console.log("source list before", sourceList)
        //     // console.log("source list cards", sourceListCards)
        //     // grab the card object
        //     let grabbedCard = sourceList?.cards.find(card => card.title === draggableId)
        //     // find index of card
        //     console.log("grabbed card", grabbedCard)
        //     let cardIndex = sourceListCards.findIndex(card => card.title === draggableId)
        //     // console.log('card index', cardIndex)
        //     sourceListCards.splice(source.index, 1)
        //     sourceListCards.splice(destination.index, 0, grabbedCard)
        // }

        // If card is dropped in different list column, send thunk to move it
        if (destination.droppableId !== source.droppableId) {
            let sourceList = lists.find(list => list.name === source.droppableId)
            let destinationList = lists.find(list => list.name === destination.droppableId)
            let grabbedCard = sourceList?.cards.find(card => card.title === draggableId)
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
    }, [dispatch, hasSubmitted, currentUser.id])


    // If board does not exist for this user, Maybe redirect to 404 page later on
    if (!board) return "The board was not found or not yours"


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
                            <div className={styles.pikaContainer}>
                                <img alt="pikarun" src={pikarun} className={pikarunCheck()}></img>
                            </div>
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
