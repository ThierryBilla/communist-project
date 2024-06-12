import React, { useState } from 'react';
import styles from '../css/ChatTab.module.css';
import ChatBox from './ChatBox';

const ChatTab = ({ messages, onMessageClick }) => {
    const [activeChat, setActiveChat] = useState(null);

    // Données factices pour les messages
    const dummyMessages = [
        { id: 1, text: 'Message 1', sender: 'John Doe', preview: 'Lorem ipsum dolor sit amet...', fullMessages: ['Hi', 'How are you?', 'I am good'] },
        { id: 2, text: 'Message 2', sender: 'Jane Smith', preview: 'Sed do eiusmod tempor...', fullMessages: ['Hello', 'Whats up?', 'Nothing much'] },
        { id: 3, text: 'Message 3', sender: 'Alice Johnson', preview: 'Ut enim ad minim veniam...', fullMessages: ['Hey', 'Are you there?', 'Yes'] },
    ];

    const handleChatClick = (chat) => {
        setActiveChat(chat);
    };

    return (
        <div className={styles.tab}>
            {activeChat ? (
                <ChatBox chat={activeChat} onBack={() => setActiveChat(null)} />
            ) : (
                <ul className={styles.messageList}>
                    {dummyMessages.map(message => (
                        <li key={message.id} onClick={() => handleChatClick(message)} className={styles.messageItem}>
                            <div className={styles.imagePlaceholder}></div>
                            <div className={styles.messageInfo}>
                                <div className={styles.sender}>{message.sender}</div>
                                <div className={styles.preview}>{message.preview}</div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ChatTab;
