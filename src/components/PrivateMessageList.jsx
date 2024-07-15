import React, { useState, useEffect } from 'react';
import { FaCaretLeft } from 'react-icons/fa6';
import styles from '../css/PrivateMessageList.module.css';
import PrivateConversation from './PrivateConversation';

const PrivateMessageList = ({ selectedMessage, togglePrivateMessages, setSelectedMessage }) => {
    const [selectedMessageState, setSelectedMessageState] = useState(selectedMessage);
    const [showConversation, setShowConversation] = useState(false);

    useEffect(() => {
        setSelectedMessageState(selectedMessage);
    }, [selectedMessage]);

    const handleSelectMessage = (message) => {
        setSelectedMessage(message);
        setSelectedMessageState(message);
        setShowConversation(true);
    };

    const handleBackToMessages = () => {
        setShowConversation(false);
    };

    return (
        <div className={styles.privateMessageList}>
            {showConversation ? (
                <PrivateConversation message={selectedMessageState} />
            ) : (
                <>
                    <div className={styles.headerContainer}>
                        <button className={styles.backButton} onClick={() => togglePrivateMessages(null)}>
                            <FaCaretLeft className={styles.arrow} />
                        </button>
                        <h3 className={styles.header}>Private Messages</h3>
                    </div>
                    <ul className={styles.messageList}>
                        {Array.from({ length: 10 }, (_, index) => (
                            <li
                                key={index}
                                className={styles.messageItem}
                                onClick={() => handleSelectMessage({
                                    userName: `User ${index + 1}`,
                                    content: `Message content ${index + 1}`,
                                    timestamp: new Date().toISOString(),
                                    profilePicture: `https://example.com/profile/${index + 1}.jpg`, // Add profile picture URL
                                })}
                            >
                                <img src={`https://example.com/profile/${index + 1}.jpg`} alt={`User ${index + 1}`} className={styles.profileImage} />
                                <div className={styles.messageInfo}>
                                    <div className={styles.sender}>User {index + 1}</div>
                                    <div className={styles.preview}>Preview of the last message...</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default PrivateMessageList;
