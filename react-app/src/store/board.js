
//normalize array of objects into nested object
export const normalize = (arr) => {
    const dataObj = {};
    arr.forEach((obj) => (dataObj[obj.id] = obj));
    return dataObj;
  };

// Action Type
const SAVE_BOARDS = "board/SAVE_BOARDS"
const SELECT_BOARD = "board/SELECT_BOARD"
const ADD_BOARD = "board/ADD_BOARD"
const DELETE_BOARD = "board/DELETE_BOARD"

// Action Creator
export const saveBoardsAction = (payload) => {
    return {
        type: SAVE_BOARDS,
        payload
    }
}

export const selectBoardAction = (payload) => {
    return {
        type: SELECT_BOARD,
        payload
    }
}

export const addBoardAction = (payload) => {
    return {
        type: ADD_BOARD,
        payload
    }
}

export const deleteBoardAction = (boardId) => {
    return {
        type: DELETE_BOARD,
        boardId
    }
}

// Thunks
export const createBoardThunk = (input) => async (dispatch) => {
    let { name, background } = input
    const response = await fetch(`/api/boards`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            background,
            private: false
        })
    })

    if (!response.ok) {
        throw response
    }

    const data = await response.json()
    await dispatch(selectBoardAction(data))
    await dispatch(addBoardAction(data))
    return data
}

export const deleteBoardThunk = (boardId) => async (dispatch) => {
    const response = await fetch(`api/boards/${boardId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (!response.ok) {
        throw response
    }

    const data = await response.json()
    await dispatch(deleteBoardAction(boardId))
    return data
}

// Reducer
let initialState = { selectedBoard: null, savedBoards: null }

export default function reducer (state = initialState, action) {
    let newState = { ...state }
    let newBoard = action.payload
    let newSavedBoards = newState.savedBoards
    switch (action.type){
        case SAVE_BOARDS:
            let boardsObj = normalize(action.payload)
            return { ...newState, savedBoards: boardsObj }
        case SELECT_BOARD:
            return { ...newState, selectedBoard: action.payload }
        case ADD_BOARD:
            newSavedBoards[newBoard.id] = newBoard
            return { ...newState, savedBoards: newSavedBoards }
        case DELETE_BOARD:
            let deleteBoardId = action.boardId
            delete newSavedBoards[deleteBoardId]
            return { ...newState, savedBoards: newSavedBoards}
        default:
            return state
    }
}
