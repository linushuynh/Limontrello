import React from "react";
import styles from "./cssModules/SingleCard.module.css"

const SingleCard = ({ card }) => {

    if (!card) return null

    return (
        <>
            <div className={styles.cardContainer}>
                <span>
                    {card.title}
                </span>
            </div>
        </>
    )
}

export default SingleCard;
