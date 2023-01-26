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



// REDUCER
const initialState = {}

export default function reducer (state = initialState, action) {
    
}
