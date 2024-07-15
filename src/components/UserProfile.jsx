import React, { useState, useEffect, useContext } from 'react';
import styles from '../css/UserProfile.module.css';
import PrivateMessageList from './PrivateMessageList';
import { AuthContext } from '../contexts/AuthContext';

const UserProfile = ({ userId, onBack }) => {
    const { token } = useContext(AuthContext);
    const [userProfile, setUserProfile] = useState(null);
    const [showPrivateMessages, setShowPrivateMessages] = useState(false);
    const [expandedTopic, setExpandedTopic] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (token && userId) {
                try {
                    const response = await fetch(`https://communistdate-0f582f5caf12.herokuapp.com/users/profile/${userId}`, {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        // Hard-coded topics data
                        data.topics = [
                            { id: 1, title: 'How I met our leader Pietro?', content: 'Content of Topic 1' },
                            { id: 2, title: 'Ive been converted to Stalinism', content: 'Content of Topic 2' },
                            { id: 3, title: 'Topic 3', content: 'Content of Topic 3' },
                            { id: 4, title: 'Topic 4', content: 'Content of Topic 4' },
                            { id: 5, title: 'Topic 5', content: 'Content of Topic 5' },
                            { id: 6, title: 'Topic 6', content: 'Content of Topic 6' }
                        ];
                        setUserProfile(data);
                    } else {
                        console.error('Failed to fetch user profile');
                    }
                } catch (error) {
                    console.error('Error fetching user profile:', error);
                }
            }
        };

        fetchUserProfile();
    }, [userId, token]);

    const toggleExpandTopic = (id) => {
        setExpandedTopic(expandedTopic === id ? null : id);
    };

    if (!userProfile) {
        return <div>Loading...</div>;
    }

    const renderPartnerShare = (share) => {
        return share ? 'Share and Care' : 'Keep to Myself';
    };

    const handleShowPrivateMessages = () => {
        setShowPrivateMessages(true);
    };

    const handleBackToProfile = () => {
        setShowPrivateMessages(false);
    };

    return (
        <div className={styles.userProfile}>
            {!showPrivateMessages && (
                <button className={styles.backButton} onClick={onBack}>
                    <i className="fas fa-arrow-left"></i>
                </button>
            )}
            <div className={styles.scrollContainer}>
                {!showPrivateMessages && (
                    <div className={styles.profileImagePlaceholder}>
                        <img src={userProfile.profilePicture || "https://via.placeholder.com/300"} alt="Profile" />
                    </div>
                )}
                {showPrivateMessages ? (
                    <PrivateMessageList
                        selectedMessage={null}
                        togglePrivateMessages={handleBackToProfile}
                        setSelectedMessage={() => {}}
                    />
                ) : (
                    <div className={styles.profileInfo}>
                        <div className={styles.profileName}>
                            {userProfile.username}, {userProfile.age}
                        </div>
                        <div className={styles.profileDetails}>
                            <p>{userProfile.biography}</p>
                            <p><strong>Location:</strong> {userProfile.city}, {userProfile.countryOfResidence}</p>
                            <p><strong>Political Belief:</strong> {userProfile.politicalBelief}</p>
                            <p><strong>Communism Level:</strong> {userProfile.communismLevel}</p>
                            <p><strong>Partner Share:</strong> {renderPartnerShare(userProfile.partnerShare)}</p>
                            <button className={styles.button} onClick={handleShowPrivateMessages}>Watch his private messages</button>
                            <h3>{userProfile.username}'s blogs:</h3>
                            <ul>
                                {userProfile.topics.map((topic, index) => (
                                    <li key={index}>
                                        <div className={styles.blogHeader} onClick={() => toggleExpandTopic(index)}>
                                            <div className={styles.blogTitle}>{topic.title}</div>
                                        </div>
                                        {expandedTopic === index && (
                                            <div className={styles.blogContent}>
                                                {topic.content}
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
