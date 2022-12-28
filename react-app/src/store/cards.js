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


    if (!response.ok) {
        throw response
    }

    const data = await response.json()
    // await dispatch(getUserThunk(currentUserId))
    return data
}
