import React, { useState, useRef, useEffect } from 'react';
import styles from '../css/ChatBox.module.css';

const ChatBox = ({ chat, onBack }) => {
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const messageListRef = useRef(null);
    const [userId, setUserId] = useState(null);
    const [initialLoad, setInitialLoad] = useState(true);
    const [autoScroll, setAutoScroll] = useState(false); // New state for auto scroll

    // Effect to fetch user ID from profile endpoint
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

    // Effect to load chat history and set interval for polling
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
                    // Scroll to bottom after initial load
                    if (initialLoad && messageListRef.current) {
                        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
                        setInitialLoad(false);
                    }
                } else {
                    setChatMessages([]);
                    console.log("No valid messages in the response:", data);
                }
            } catch (error) {
                console.error('Error loading chat history:', error);
            }
        };

        loadChatHistory();
        const intervalId = setInterval(loadChatHistory, 1000);
        return () => clearInterval(intervalId);
    }, [chat.id, initialLoad]);

    // Effect to scroll to bottom when new message arrives
    useEffect(() => {
        if (messageListRef.current && autoScroll) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [chatMessages, autoScroll]);

    // Function to scroll to the bottom of the message list
    const scrollToBottom = () => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    };

    // Function to handle sending a new message
    const handleSendMessage = async () => {
        if (message.trim()) {
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
                        content: message
                    })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const newMessage = {
                    content: message,
                    sender: { id: userId } // Ensure the sender object has an id property
                };

                console.log("New message sent:", newMessage);

                setChatMessages(prevMessages => [...prevMessages, newMessage]);
                setMessage('');
                setAutoScroll(true); // Enable auto scroll
                scrollToBottom();

                setTimeout(() => {
                    setAutoScroll(false); // Disable auto scroll after 1 second
                }, 1000);
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    // Function to handle sending message on Enter key press
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
                    {chatMessages.map((msg, index) => {
                        // Ensure msg.sender is defined and has an id property
                        const messageClass = msg.sender?.id === userId ? styles.messageRight : styles.messageLeft;

                        return (
                            <div key={index} className={messageClass}>
                                {msg.content}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
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
