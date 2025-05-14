import './MessageBox.css';
import PropTypes from 'prop-types';

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

MessageBox.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default MessageBox;
