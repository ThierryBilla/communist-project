import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'; // Adjust the import path as needed
import styles from '../css/MatchTab.module.css';
import ChatBox from './ChatBox';

const MatchTab = ({ onBack }) => {
    const { token } = useContext(AuthContext);
    const [matches, setMatches] = useState([]);
    const [userId, setUserId] = useState(null);
    const [activeChat, setActiveChat] = useState(null); // State to handle active chat
    const [chats, setChats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (token) {
                try {
                    console.log('Fetching user profile...');
                    const response = await fetch('https://communistdate-0f582f5caf12.herokuapp.com/users/profile', {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (response.ok) {
                        const userData = await response.json();
                        console.log('User profile data:', userData);
                        if (userData && userData.User && userData.User.id) {
                            setUserId(userData.User.id);
                            console.log('User ID set to:', userData.User.id);
                        } else {
                            console.error('User ID not found in user profile data');
                        }
                    } else {
                        console.error('Failed to fetch user profile:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error fetching user profile:', error);
                }
            }
        };

        fetchUserProfile();
    }, [token]);

    useEffect(() => {
        const fetchData = async () => {
            if (userId && token) {
                try {
                    setIsLoading(true);

                    const [matchesResponse, chatsResponse] = await Promise.all([
                        fetch(`https://communistdate-0f582f5caf12.herokuapp.com/likes/matches/${userId}`, {
                            method: 'GET',
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }),
                        fetch('https://communistdate-0f582f5caf12.herokuapp.com/chat/allPersonalChats', {
                            method: 'GET',
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })
                    ]);

                    if (!matchesResponse.ok) {
                        throw new Error('Failed to fetch matches');
                    }

                    if (!chatsResponse.ok) {
                        throw new Error('Failed to fetch chats');
                    }

                    const matchData = await matchesResponse.json();
                    const chatData = await chatsResponse.json();

                    console.log('Raw match data:', matchData);
                    const formattedMatches = matchData.map(data => ({
                        id: data.id,
                        name: data.username,
                    }));
                    console.log('Formatted matches:', formattedMatches);

                    // Agréger les messages par utilisateur
                    const chatMap = new Map();

                    chatData.forEach(userChat => {
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

                    const filteredMatches = formattedMatches.filter(match => !formattedChats.some(chat => chat.id === match.id));
                    setMatches(filteredMatches);
                    setIsLoading(false);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setIsLoading(false);
                }
            }
        };

        if (userId && token) {
            fetchData();
        }
    }, [userId, token]);

    const handleMatchClick = (match) => {
        setActiveChat({
            id: match.id,
            sender: match.name,
        });
    };

    return (
        <div className={styles.tab}>
            {isLoading ? (
                <div>Loading...</div>
            ) : activeChat ? (
                <ChatBox chat={activeChat} onBack={() => setActiveChat(null)} />
            ) : (
                <ul className={styles.matchList}>
                    {matches.map(match => (
                        <li key={match.id} className={styles.matchItem} onClick={() => handleMatchClick(match)}>
                            <div className={styles.imagePlaceholder}></div>
                            <div className={styles.matchDetails}>
                                <div className={styles.matchName}>{match.name}</div>
                                <div className={styles.matchPreview}>Start a conversation</div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {!isLoading && matches.length === 0 && <div>No matches found.</div>}
        </div>
    );
};

export default MatchTab;
