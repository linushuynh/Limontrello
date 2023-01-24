import React, { useEffect, useState } from "react";
import styles from "./cssModules/ListColumn.module.css"
import CreateCardForm from "./forms/CreateCardForm";
import { Draggable } from "react-beautiful-dnd";
import SingleCard from "./SingleCard";
import { useDispatch, useSelector } from "react-redux";
import { loadCardsAction } from "../store/cards";

const ListColumn = ({ list, provided, isDraggingOver }) => {
    const dispatch = useDispatch()
    // Grab cards from state and filter out to display appropriate cards by list id
    const cardsArr = useSelector(state => Object.values(state.cards))
    let cards = cardsArr.filter(card => card.list_id === list.id)
    console.log("cards before ***********", cards)
    // Sort the cardsfrom lowest to highest values using position property
    cards = cards?.sort((a, b) => {
        return a?.position - b?.position
    })
    console.log("cards after ***********", cards)

    const [showAddCardModal, setShowAddCardModal] = useState("")
    const [displayAddButtons, setDisplayAddButtons] = useState()

    const openCardForm = (e) => {
        e.preventDefault()
        setShowAddCardModal(true)
        // if (alreadyOpen && displayAddButtons == list.id)
        setDisplayAddButtons(list.id)
    }

    useEffect(() => {
        dispatch(loadCardsAction(list.cards))
    }, [])

    if (!list) return null
    return (
        <div className={styles.listColumnContainer} ref={provided.innerRef} {...provided.droppableProps}>
            <div className={styles.listHeader}>
                <div className={styles.listName}>
                    {list.name}
                </div>
                {/* <div className={styles.ellipses}>
                    <div>...</div>
                </div> */}
            </div>
            <div className={styles.cardsContainer}>
                {cards.map((card, index) => (
                    <div key={card.id} className={styles.singleCard}>
                        <Draggable draggableId={card.title} index={index}>
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
                        <div onClick={openCardForm} className={styles.addCardButton}>
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
