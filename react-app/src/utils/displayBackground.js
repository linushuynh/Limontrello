import styles from "../components/views/BoardPage/BoardView.module.css"

// This function takes in a background attribute and outputs the css style background

const displayBackground = (background) => {
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

export default displayBackground;
