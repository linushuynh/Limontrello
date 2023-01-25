// import { saveBoardsAction } from "./board";
// import { getUserThunk } from "./session";

import { normalize } from "./board"

// ACTION TYPES
    const LOAD_CARDS = "cards/LOAD_CARDS"
    const CREATE_CARD = "cards/CREATE_CARD"
    const EDIT_CARD = "cards/EDIT_CARD"
    const DELETE_CARD = "cards/DELETE_CARD"

// ACTION CREATOR
export const loadCardsAction = (payload) => {
        return {
            type: LOAD_CARDS,
            payload
        }
    }

export const createCardAction = (payload) => {
    return {
        type: CREATE_CARD,
        payload
    }
}

export const editCardAction = (payload) => {
    return {
        type: EDIT_CARD,
        payload
    }
}

export const deleteCardAction = (cardId) => {
    return {
        type: DELETE_CARD,
        cardId
    }
}

// THUNKS


export const createCardThunk = (input, currentUserId) => async (dispatch) => {
    let { title, description, listId, position } = input
    const response = await fetch("/api/cards", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title,
            description,
            position,
            list_id: listId
        })
    })


    const data = await response.json()
    await dispatch(createCardAction(data))
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
    await dispatch(deleteCardAction(cardId))
    return data
}

export const editCardThunk = (input, cardId) => async (dispatch) => {
    const { title, description, listId, position } = input
    const response = await fetch(`/api/cards/${cardId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            description,
            position,
            list_id: listId
        })
    })

    // Passing in new object instead of data object because React DnD could not find updated title value
    dispatch(editCardAction({
        id: cardId,
        title,
        description,
        position,
        list_id: listId
    }))
    const data = await response.json()
    return data
}

const initialState = {}

export default function reducer (state = initialState, action) {
    let newState = { ...state }
    switch(action.type) {
        case LOAD_CARDS:
            let cardsObj = null
            if (action.payload) {
                cardsObj = normalize(action.payload)
            }
            return { ...newState, ...cardsObj }
        case CREATE_CARD:
            newState[action.payload.id] = action.payload
            return newState
        case EDIT_CARD:
            let selectedCard = newState[action.payload.id]
            selectedCard.description = action.payload.description
            selectedCard.list_id = action.payload.list_id
            // This edits the title but changing title makes React DnD lose track of draggable
            if (selectedCard.title !== action.payload.title) {
                selectedCard.title = action.payload.title
            }
            return newState
        case DELETE_CARD:
            const { cardId } = action
            delete state[cardId]
            return state
        default:
            return state
    }
}
