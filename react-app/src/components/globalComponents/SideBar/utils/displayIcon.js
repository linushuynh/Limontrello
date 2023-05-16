import snowmountain from "../../../../assets/snowmountain.jpg"
import forest from "../../../../assets/forest.jpg"
import beach from "../../../../assets/beach.jpg"


// Using the given background property from a board, output the corresponding image source
export function displayIcon(background) {
    switch(background) {
        case "snowmountain":
            return snowmountain
        case "forest":
            return forest
        case "beach":
            return beach
        default:
            return snowmountain
    }
}
