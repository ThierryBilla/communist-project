import React, { useState, useEffect, useContext } from 'react';
import styles from '../css/ChatTab.module.css';
import ChatBox from './ChatBox';
import { AuthContext } from '../contexts/AuthContext';

const ChatTab = ({ onMessageClick }) => {
    const [activeChat, setActiveChat] = useState(null);
    const [chats, setChats] = useState([]);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await fetch('https://communistdate-0f582f5caf12.herokuapp.com/chat/allPersonalChats', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Fetched chats:', data);

                    // Agréger les messages par utilisateur
                    const chatMap = new Map();

                    data.forEach(userChat => {
                        userChat.chats.forEach(chat => {
                            const sender = userChat.user.username;
                            if (!chatMap.has(sender)) {
                                chatMap.set(sender, {
                                    id: userChat.user.id,
                                    sender,
                                    fullMessages: []
                                });
                            }
                            if (chat.messages && Array.isArray(chat.messages)) {
                                chatMap.get(sender).fullMessages.push(...chat.messages);
                            }
                        });
                    });

                    // Convertir le Map en tableau et créer des aperçus
                    const formattedChats = Array.from(chatMap.values()).map(chat => ({
                        ...chat,
                        text: chat.fullMessages.length > 0 ? chat.fullMessages[0].text : 'No messages',
                        preview: chat.fullMessages.length > 0 ? chat.fullMessages[0].text.slice(0, 30) + '...' : 'No messages'
                    }));

                    console.log('Formatted chats:', formattedChats);
                    setChats(formattedChats);
                } else {
                    console.error('Failed to fetch chats:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching chats:', error);
            }
        };

        fetchChats();
    }, [token]);

    const handleChatClick = (chat) => {
        setActiveChat(chat);
    };

    return (
        <div className={styles.tab}>
            {activeChat ? (
                <ChatBox chat={activeChat} onBack={() => setActiveChat(null)} />
            ) : (
                <ul className={styles.messageList}>
                    {chats.length > 0 ? (
                        chats.map(chat => (
                            <li key={chat.id} onClick={() => handleChatClick(chat)} className={styles.messageItem}>
                                <div className={styles.imagePlaceholder}></div>
                                <div className={styles.messageInfo}>
                                    <div className={styles.sender}>{chat.sender}</div>
                                    <div className={styles.preview}>{chat.preview}</div>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li>Aucune conversation trouvée</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default ChatTab;
