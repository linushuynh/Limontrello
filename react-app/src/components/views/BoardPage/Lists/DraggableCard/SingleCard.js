import React, { useState } from "react";

// Modals and other components
import { CardDetailModal } from "../../../../context/CardDetailsModal";
import SingleCardDetails from "./SingleCardDetails";

// CSS import
import styles from "./SingleCard.module.css"


const SingleCard = ({ card, provided, innerRef, isDragging }) => {
    const [showCardDetailsModal, setShowCardDetailsModal] = useState(false)

    // When called, will open modal containing component with card details
    const openCardDetails = () => setShowCardDetailsModal(true)

    if (!card) return null

    return (
        <>
            {/* Visible card in list that is draggable */}
            <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={innerRef}
                className={isDragging? `${styles.tiltContainer}` : styles.cardContainer}
                onClick={openCardDetails}
            >
                <div className={styles.cardTitle}>
                    {card.title}
                </div>
            </div>

            {/* Conditionally render card details based on state */}
            {showCardDetailsModal && (<CardDetailModal onClose={() => setShowCardDetailsModal(false) }>
                <SingleCardDetails card={card} setShowCardDetailsModal={setShowCardDetailsModal} />
            </CardDetailModal>
            )}
        </>
    )
}

export default SingleCard;
