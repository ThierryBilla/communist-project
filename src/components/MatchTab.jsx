import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'; // Adjust the import path as needed
import styles from '../css/MatchTab.module.css';
import ChatBox from './ChatBox';

const MatchTab = ({ onBack }) => {
    const { token } = useContext(AuthContext);
    const [matches, setMatches] = useState([]);
    const [userId, setUserId] = useState(null);
    const [activeChat, setActiveChat] = useState(null); // State to handle active chat

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
        const fetchMatches = async () => {
            if (userId && token) {
                try {
                    console.log(`Fetching matches for user ID: ${userId} with token: ${token}`);
                    const response = await fetch(`https://communistdate-0f582f5caf12.herokuapp.com/likes/matches/${userId}`, {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (response.ok) {
                        const matchData = await response.json();
                        console.log('Raw match data:', matchData);
                        const formattedMatches = matchData.map(data => ({
                            id: data.id,
                            name: data.username,
                        }));
                        console.log('Formatted matches:', formattedMatches);
                        setMatches(formattedMatches);
                    } else {
                        console.error('Failed to fetch matches:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error fetching matches:', error);
                }
            } else {
                console.log(`User ID (${userId}) or token (${token}) is missing. Cannot fetch matches.`);
            }
        };

        if (userId && token) {
            fetchMatches();
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
            {activeChat ? (
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
            {matches.length === 0 && <div>No matches found.</div>}
        </div>
    );
};

export default MatchTab;
