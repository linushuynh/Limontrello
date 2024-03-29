import styles from "../BoardView.module.css"

// This function takes in a background attribute and outputs the css style background specifically using BoardView styling

const boardviewBackground = (background) => {
    switch(background) {
        case "snowmountain":
            return styles.snowmountainContainer
        case "forest":
            return styles.forestContainer
        case "beach":
            return styles.beachContainer
        default:
            return styles.container
    }
}

export default boardviewBackground;
