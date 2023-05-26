import { useContext } from "react"
import { useDispatch } from "react-redux"

import { SubmittedContext } from "../../../../context/SubmittedContext"

import { editListThunk, deleteListThunk } from "../../../../../store/list"


// When called, will send thunk to submit list edits to database
export const useSubmitEdit = (name, listId, flipFunction ) => {
    const dispatch = useDispatch()
    const { setHasSubmitted } = useContext(SubmittedContext)

    const input = {
        name,
        listId: listId
    }

    // Returns callback to be called which runs code to submit edits to list
    return async () => {
        flipFunction()
        await dispatch(editListThunk(input))
        setHasSubmitted(prev => !prev)
    }
}


// When called, will send thunk to delete list from database
export const useSubmitDelete = (listId, flipFunction) => {
    const dispatch = useDispatch()
    const { setHasSubmitted } = useContext(SubmittedContext)

    // Returns callback to be called which runs code to delete list
    return async () => {
        flipFunction()
        await dispatch(deleteListThunk(listId))
        setHasSubmitted(prev => !prev)
    }
}
