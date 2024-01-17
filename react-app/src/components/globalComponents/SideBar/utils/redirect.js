import { selectBoardAction } from "../../../../store/board"


// This function redirects the user to the board that is clicked and loads it as selected board in store
export const redirectBoard = async (eachBoard, dispatch, history, setName) => {
    await dispatch(selectBoardAction(eachBoard))

    history.push(`/b/${eachBoard.id}`)

    if (setName) {
        setName(eachBoard.name)
    }
}


// This function redirects the user to dashboard when called
export const redirectDash = async (dispatch, history) => {
    await dispatch(selectBoardAction(null))

    history.push(`/dashboard`)
}
