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
      <div
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && close(true)}
      >
        <div
          style={{
            maxHeight: "60vh",
            overflowY: "auto",
            paddingRight: "8px",
          }}
        >
          <p>
            {message.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
        </div>

        <div className="modal-button-container">
          <button
            autoFocus
            className="modal-button"
            onClick={(e) => {
              e.stopPropagation();
              requestAnimationFrame(() => close(true));
            }}
          >
            OK
          </button>
        </div>
      </div>
    ));
  };

  const showConfirm = (title, message) => {
    return showModal(title, ({ close }) => (
      <div>
        <p>{message}</p>
        <div className="modal-button-container">
          <button
            className="modal-button"
            onClick={(e) => {
              e.stopPropagation();
              requestAnimationFrame(() => close("YES"));
            }}
          >
            Yes
          </button>
          <button
            className="modal-button"
            onClick={(e) => {
              e.stopPropagation();
              requestAnimationFrame(() => close("NO"));
            }}
          >
            No
          </button>
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
          <button
            className="modal-button"
            onClick={(e) => {
              e.stopPropagation();
              requestAnimationFrame(() => close(inputValue));
            }}
          >
            OK
          </button>
          <button
            className="modal-button"
            onClick={(e) => {
              e.stopPropagation();
              requestAnimationFrame(() => close(null));
            }}
          >
            Cancel
          </button>
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
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="modal-button-container">
          <button
            className="modal-button"
            onClick={(e) => {
              e.stopPropagation();
              requestAnimationFrame(() => close(selectValue));
            }}
          >
            OK
          </button>
          <button
            className="modal-button"
            onClick={(e) => {
              e.stopPropagation();
              requestAnimationFrame(() => close(null));
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  const showSelect2 = (
    title,
    labelOptions1,
    options1,
    default1,
    labelOptions2,
    options2,
    default2
  ) => {
    if (options1.length === 0 || options2.length === 0) {
      return Promise.resolve(null);
    }

    const safeIndex1 =
      default1 >= 0 && default1 < options1.length ? default1 : 0;

    const safeIndex2 =
      default2 >= 0 && default2 < options2.length ? default2 : 0;

    let selectValue1 = options1[safeIndex1];
    let selectValue2 = options2[safeIndex2];

    return showModal(title, ({ close }) => (
      <div>
        <p>{labelOptions1}</p>
        <select
          className="modal-select"
          autoFocus
          defaultValue={options1[safeIndex1]}
          onChange={(e) => (selectValue1 = e.target.value)}
        >
          {options1.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        <p>{labelOptions2}</p>
        <select
          className="modal-select"
          defaultValue={options2[safeIndex2]}
          onChange={(e) => (selectValue2 = e.target.value)}
        >
          {options2.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        <div className="modal-button-container">
          <button
            className="modal-button"
            onClick={(e) => {
              e.stopPropagation();
              requestAnimationFrame(() =>
                close([selectValue1, selectValue2])
              );
            }}
          >
            OK
          </button>

          <button
            className="modal-button"
            onClick={(e) => {
              e.stopPropagation();
              requestAnimationFrame(() => close(null));
            }}
          >
            Cancel
          </button>
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
      showSelect2,
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
