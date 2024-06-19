import React from 'react';
import styles from '../css/PrivateConversation.module.css';

const PrivateConversation = ({ message }) => {
    // Données de test
    const exampleMessage = {
        userName: "John Doe",
        content: "Hey there! How are you doing?",
        timestamp: "2024-06-12T08:00:00Z" // Ajoutez une propriété timestamp si nécessaire
    };

    // Utilisez message s'il est défini, sinon utilisez les données de test
    const displayedMessage = message || exampleMessage;

    return (
        <div className={styles.privateConversation}>
            <h3 className={styles.header}>Conversation with {displayedMessage.userName}</h3>
            <div className={styles.messages}>
                <p>{displayedMessage.content}</p>
                {/* Ajoutez l'heure du message si disponible */}
                {displayedMessage.timestamp && <span className={styles.timestamp}>{displayedMessage.timestamp}</span>}
            </div>
        </div>
    );
};

export default PrivateConversation;
