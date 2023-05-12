import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Draggable } from "react-beautiful-dnd";

// Styles and assets
import styles from "./ListColumn.module.css"
import editicon from "../../../../assets/editicon.svg"
import deleteicon from "../../../../assets/deleteicon.svg"

// Actions and thunks
import { loadCardsAction } from "../../../../store/cards";
import { deleteListThunk, editListThunk } from "../../../../store/list";

// Contexts and modals
import { SubmittedContext } from "../../../context/SubmittedContext";
import { DeleteListModal } from "../../../context/DeleteListModal";

// Inner Components
import SingleCard from "../../../SingleCard";
import CreateCardForm from "../../../forms/CreateCardForm";
import DeleteListForm from "../../../forms/DeleteListForm";


const ListColumn = ({ list, provided, isDraggingOver }) => {
    const dispatch = useDispatch()
    const editRef = useRef(null)

    // Toggle-able states for re-render
    const [showEditMode, setShowEditMode] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [displayAddButtons, setDisplayAddButtons] = useState()

    // Grab cards from state and filter out to display appropriate cards by list id
    const cardsArr = useSelector(state => Object.values(state.cards))
    let cards = cardsArr.filter(card => card.list_id === list.id)
    const [showAddCardModal, setShowAddCardModal] = useState("")
    const [name, setName] = useState(list.name)
    const { setHasSubmitted } = useContext(SubmittedContext)

    // Re-render when the cards in the list changes
    useEffect(() => {
        dispatch(loadCardsAction(list.cards))
    }, [dispatch, list.cards])

    // Select the input when toggling edit mode for list column
    useEffect(() => {
        if (showEditMode) {
            editRef.current?.focus()
        }
    }, [editRef, showEditMode])

    // Flip the state to reveal form for creating new cards
    const flipCardForm = (e) => {
        e.preventDefault()
        setShowAddCardModal(true)
        setDisplayAddButtons(list.id)
    }

    // Flip the state to reveal form for deleting the list
    const flipDeleteModal = (e) => {
        e.preventDefault()
        setShowDeleteModal(!showDeleteModal)
    }

    // Flip the state to edit the list name
    const flipEditModal = () => setShowEditMode(!showEditMode)

    // When called, will send thunk to submit list edits to database
    const submitEdit = async (e) => {
        e.preventDefault()
        const input = {
            name,
            listId: list.id
        }
        setShowEditMode(false)
        await dispatch(editListThunk(input))
        setHasSubmitted(prev => !prev)
    }

    // When called, will send thunk to delete list from database
    const submitDelete = async () => {
        setShowDeleteModal(false)
        await dispatch(deleteListThunk(list.id))
        setHasSubmitted(prev => !prev)
    }

    if (!list) return null

    return (
        <div className={styles.listColumnContainer} ref={provided.innerRef} {...provided.droppableProps}>
            {/* Header bar at top of list */}
            <div className={styles.listHeader}>
                {/* Flip between edit mode and display mode */}
                {showEditMode ? (
                    <form className={styles.editForm} onSubmit={e => submitEdit(e)}>
                        <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        onBlur={e => submitEdit(e)}
                        ref={editRef}
                        maxLength={15}
                        />
                    </form>
                ) : (
                    <div className={styles.listName}>
                        {list.name}
                    </div>
                )}

                {/* Pencil and Trashcan Buttons to edit and delete */}
                <div className={styles.listButtons}>
                    <button className={styles.listOption} onClick={flipEditModal}>
                        <img alt="editicon" src={editicon}></img>
                    </button>
                    <button className={styles.listOption} onClick={e => flipDeleteModal(e)}>
                        <img alt="deleteicon" src={deleteicon}></img>
                    </button>
                    {showDeleteModal && <DeleteListModal onClose={() => setShowDeleteModal(false)} >
                        <DeleteListForm listName={list.name} submitDelete={submitDelete} flipDeleteModal={flipDeleteModal} />
                    </DeleteListModal>}
                </div>
            </div>

            {/* Maps out each card and renders it as a Draggable item */}
            <div className={styles.cardsContainer}>
                {cards.map((card, index) => (
                    <div key={card.id} className={styles.singleCard}>
                        <Draggable draggableId={card.id.toString()} index={index}>
                            {(provided, snapshot) => (
                                <SingleCard
                                    provided={provided}
                                    innerRef={provided.innerRef}
                                    card={card}
                                    index={index}
                                    isDragging={snapshot.isDragging}
                                />
                            )}
                        </Draggable>
                    </div>
                ))}
                {provided.placeholder}

                {/* Section to add new card */}
                <div className={styles.addCardContainer}>
                    {showAddCardModal ?
                        <CreateCardForm setShowAddCardModal={setShowAddCardModal} listId={list.id} displayAddButtons={displayAddButtons} setDisplayAddButtons={setDisplayAddButtons} />
                        :
                        <div onClick={flipCardForm} className={styles.addCardButton}>
                            <span className="material-symbols-outlined" id={styles.plusSign}>add</span>
                            Add a card
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ListColumn;
