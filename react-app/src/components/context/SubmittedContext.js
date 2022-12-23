import { createContext, useState } from "react";

export const SubmittedProvider = (props) => {
    const [hasSubmitted, setHasSubmitted] = useState(false)

    return (
        <SubmittedContext.Provider value={{ hasSubmitted, setHasSubmitted }}>
            {props.children}
        </SubmittedContext.Provider>
    )
}

export const SubmittedContext = createContext()
