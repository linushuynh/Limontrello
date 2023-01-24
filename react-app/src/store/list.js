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

