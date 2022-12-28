import React from "react";

const SingleCard = ({ card }) => {

    if (!card) return null

    return (
        <>
            {card.title}
        </>
    )
}

export default SingleCard;
