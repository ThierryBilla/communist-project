import React from 'react';
import styles from '../css/PrivateConversation.module.css';

const PrivateConversation = ({ conversation, onBack }) => {
    return (
        <div className={styles.conversationContainer}>
            <div className={styles.header}>
                <button onClick={onBack} className={styles.backButton}>Back</button>
                <img src="placeholder.jpg" alt="Profile" className={styles.profilePicture} />
                <span className={styles.userName}>{conversation.userName}</span>
            </div>
            <div className={styles.messagesContainer}>
                {conversation.messages.map((message, index) => (
                    <div key={index} className={`${styles.message} ${message.isSender ? styles.sent : styles.received}`}>
                        <span className={styles.messageText}>{message.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PrivateConversation;
