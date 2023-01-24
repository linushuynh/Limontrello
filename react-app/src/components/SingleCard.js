import React, { useState } from "react";
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { loadBoardsThunk } from "../store/board";
import { CardDetailModal } from "./context/CardDetailsModal";
import styles from "./cssModules/SingleCard.module.css"
import SingleCardDetails from "./SingleCardDetails";

const SingleCard = ({ cardId, provided, innerRef, isDragging }) => {
    const [showCardDetailsModal, setShowCardDetailsModal] = useState(false)
    const cards = useSelector(state => state.cards)
    const card = cards[cardId]

    const openCardDetails = () => {
        setShowCardDetailsModal(true)
    }

    // if (!card) return null

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
                <SingleCardDetails cardId={cardId} setShowCardDetailsModal={setShowCardDetailsModal} />
            </CardDetailModal>
            )}
        </>
    )
}

export default SingleCard;
