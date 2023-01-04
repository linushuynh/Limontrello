import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Landing = () => {
    const currentUser = useSelector(state => state.session.user)
    const history = useHistory()

    if (currentUser) {
        history.push("/dashboard")
    }



    return (
        <div>
            Landing
        </div>
    )
}

export default Landing;
