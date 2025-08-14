import './MessageBox.css';
import PropTypes from 'prop-types';
import React from 'react'

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
            <p>
              {message.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

MessageBox.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default MessageBox;
