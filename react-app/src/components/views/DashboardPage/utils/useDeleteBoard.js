import { useDispatch } from "react-redux";

import { deleteBoardThunk } from "../../../../store/board.js";

// This will send the thunk to delete board from database
const useDeleteBoard = (boardId, toggle) => {
    const dispatch = useDispatch()

    return () => {
        dispatch(deleteBoardThunk(boardId))
        .then(() => toggle(prevValue => !prevValue))
    }
}

export default useDeleteBoard;
