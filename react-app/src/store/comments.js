// Action Types
// const CREATE_COMMENT = 'comments/CREATE_COMMENT'
// const EDIT_COMMENT = 'comments/EDIT_COMMENT'
// const DELETE_COMMENT = 'comments/DELETE_COMMENT'


// Thunks
export const createCommentThunk = (input) => async (dispatch) => {
    const { content, cardId } = input

    const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content,
            card_id: cardId
        })
    })

    const data = await response.json()
    return data
}

export const editCommentThunk = (input, commentId) => async (dispatch) => {
    const { content } = input

    const response = await fetch(`/api/comments/${commentId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content
        })
    })

    const data = await response.json()
    return data
}

export const deleteCommentThunk = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await response.json()
    return data
}
