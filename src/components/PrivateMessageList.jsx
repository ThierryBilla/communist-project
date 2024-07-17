import React, { useState, useEffect, useContext } from 'react';
import { FaCaretLeft } from 'react-icons/fa6';
import styles from '../css/PrivateMessageList.module.css';
import PrivateConversation from './PrivateConversation';
import { AuthContext } from '../contexts/AuthContext';

const PrivateMessageList = ({ selectedMessage, togglePrivateMessages, setSelectedMessage, userId, isFromSwiperCard }) => {
    const { token } = useContext(AuthContext);
    const [selectedMessageState, setSelectedMessageState] = useState(selectedMessage);
    const [showConversation, setShowConversation] = useState(false);
    const [messages, setMessages] = useState([]);
    const [conversation, setConversation] = useState([]);

    useEffect(() => {
        setSelectedMessageState(selectedMessage);
        if (userId) {
            fetchMessages(userId);
        }
    }, [selectedMessage, userId]);

    const fetchMessages = async (userId) => {
        try {
            console.log(`Fetching messages for user ID: ${userId}`); // Log the userId
            const response = await fetch(`https://communistdate-0f582f5caf12.herokuapp.com/chat/spyChat/${userId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log('Response status:', response.status); // Log response status
            if (response.ok) {
                const data = await response.json();
                setMessages(data);
                console.log('Fetched messages:', data); // Log the JSON object to understand its structure
            } else {
                console.error('Failed to fetch messages:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const fetchConversation = async (profileId, otherUserId) => {
        try {
            console.log(`Fetching conversation between user ID: ${profileId} and ${otherUserId}`); // Log the userId
            const response = await fetch(`https://communistdate-0f582f5caf12.herokuapp.com/chat/spyHistory/${profileId}&${otherUserId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log('Response status:', response.status); // Log response status
            if (response.ok) {
                const data = await response.json();
                setConversation(data);
                console.log('Fetched conversation:', data); // Log the JSON object to understand its structure
            } else {
                console.error('Failed to fetch conversation:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching conversation:', error);
        }
    };

    const handleSelectMessage = (chats, otherUserId) => {
        fetchConversation(userId, otherUserId); // Fetch conversation when a message is selected
        setSelectedMessage(chats);
        setSelectedMessageState(chats);
        setShowConversation(true);
        console.log('Selected message:', chats); // Log selected message to verify its content
    };

    const handleBackToMessages = () => {
        setShowConversation(false);
    };

    return (
        <div className={styles.privateMessageList}>
            {showConversation ? (
                <PrivateConversation
                    conversation={conversation}
                    onBack={handleBackToMessages}
                    isFromSwiperCard={isFromSwiperCard}
                />
            ) : (
                <>
                    <div className={styles.headerContainer}>
                        <button className={styles.backButton} onClick={() => togglePrivateMessages(null)}>
                            <FaCaretLeft className={styles.arrow} />
                        </button>
                        <h3 className={styles.header}>Private Messages</h3>
                    </div>
                    <ul className={styles.messageList}>
                        {messages.length > 0 ? (
                            messages.map((messageGroup, index) => (
                                <li
                                    key={index}
                                    className={styles.messageItem}
                                    onClick={() => handleSelectMessage(messageGroup.chats, messageGroup.user.id)}
                                >
                                    <img src={messageGroup.user.profilePicture} alt={messageGroup.user.username} className={styles.profileImage} />
                                    <div className={styles.messageInfo}>
                                        <div className={styles.sender}>{messageGroup.user.username}</div>
                                        <div className={styles.preview}>Click to view conversation</div>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p>No messages found</p>
                        )}
                    </ul>
                </>
            )}
        </div>
    );
};

export default PrivateMessageList;
