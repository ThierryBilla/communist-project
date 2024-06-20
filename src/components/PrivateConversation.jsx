import React from 'react';
import styles from '../css/PrivateConversation.module.css';

const PrivateConversation = ({ message }) => {
    // Example message for testing
    const exampleMessage = {
        userName: "John Doe",
        content: "Hey there! How are you doing?",
        timestamp: "2024-06-12T08:00:00Z" // Add timestamp property if necessary
    };

    // Use the message if defined, otherwise use the example message
    const displayedMessage = message || exampleMessage;

    return (
        <div className={styles.conversationContainer}>
            <h3 className={styles.header}>Conversation with {displayedMessage.userName}</h3>
            <div className={styles.messagesContainer}>
                <div className={`${styles.message} ${styles.received}`}>
                    <p className={styles.messageText}>{displayedMessage.content}</p>
                    {displayedMessage.timestamp && <span className={styles.timestamp}>{displayedMessage.timestamp}</span>}
                </div>
                {/* Example of a sent message */}
                <div className={`${styles.message} ${styles.sent}`}>
                    <p className={styles.messageText}>I'm doing great, thanks! How about you?</p>
                </div>
            </div>
        </div>
    );
};

export default PrivateConversation;
