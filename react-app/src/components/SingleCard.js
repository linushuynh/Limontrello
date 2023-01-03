import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CardDetailModal } from "./context/CardDetailsModal";
// import { loadBoardsThunk } from "../store/board";
import styles from "./cssModules/SingleCard.module.css"
import SingleCardDetails from "./SingleCardDetails";

const SingleCard = ({ card }) => {
    const dispatch = useDispatch()
    const [showCardDetailsModal, setShowCardDetailsModal] = useState(false)

    const openCardDetails = () => {
        setShowCardDetailsModal(true)
        // let response = dispatch(loadBoardsThunk())
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
                <SingleCardDetails card={card} setShowCardDetailsModal={setShowCardDetailsModal} />
            </CardDetailModal>
            )}
        </>
    )
}

export default SingleCard;
