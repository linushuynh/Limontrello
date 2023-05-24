import { updateBoardThunk } from "../../../../store/board.js"


/* Called when the board title input is deselected */
export const submitEdit = async (name, board, setName, setHasSubmitted, dispatch, setSelectEdit) => {
    // If they submit an empty name, reset to the original board name
    if (name === "") {
        setName(board.name)
    }

    let input = {
        name: name,
        background: board.background,
        private: false,
        boardId: board.id
    }
    
    setHasSubmitted(prevValue => !prevValue)
    await dispatch(updateBoardThunk(input))
    setSelectEdit(false)
}


/* Same function as above but separate to prevent blur on blur loop
Will be called by pressing enter on the form instead of deselecting */
export const submitForm = async (e, name, board, setName, setHasSubmitted, dispatch, setSelectEdit) => {
    e.preventDefault();

    // If they submit an empty name, reset to the original board name
    if (name === "") {
        setName(board.name)
    }

    let input = {
        name: name,
        background: board.background,
        private: false,
        boardId: board.id
    }

    await dispatch(updateBoardThunk(input))
    setHasSubmitted(prevValue => !prevValue)
    setSelectEdit(false)
    document.activeElement.blur();
}
