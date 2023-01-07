import React, { useState } from "react";
import styles from "./cssModules/ListColumn.module.css"
import CreateCardForm from "./forms/CreateCardForm";
import { Draggable } from "react-beautiful-dnd";
import SingleCard from "./SingleCard";

const ListColumn = ({ list, provided, isDraggingOver }) => {
    const cards = list.cards
    const [showAddCardModal, setShowAddCardModal] = useState("")
    const [displayAddButtons, setDisplayAddButtons] = useState()
    // const [alreadyOpen, setAlreadyOpen] = useState(false)

    const openCardForm = (e) => {
        e.preventDefault()
        setShowAddCardModal(true)
        // if (alreadyOpen && displayAddButtons == list.id)
        setDisplayAddButtons(list.id)
    }

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
