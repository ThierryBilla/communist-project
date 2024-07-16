import React from 'react';
import styles from '../css/MatchModal.module.css';

const MatchModal = ({ isOpen, onClose, matchedUser }) => {
    if (!isOpen || !matchedUser) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2 className={styles.modalText}>It's a Match!</h2>
                <p className={styles.centeredText}>You have matched with {matchedUser.username}</p>
                <div className={styles.heartContainer}>
                    <svg viewBox="0 0 24 24" className={styles.heart}>
                        <defs>
                            <clipPath id="heartClip">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </clipPath>
                        </defs>
                        <image 
                            href={matchedUser.profilePicture} 
                            x="0" 
                            y="0" 
                            width="24" 
                            height="24" 
                            clipPath="url(#heartClip)"
                            preserveAspectRatio="xMidYMid slice"
                        />
                    </svg>
                </div>
                <button onClick={onClose} className={styles.closeButton}>Close</button>
            </div>
        </div>
    );
};

export default MatchModal;
