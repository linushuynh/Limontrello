import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min.js"

import { selectBoardAction } from "../../../../store/board.js"


// Custom hook that sends user to new board url using the id of the board panel clicked
const useRedirectToBoard = (board) => {
    const dispatch = useDispatch()
    const history = useHistory()

    // Returns callback to be used. Use by calling useRedirectToBoard(board) then call it where needed
    return async () => {
        await dispatch(selectBoardAction(board))
        history.push(`/b/${board.id}`)
    }
}

export default useRedirectToBoard;
