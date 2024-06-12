// ChatBox.jsx

import React, { useState, useRef, useEffect } from 'react';
import styles from '../css/ChatBox.module.css';

const ChatBox = ({ chat, onBack }) => {
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState(chat.fullMessages);
    const messageListRef = useRef(null);

    useEffect(() => {
        // Scroll jusqu'au bas de la liste des messages à chaque mise à jour
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }, [chatMessages]);

    const handleSendMessage = () => {
        if (message.trim()) {
            setChatMessages([...chatMessages, message]);
            setMessage('');
        }
    };

    return (
        <div className={styles.chatBox}>
            <button className={styles.backButton} onClick={onBack}>Back</button>
            <div className={styles.messageListContainer} ref={messageListRef}>
                <div className={styles.messageList}>
                    {chatMessages.map((msg, index) => (
                        <div key={index} className={index % 2 === 0 ? styles.messageLeft : styles.messageRight}>
                            {msg}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.inputContainerWrapper}>
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className={styles.messageInput}
                        placeholder="Type a message"
                    />
                    <button onClick={handleSendMessage} className={styles.sendButton}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;
