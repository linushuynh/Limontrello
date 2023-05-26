import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSubmitDelete, useSubmitEdit } from "./utils/listHooks";

// Styles and assets
import styles from "./ListColumn.module.css"
import editicon from "../../../../assets/editicon.svg"
import deleteicon from "../../../../assets/deleteicon.svg"

// Actions and thunks
import { loadCardsAction } from "../../../../store/cards";

// Contexts and modals
import { DeleteListModal } from "../../../context/DeleteListModal";
import useToggleState from "../../../../utils/hooks/useToggleState.js";

// Inner Components
import { Draggable } from "react-beautiful-dnd";
import SingleCard from "./DraggableCard/SingleCard";
import CreateCardForm from "../../../forms/CreateCardForm";
import DeleteListForm from "../../../forms/DeleteListForm";


const ListColumn = ({ list, provided, isDraggingOver }) => {
    const dispatch = useDispatch()
    const editRef = useRef(null)

    // Toggle-able states and contexts for re-render
    const [showEditMode, flipEditMode] = useToggleState(false)
    const [showDeleteModal, flipShowDeleteModal] = useToggleState(false)
    const [showAddCardModal, flipAddCardModal] = useToggleState(false)

    // Grab cards from state and filter out to display appropriate cards by list id
    const cardsArr = useSelector(state => Object.values(state.cards))
    let cards = cardsArr.filter(card => card.list_id === list.id)

    // Controlled inputs
    const [name, setName] = useState(list.name)

    // Hooks to call for editing and deleting lists
    const editList = useSubmitEdit(name, list.id, flipEditMode)
    const deleteList = useSubmitDelete(list.id, flipShowDeleteModal)

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

    if (!list) return null


    return (
        <div className={styles.listColumnContainer} ref={provided.innerRef} {...provided.droppableProps}>
            {/* Header bar at top of list */}
            <div className={styles.listHeader}>
                {/* Flip between edit mode and display mode */}
                {showEditMode ? (
                    <form className={styles.editForm} onSubmit={editList}>
                        <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        onBlur={editList}
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
                    <button className={styles.listOption} onClick={() => flipEditMode()}>
                        <img alt="editicon" src={editicon}></img>
                    </button>
                    <button className={styles.listOption} onClick={() => flipShowDeleteModal()}>
                        <img alt="deleteicon" src={deleteicon}></img>
                    </button>
                    {showDeleteModal && <DeleteListModal onClose={() => flipShowDeleteModal(false)} >
                        <DeleteListForm listName={list.name} deleteList={deleteList} flipDeleteModal={flipShowDeleteModal} />
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
                        <CreateCardForm flipAddCardModal={flipAddCardModal} listId={list.id} />
                        :
                        <div onClick={() => flipAddCardModal()} className={styles.addCardButton}>
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
