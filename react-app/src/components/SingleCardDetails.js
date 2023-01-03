import React from "react";
import { useSelector } from "react-redux";
import styles from "./cssModules/SingleCardDetails.module.css"

const SingleCardDetails = ({ card }) => {
    console.log("clicked card",card)
    const lists = useSelector(state => state.boards.selectedBoard.lists)
    const selectedList = lists.find(list => list.id = card.list_id)

    console.log("selected list", selectedList)
    return (
        <div className={styles.outerContainer}>
            <div className={styles.iconColumn}>icons</div>
            <div className={styles.bigBody}>
                <div className={styles.headerContainer}>
                    <div id={styles.titleText} >{card.title}</div>
                    <div id={styles.listText} >in list {selectedList.name}</div>
                </div>
                <div className={styles.bodyContainer} >
                    <div className={styles.bodyDetails}>
                        <div className={styles.detailContainer}>
                            <div className={styles.categoryTitle}>
                            Description
                            </div>
                            <div id={styles.descriptionBox}>
                                {card.description}
                            </div>
                        </div>
                    </div>
                    <div className={styles.moreOptions}>
                        More button options
                        <div>Delete button here</div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SingleCardDetails;
