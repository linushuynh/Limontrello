import React, { useState } from "react";
import styles from "./cssModules/ListColumn.module.css"
import CreateCardForm from "./forms/CreateCardForm";

const ListColumn = ({ list }) => {
    const cards = list.cards
    const [showAddCardModal, setShowAddCardModal] = useState("")
    console.log("list ID",list.id)
    console.log("cards array for above list id",cards)

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
                <div>
                    Cards go here
                </div>
                <div className={styles.addCardContainer}>
                    {showAddCardModal?
                        <CreateCardForm setShowAddCardModal={setShowAddCardModal} listId={list.id} />
                        :
                        <button onClick={openCardForm} className={styles.addCardButton}>+ Add a card</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default ListColumn
