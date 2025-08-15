import './GenericModal.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const GenericModal = ({ title, children, onCancel }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCancel();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  return (
    <div className="modal">
      <div className="modal-content" role="dialog" aria-modal="true">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-button" onClick={onCancel}>×</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

GenericModal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default GenericModal;
