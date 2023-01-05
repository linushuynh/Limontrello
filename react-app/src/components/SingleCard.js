import React, { useState } from "react";
// import { useDispatch } from "react-redux";
import { CardDetailModal } from "./context/CardDetailsModal";
// import { loadBoardsThunk } from "../store/board";
import styles from "./cssModules/SingleCard.module.css"
import SingleCardDetails from "./SingleCardDetails";

const SingleCard = ({ card, setHasSubmitted }) => {
    // const dispatch = useDispatch()
    const [showCardDetailsModal, setShowCardDetailsModal] = useState(false)

    const openCardDetails = () => {
        setShowCardDetailsModal(true)
    }

    if (!card) return null

    return (
        <>
            <div className={styles.cardContainer} onClick={openCardDetails} >
                <div className={styles.cardTitle}>
                    {card.title}
                </div>
            </div>
            {showCardDetailsModal && (<CardDetailModal onClose={() => setShowCardDetailsModal(false) }>
                <SingleCardDetails card={card} setShowCardDetailsModal={setShowCardDetailsModal} setHasSubmitted={setHasSubmitted} />
            </CardDetailModal>
            )}
        </>
    )
}

export default SingleCard;
