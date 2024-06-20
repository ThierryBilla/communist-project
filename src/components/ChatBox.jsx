import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import styles from '../css/ChatBox.module.css';

const ChatBox = ({ chat, onBack }) => {
    const { token } = useAuth();
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState(chat.fullMessages);
    const messageListRef = useRef(null);

    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [chatMessages]);

    const handleSendMessage = async () => {
        if (message.trim()) {
            try {
                const response = await fetch('https://communistdate-0f582f5caf12.herokuapp.com/chat/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        receiverId: chat.id,
                        content: message
                    })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                setChatMessages([...chatMessages, message]);
                setMessage('');
            } catch (error) {
                console.error('Erreur lors de l\'envoi du message:', error);
            }
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className={styles.chatBox}>
            <div className={styles.header}>
                <button className={styles.backButton} onClick={onBack}>
                    <i className="fas fa-arrow-left"></i>
                </button>
                <div className={styles.chatUserInfo}>
                    <div className={styles.userImagePlaceholder}></div>
                    <div className={styles.userName}>{chat.sender}</div>
                </div>
            </div>
            <div className={styles.messageListContainer} ref={messageListRef}>
                <div className={styles.messageList}>
                    {chatMessages.map((msg, index) => (
                        <div key={index} className={index % 2 === 0 ? styles.messageLeft : styles.messageRight}>
                            {msg}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className={styles.messageInput}
                    placeholder="Type a message"
                />
                <button onClick={handleSendMessage} className={styles.sendButton}>
                    <i className="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    );
};

export default ChatBox;
