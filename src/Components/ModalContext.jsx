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

  const showInput = (title, message, defaultValue, isPassword = false) => {
    let inputValue = defaultValue;

    return showModal(title, ({ close }) => (
      <div>
        <p>{message}</p>
        <input
          className="modal-input"
          type={isPassword ? "password" : "text"}
          autoFocus
          defaultValue={defaultValue}
          onChange={(e) => (inputValue = e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
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

  const showSelect = (title, message, options, defaultIndex = 0) => {
    if (options.length === 0) {
      return Promise.resolve(null);
    }
    const safeIndex = (defaultIndex >= 0 && defaultIndex < options.length)
      ? defaultIndex
      : 0;
    let selectValue = options[safeIndex];

    return showModal(title, ({ close }) => (
      <div>
        <p>{message}</p>
        <select
          className="modal-select"
          autoFocus
          defaultValue={options[safeIndex]}
          onChange={(e) => (selectValue = e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              close(selectValue);
            }
          }}
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="modal-button-container">
          <button className="modal-button" onClick={() => close(selectValue)}>OK</button>
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
      showSelect,
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
