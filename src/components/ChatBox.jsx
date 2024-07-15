import React, { useState, useRef, useEffect } from 'react';
import styles from '../css/ChatBox.module.css';
import UserProfile from './UserProfile';

const ChatBox = ({ chat, onBack }) => {
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [showUserProfile, setShowUserProfile] = useState(false);
    const messageListRef = useRef(null);
    const [userId, setUserId] = useState(null);
    const [initialLoad, setInitialLoad] = useState(true);
    const [autoScroll, setAutoScroll] = useState(false);
    const [showPickUpLines, setShowPickUpLines] = useState(false);
    const [showHelpButton, setShowHelpButton] = useState(false); // Initialize to false
    const [helpButtonClicked, setHelpButtonClicked] = useState(false); // Track help button click

    const pickUpLines = [
        "Are you ready to experience the dictatorship of my desires tonight?",
        "Let's be comrades with benefits. After all, sharing is caring, right?",
        "Are you a socialist utopia? Because I want to build a future with you.",
        "Are you a revolutionary? Because together we could overthrow the system... and maybe the mattress.",
        "Let's plan our next protest... right after we liberate that bottle of wine on my couch.",
        "Let's debate socialism and see if we can spark a revolution... of passion."
    ];

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await fetch('https://communistdate-0f582f5caf12.herokuapp.com/users/profile', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUserId(userData.User.id);
                    console.log('User data from profile endpoint:', userData);
                } else {
                    console.error('Failed to fetch user profile data');
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserId();
    }, []);

    useEffect(() => {
        const loadChatHistory = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await fetch(`https://communistdate-0f582f5caf12.herokuapp.com/chat/history/${chat.id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Data received from history:", data);

                if (Array.isArray(data)) {
                    setChatMessages(data);
                    if (data.length === 0 && !helpButtonClicked) {
                        setShowHelpButton(true);
                    } else {
                        setShowHelpButton(false);
                    }
                    if (initialLoad) {
                        if (messageListRef.current) {
                            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
                        }
                        setInitialLoad(false);
                    }
                } else {
                    setChatMessages([]);
                    if (!helpButtonClicked) {
                        setShowHelpButton(true);
                    }
                    console.log("No valid messages in the response:", data);
                }
            } catch (error) {
                console.error('Error loading chat history:', error);
            }
        };

        loadChatHistory();
        const intervalId = setInterval(loadChatHistory, 1000);
        return () => clearInterval(intervalId);
    }, [chat.id, initialLoad, helpButtonClicked]);

    useEffect(() => {
        if (messageListRef.current && autoScroll) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [chatMessages, autoScroll]);

    const scrollToBottom = () => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    };

    const handleSendMessage = async (selectedMessage) => {
        const messageToSend = selectedMessage || message;
        if (messageToSend.trim()) {
            try {
                const token = localStorage.getItem('authToken');
                const response = await fetch('https://communistdate-0f582f5caf12.herokuapp.com/chat/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        receiverId: chat.id,
                        content: messageToSend
                    })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const newMessage = {
                    content: messageToSend,
                    sender: { id: userId }
                };

                console.log("New message sent:", newMessage);

                setChatMessages(prevMessages => [...prevMessages, newMessage]);
                setMessage('');
                setAutoScroll(true);
                setShowPickUpLines(false); // Hide pick-up lines after sending a message
                setShowHelpButton(false); // Hide help button after sending a message
                setHelpButtonClicked(false); // Reset help button clicked state
                scrollToBottom();

                setTimeout(() => {
                    setAutoScroll(false);
                }, 1000);
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleProfileClick = () => {
        setShowUserProfile(true);
    };

    const handleBackFromProfile = () => {
        setShowUserProfile(false);
    };

    const handleShowPickUpLines = () => {
        setShowHelpButton(false);
        setShowPickUpLines(true);
        setHelpButtonClicked(true); // Set help button clicked state
    };

    if (showUserProfile) {
        return <UserProfile userId={chat.id} onBack={handleBackFromProfile} />;
    }

    return (
        <div className={styles.chatBox}>
            <div className={styles.header}>
                <button className={styles.backButton} onClick={onBack}>
                    <i className="fas fa-arrow-left"></i>
                </button>
                <div className={styles.chatUserInfo} onClick={handleProfileClick}>
                    <img src={chat.profilePicture || 'https://via.placeholder.com/50'} alt={chat.sender} className={styles.userImage} />
                    <div className={styles.userName}>{chat.sender}</div>
                </div>
            </div>
            <div className={styles.messageListContainer} ref={messageListRef}>
                <div className={styles.messageList}>
                    {chatMessages.map((msg, index) => {
                        const messageClass = msg.sender?.id === userId ? styles.messageRight : styles.messageLeft;
                        return (
                            <div key={index} className={messageClass}>
                                {msg.content}
                            </div>
                        );
                    })}
                </div>
            </div>
            {showHelpButton && chatMessages.length === 0 && (
                <div className={styles.helpButtonContainer}>
                    <button onClick={handleShowPickUpLines} className={styles.helpButton}>
                        I need the help from our Leader Pietro to make the first move!
                    </button>
                </div>
            )}
            {showPickUpLines && chatMessages.length === 0 && (
                <div className={styles.pickUpLines}>
                    {pickUpLines.map((line, index) => (
                        <button 
                            key={index} 
                            onClick={() => handleSendMessage(line)} 
                            className={styles.pickUpLineButton}
                        >
                            {line}
                        </button>
                    ))}
                </div>
            )}
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className={styles.messageInput}
                    placeholder="Type a message"
                />
                <button onClick={() => handleSendMessage()} className={styles.sendButton}>
                    <i className="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    );
};

export default ChatBox;