import React from 'react';
import './MessageBox.css';

const MessageBox = ({ title, message, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="message-box">
          <div className="message-box-header">
            <h2>{title}</h2>
            <button className="close-button" onClick={onClose}>×</button>
          </div>
          <div className="message-box-main">
            <p>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
