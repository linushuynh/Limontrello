import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./cssModules/ListColumn.module.css"
import CreateCardForm from "./forms/CreateCardForm";
import { Draggable } from "react-beautiful-dnd";
import SingleCard from "./SingleCard";
import { useDispatch, useSelector } from "react-redux";
import { loadCardsAction } from "../store/cards";
import editicon from "../assets/editicon.svg"
import deleteicon from "../assets/deleteicon.svg"
import { deleteListThunk, editListThunk } from "../store/list";
import { SubmittedContext } from "./context/SubmittedContext";
import { DeleteListModal } from "./context/DeleteListModal";
import DeleteListForm from "./forms/DeleteListForm";

const ListColumn = ({ list, provided, isDraggingOver }) => {
    const dispatch = useDispatch()
    // Grab cards from state and filter out to display appropriate cards by list id
    const cardsArr = useSelector(state => Object.values(state.cards))
    let cards = cardsArr.filter(card => card.list_id === list.id)
    const [showAddCardModal, setShowAddCardModal] = useState("")
    const [showEditMode, setShowEditMode] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [displayAddButtons, setDisplayAddButtons] = useState()
    const [name, setName] = useState(list.name)
    const editRef = useRef(null)
    const { setHasSubmitted } = useContext(SubmittedContext)

    const flipCardForm = (e) => {
        e.preventDefault()
        setShowAddCardModal(true)
        // if (alreadyflip && displayAddButtons == list.id)
        setDisplayAddButtons(list.id)
    }

    const flipEditModal = () => {
        setShowEditMode(!showEditMode)
    }

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

    const flipDeleteModal = (e) => {
        e.preventDefault()
        setShowDeleteModal(!showDeleteModal)
    }

    const submitDelete = async () => {
        setShowDeleteModal(false)
        await dispatch(deleteListThunk(list.id))
        setHasSubmitted(prev => !prev)
    }

    useEffect(() => {
        dispatch(loadCardsAction(list.cards))
    }, [dispatch])

    // Select the input when toggling edit mode for list column
    useEffect(() => {
        if (showEditMode) {
            editRef.current?.focus()
        }
    }, [editRef, showEditMode])

    if (!list) return null
    return (
        <div className={styles.listColumnContainer} ref={provided.innerRef} {...provided.droppableProps}>
            <div className={styles.listHeader}>
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
                <div className={styles.addCardContainer}>
                    { showAddCardModal ?
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

export default ListColumn
