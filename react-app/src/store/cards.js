// import { saveBoardsAction } from "./board";
// import { getUserThunk } from "./session";

// ACTION TYPES

// const CREATE_CARD = "cards/CREATE_CARD"

// ACTION CREATOR


// THUNKS

export const createCardThunk = (input, currentUserId) => async (dispatch) => {
    let { title, description, listId } = input
    const response = await fetch("/api/cards", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title,
            description,
            list_id: listId
        })
    })


    const data = await response.json()
    // await dispatch(getUserThunk(currentUserId))
    return data
}

export const deleteCardThunk = (cardId) => async (dispatch) => {
    const response = await fetch(`/api/cards/${cardId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await response.json()
    return data
}

export const editCardThunk = (input, cardId) => async (dispatch) => {
    const { title, description, listId } = input
    const response = await fetch(`/api/cards/${cardId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            description,
            list_id: listId
        })
    })
    const data = await response.json()
    return data
}
