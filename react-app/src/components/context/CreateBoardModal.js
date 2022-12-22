import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "../cssModules/CreateBoardModal.module.css"

const ModalContext = React.createContext();

export function CreateBoardModalProvider({ children }) {
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

export function CreateBoardModal({ onClose, children }) {
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
