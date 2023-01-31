// ACTION TYPES
const LOAD_LISTS = "lists/LOAD_LISTS"
const CREATE_LIST = "lists/CREATE_LIST"
const EDIT_LIST = "lists/EDIT_LIST"
const DELETE_LIST = "lists/DELETE_LIST"

// ACTION CREATOR
export const loadListsAction = (payload) => {
    return {
        type: LOAD_LISTS,
        payload
    }
}
export const createListAction = (payload) => {
    return {
        type: CREATE_LIST,
        payload
    }
}
export const editListAction = (payload) => {
    return {
        type: EDIT_LIST,
        payload
    }
}
export const deleteListAction = (payload) => {
    return {
        type: DELETE_LIST,
        payload
    }
}

// THUNKS

export const createListThunk = (input) => async (dispatch) => {
    const { name, boardId } = input

    const response = await fetch(`/api/lists`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            board_id: boardId
        })
    })

    const data = await response.json()
    await dispatch(createListAction(data))
    return data
}

export const editListThunk = (input) => async (dispatch) => {
    const { name, listId } = input
    const response = await fetch(`/api/lists/${listId}/edit`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name
        })
    })

    const data = await response.json()
    await dispatch(editListAction(data))
    return data
}

export const deleteListThunk = (listId) => async (dispatch) => {
    const response = await fetch(`/api/lists/${listId}/delete`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await response.json()
    await dispatch(deleteListAction(listId))
    return data
}

// REDUCER
const initialState = {}

export default function reducer (state = initialState, action) {
    let newState = { ...state }
    switch(action.type) {
        case CREATE_LIST:
            newState = { ...newState, [action.payload.id]: action.payload }
        case EDIT_LIST:
            newState[action.payload.id] = action.payload
            return newState
        case DELETE_LIST:
            delete newState[action.payload]
            return newState
        default:
            return state
    }
}
