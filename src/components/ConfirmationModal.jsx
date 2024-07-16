import React from 'react';
import styles from '../css/ConfirmationModal.module.css';

const ConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Are you sure you want to delete your account and return to a capitalist world?</h2>
        <button className={styles.confirmButton} onClick={onConfirm}>Yes, take me to the capitalist chaos</button>
        <button className={styles.cancelButton} onClick={onCancel}>No, I want to stay loyal to our Leader Pietro</button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
