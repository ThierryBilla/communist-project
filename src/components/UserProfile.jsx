import React, { useState, useEffect, useContext } from 'react';
import styles from '../css/UserProfile.module.css';
import PrivateMessageList from './PrivateMessageList';
import { AuthContext } from '../contexts/AuthContext';

const UserProfile = ({ userId, onBack }) => {
    const { token } = useContext(AuthContext);
    const [userProfile, setUserProfile] = useState(null);
    const [showPrivateMessages, setShowPrivateMessages] = useState(false);
    const [expandedTopic, setExpandedTopic] = useState(null);
    const [userBlogs, setUserBlogs] = useState([]);

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
                        setUserProfile(data);
                    } else {
                        console.error('Failed to fetch user profile');
                    }
                } catch (error) {
                    console.error('Error fetching user profile:', error);
                }
            }
        };

        const fetchUserBlogs = async () => {
            if (token && userId) {
                try {
                    const response = await fetch(`https://communistdate-0f582f5caf12.herokuapp.com/posts/${userId}`, {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setUserBlogs(data);
                    } else {
                        console.error('Failed to fetch user blogs');
                    }
                } catch (error) {
                    console.error('Error fetching user blogs:', error);
                }
            }
        };

        fetchUserProfile();
        fetchUserBlogs();
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
                        userId={userId}
                        isFromSwiperCard={false} // Indicate that the messages are not viewed from SwiperCard
                    />
                ) : (
                    <div className={styles.profileInfo}>
                        <div className={styles.profileName}>
                            {userProfile.username}, {userProfile.age}
                        </div>
                        <div className={styles.profileDetails}>
                            <p>{userProfile.description}</p>
                            <p><strong>Location:</strong> {userProfile.city}, {userProfile.countryOfResidence}</p>
                            <p><strong>Political Belief:</strong> {userProfile.politicalBelief}</p>
                            <p><strong>Communism Level:</strong> {userProfile.communismLevel}</p>
                            <p><strong>Partner Share:</strong> {renderPartnerShare(userProfile.partnerShare)}</p>
                            <button className={styles.button} onClick={handleShowPrivateMessages}>Watch his private messages</button>
                            <h3>{userProfile.username}'s blogs:</h3>
                            <ul>
                                {userBlogs.map((blog, index) => (
                                    <li key={index}>
                                        <div className={styles.blogHeader} onClick={() => toggleExpandTopic(index)}>
                                            <div className={styles.blogTitle}>{blog.title}</div>
                                        </div>
                                        {expandedTopic === index && (
                                            <div className={styles.blogContent} dangerouslySetInnerHTML={{ __html: blog.content }}></div>
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
