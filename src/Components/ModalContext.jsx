import './ModalContext.css';
import React, { createContext, useState, useRef } from "react";
import PropTypes from "prop-types";
import GenericModal from "./GenericModal";

export const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState(null);
  const modalResolveRef = useRef(null);

  const showModal = (title, renderBody) => {
    return new Promise((resolve) => {
      if (modalResolveRef.current) {
        modalResolveRef.current(null);
      }
      modalResolveRef.current = resolve;
      setModalState({ title, renderBody });
    });
  };

  const closeModal = (value = null) => {
    setModalState(null);
    if (modalResolveRef.current) {
      modalResolveRef.current(value);
      modalResolveRef.current = null;
    }
  };

  const showMessage = (title, message) => {
    return showModal(title, ({ close }) => (
      <div tabIndex={0} autoFocus onKeyDown={(e) => e.key === "Enter" && close(true)}>
        <p>
          {message.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
        <div className="modal-button-container">
          <button className="modal-button" onClick={() => close(true)}>OK</button>
        </div>
      </div>
    ));
  };

  const showConfirm = (title, message) => {
    return showModal(title, ({ close }) => (
      <div>
        <p>{message}</p>
        <div className="modal-button-container">
          <button className="modal-button" onClick={() => close("YES")}>Yes</button>
          <button className="modal-button" onClick={() => close("NO")}>No</button>
        </div>
      </div>
    ));
  };

  const showInput = (title, message, defaultValue = "") => {
    let inputValue = defaultValue;

    return showModal(title, ({ close }) => (
      <div>
        <p>{message}</p>
        <input
          className="modal-input"
          type="text"
          autoFocus
          defaultValue={defaultValue}
          onChange={(e) => (inputValue = e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // only prevent Enter's default
              close(inputValue);
            }
          }}
        />
        <div className="modal-button-container">
          <button className="modal-button" onClick={() => close(inputValue)}>OK</button>
          <button className="modal-button" onClick={() => close(null)}>Cancel</button>
        </div>
      </div>
    ));
  };


  return (
    <ModalContext.Provider value={{
      showMessage,
      showConfirm,
      showInput,
      modalState
    }}>
      {children}
      {modalState && (
        <GenericModal title={modalState.title} onCancel={() => closeModal(null)}>
          {modalState.renderBody({ close: closeModal })}
        </GenericModal>
      )}
    </ModalContext.Provider>
  );
};

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
