import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { loadBoardsThunk } from "../store/board";
import { CardDetailModal } from "./context/CardDetailsModal";
import styles from "./cssModules/SingleCard.module.css"
import SingleCardDetails from "./SingleCardDetails";

const SingleCard = ({ card, provided, innerRef, isDragging }) => {
    const [showCardDetailsModal, setShowCardDetailsModal] = useState(false)

    const openCardDetails = () => {
        setShowCardDetailsModal(true)
    }

    if (!card) return null

    return (
        <>
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
            {showCardDetailsModal && (<CardDetailModal onClose={() => setShowCardDetailsModal(false) }>
                <SingleCardDetails card={card} setShowCardDetailsModal={setShowCardDetailsModal} />
            </CardDetailModal>
            )}
        </>
    )
}

export default SingleCard;
