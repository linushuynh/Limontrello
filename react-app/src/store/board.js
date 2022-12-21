import { getUserThunk } from "./session";

//normalize array of objects into nested object
export const normalize = (arr) => {
    const dataObj = {};
    arr.forEach((obj) => (dataObj[obj.id] = obj));
    return dataObj;
  };

// Action Type
const LOAD_BOARD = "/board/LOAD_BOARD"


// Action Creator
export const loadBoardAction = (payload) => {
    return {
        type: LOAD_BOARD,
        payload
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

    const data = response.json()
    dispatch(loadBoardAction(data))
    dispatch(getUserThunk(data.user_id))
    return data
}

// Reducer
let initialState = { selectedBoard: null }

export default function reducer (state = initialState, action) {
    switch (action.type){
        case LOAD_BOARD:
            return { selectedBoard: action.payload }
        default:
            return state
    }
}
