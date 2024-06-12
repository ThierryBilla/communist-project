import React from 'react';
import styles from '../css/Modal.module.css';

const Modal = ({ handleClose }) => {
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <p>Attention, our leader Pietro is watching you.</p>
                <button className={styles.closeButton} onClick={handleClose}>Okay, I understand that non-communists are not welcome here but I go on</button>
            </div>
        </div>
    );
};

export default Modal;
