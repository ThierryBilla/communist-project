// PrivateMessageList.jsx

import React from 'react';
import styles from '../css/PrivateMessageList.module.css';

const PrivateMessageList = () => {
    return (
        <div className={styles.privateMessageList}>
            <h3 className={styles.header}>Private Messages</h3>
            <ul className={`${styles.messages} ${styles.scrollable}`}>
                {Array.from({ length: 10 }, (_, index) => (
                    <li key={index} className={styles.message}>
                        <img src="placeholder.jpg" alt="Profile" className={styles.profilePicture} />
                        <div className={styles.messageContent}>
                            <div className={styles.userInfo}>
                                <span className={styles.userName}>User {index + 1}</span>
                            </div>
                            <span className={styles.messagePreview}>Preview of the last message...</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PrivateMessageList;