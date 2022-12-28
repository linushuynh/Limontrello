import React, { useState } from "react";
import styles from "./cssModules/ListColumn.module.css"
import CreateCardForm from "./forms/CreateCardForm";
import SingleCard from "./SingleCard";

const ListColumn = ({ list, setHasSubmitted }) => {
    const cards = list.cards
    const [showAddCardModal, setShowAddCardModal] = useState("")
    console.log(`cards array for list ${list.id}`,cards)

    const openCardForm = (e) => {
        e.preventDefault()
        setShowAddCardModal(true)
    }

    if (!list) return null
    return (
        <div className={styles.listColumnContainer}>
            <div className={styles.listHeader}>
                <div className={styles.listName}>
                    {list.name}
                </div>
                <div className={styles.ellipses}>
                    <div>...</div>
                </div>
            </div>
            <div className={styles.cardsContainer}>
                {cards.map(card => (
                    <div key={card.id}>
                        <SingleCard card={card} />
                    </div>
                ))}
                <div className={styles.addCardContainer}>
                    {showAddCardModal?
                        <CreateCardForm setShowAddCardModal={setShowAddCardModal} listId={list.id} setHasSubmitted={setHasSubmitted}/>
                        :
                        <button onClick={openCardForm} className={styles.addCardButton}>+ Add a card</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default ListColumn
