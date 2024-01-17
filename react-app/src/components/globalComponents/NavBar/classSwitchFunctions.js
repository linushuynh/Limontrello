import styles from "./NavBar.module.css"

/*
These functions take in a url path and output the appropriate CSS class
*/

export function setNavClass(pathname) {
    switch(pathname) {
      case "/dashboard":
        return styles.navBarContainer
      default:
        return styles.transparentNavBarContainer
    }
  }


export function setTitleClass(pathname) {
    switch(pathname) {
      case "/dashboard":
        return styles.title
      default:
        return styles.titleBoard
    }
  }
