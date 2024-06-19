import React, { useState, useEffect } from 'react';
import styles from '../css/PrivateMessageList.module.css';
import PrivateConversation from './PrivateConversation';

const PrivateMessageList = ({ selectedMessage, togglePrivateMessages, setSelectedMessage }) => {
    const [selectedMessageState, setSelectedMessageState] = useState(selectedMessage);

    // Update selectedMessageState when selectedMessage prop changes
    useEffect(() => {
        setSelectedMessageState(selectedMessage);
    }, [selectedMessage]);

    const handleSelectMessage = (message) => {
        setSelectedMessage(message);
        setSelectedMessageState(message);
    };

    return (
        <div className={styles.privateMessageList}>
            <h3 className={styles.header}>Private Messages</h3>
            {!selectedMessageState && (
                <ul className={`${styles.messages} ${styles.scrollable}`}>
                    {Array.from({ length: 10 }, (_, index) => (
                        <li
                            key={index}
                            className={styles.message}
                            onClick={() => handleSelectMessage(`Message ${index + 1}`)}
                        >
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
            )}
            {selectedMessageState && <PrivateConversation message={selectedMessageState} />}
        </div>
    );
};

export default PrivateMessageList;
