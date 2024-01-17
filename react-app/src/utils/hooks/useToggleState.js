import { useCallback, useState } from "react"

/* Custom Hook to create state that is only meant to be toggled
Takes in initial boolean state
Returns the state and a callback which can be simply called to toggle the state
*/
const useToggleState = (initial) => {
    const [bool, setBool] = useState(initial)

    // Memoized callback
    const toggle = useCallback(() => setBool(bool => !bool), [])

    return [bool, toggle]
}

export default useToggleState;
