import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "../cssModules/DeleteBoardModal.module.css"

const ModalContext = React.createContext();

export function DeleteBoardModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function DeleteBoardModal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id={styles.modal}>
      <div id={styles.modal_background} onClick={onClose} />
      <div id="modal-content">{children}</div>
    </div>,
    modalNode
  );
}
