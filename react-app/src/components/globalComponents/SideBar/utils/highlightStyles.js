/*
Conditionally style a highlight on selected bar if the user is viewing dashboard page
*/
export const dashBoardHighlightCheck = (mainClass, path) => {
    if (path === "/dashboard") {
        return `${mainClass} sideBarHighlight`
    } else {
        return mainClass
    }
}


/*
Conditionally style highlight onto specific board based on url
*/
export const boardHighlightCheck = (mainClass, boardId, pathname) => {
    // Matches given board id with url param to select correct board
    if (+pathname[pathname.length - 1] === +boardId) {
        return `${mainClass} sideBarHighlight`
    } else {
        return mainClass
    }
}
