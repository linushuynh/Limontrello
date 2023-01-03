import React, { useState } from "react";
import { CardDetailModal } from "./context/CardDetailsModal";
import styles from "./cssModules/SingleCard.module.css"
import SingleCardDetails from "./SingleCardDetails";

const SingleCard = ({ card }) => {
    const [showCardDetailsModal, setShowCardDetailsModal] = useState(false)

    const openCardDetails = () => {
        setShowCardDetailsModal(true)
    }

    if (!card) return null

    return (
        <>
            <div className={styles.cardContainer} onClick={openCardDetails} >
                <span>
                    {card.title}
                </span>
            </div>
            {showCardDetailsModal && (<CardDetailModal onClose={() => setShowCardDetailsModal(false) }>
                <SingleCardDetails card={card} />
            </CardDetailModal>
            )}
        </>
    )
}

export default SingleCard;
