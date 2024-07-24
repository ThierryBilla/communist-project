import React, { useState, useEffect, useContext } from 'react';
import { useSwipeable } from 'react-swipeable';
import styles from '../css/SwiperCard.module.css';
import PrivateMessageList from './PrivateMessageList';
import MatchModal from './MatchModal';
import { AuthContext } from '../contexts/AuthContext';

const SwiperCard = () => {
    const { token } = useContext(AuthContext);
    const [profiles, setProfiles] = useState([]);
    const [index, setIndex] = useState(0);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [showPrivateMessages, setShowPrivateMessages] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [expandedTopic, setExpandedTopic] = useState(null);
    const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
    const [matchedUser, setMatchedUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isProfileLoading, setIsProfileLoading] = useState(false);

    useEffect(() => {
        fetchUserProfile();
        fetchRandomProfiles();
    }, []);

    const fetchUserProfile = async () => {
        if (token) {
            try {
                const response = await fetch('https://communistdate-0f582f5caf12.herokuapp.com/users/profile', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const userData = await response.json();
                    if (userData && userData.User && userData.User.id) {
                        setUserId(userData.User.id);
                    }
                } else {
                    console.error('Failed to fetch user profile:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        }
    };

    const fetchUserBlogs = async (userId) => {
        try {
            const response = await fetch(`https://communistdate-0f582f5caf12.herokuapp.com/posts/${userId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                console.error('Failed to fetch user blogs');
                return [];
            }
        } catch (error) {
            console.error('Error fetching user blogs:', error);
            return [];
        }
    };

    const fetchRandomProfiles = async () => {
        setIsProfileLoading(true);
        try {
            const response = await fetch('https://communistdate-0f582f5caf12.herokuapp.com/users/random', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                const blogs = await fetchUserBlogs(data.id);

                const newProfile = {
                    id: data.id,
                    name: data.username,
                    age: data.age,
                    partnerShare: data.partnerShare,
                    description: data.description || 'No biography available.',
                    location: `${data.city}, ${data.countryOfResidence}`,
                    politicalBelief: data.politicalBelief,
                    communismLevel: data.communismLevel,
                    profilePicture: data.profilePicture || 'placeholder.jpg',
                    topics: blogs,
                    liked: false
                };
                setProfiles([newProfile]);  // Replace the profiles array with the new profile
            } else {
                console.error('Failed to fetch profile');
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
        setIsProfileLoading(false);
    };

    const sendLike = async (likedUser) => {
        console.log(`Sending like: ${JSON.stringify(likedUser)}`);
        try {
            const response = await fetch('https://communistdate-0f582f5caf12.herokuapp.com/likes/choice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(likedUser)
            });

            if (response.ok) {
                console.log('Like sent successfully');
            } else {
                console.error('Failed to send like');
            }
        } catch (error) {
            console.error('Error sending like:', error);
        }
    };

    const checkForMatch = async () => {
        if (userId && token) {
            try {
                const response = await fetch(`https://communistdate-0f582f5caf12.herokuapp.com/likes/matches/${userId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const matchData = await response.json();
                    console.log('Match data:', matchData);
                    const matchedProfile = matchData.find(match => match.id === profiles[index].id);
                    console.log('Matched profile:', matchedProfile);
                    if (matchedProfile) {
                        setMatchedUser(matchedProfile);
                        console.log('Setting matched user:', matchedProfile.username);
                        setIsMatchModalOpen(true);
                    }
                } else {
                    console.error('Failed to fetch matches:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching matches:', error);
            }
        }
    };

    const handleSwiped = async (eventData) => {
        const direction = eventData.dir;
        const updatedProfiles = [...profiles];
        let likedUser;

        if (direction === 'Right') {
            setLiked(true);
            updatedProfiles[index].liked = true;
            likedUser = { likedUser: updatedProfiles[index].id, like: true };
            await sendLike(likedUser);
            await checkForMatch();
            setTimeout(() => {
                setLiked(false);
                moveToNextProfile();
            }, 500);
        } else if (direction === 'Left') {
            setDisliked(true);
            updatedProfiles[index].liked = false;
            likedUser = { likedUser: updatedProfiles[index].id, like: false };
            await sendLike(likedUser);
            setTimeout(() => {
                setDisliked(false);
                moveToNextProfile();
            }, 500);
        }

        setProfiles(updatedProfiles);
    };

    const moveToNextProfile = () => {
        setIsProfileLoading(true); // Hide the card before updating the profile
        setShowPrivateMessages(false);
        setSelectedMessage(null);
        setTimeout(async () => {
            setIndex(prevIndex => {
                const newIndex = (prevIndex + 1) % profiles.length;
                if (newIndex === 0) {
                    fetchRandomProfiles().then(() => setIsProfileLoading(false));
                } else {
                    setIsProfileLoading(false);
                }
                return newIndex;
            });
        }, 250); // Adjust the delay as needed
    };

    const togglePrivateMessages = (message = null) => {
        setSelectedMessage(message);
        setShowPrivateMessages(!showPrivateMessages);
    };

    const toggleExpandTopic = (id) => {
        setExpandedTopic(expandedTopic === id ? null : id);
    };

    const handlers = useSwipeable({
        onSwipedRight: handleSwiped,
        onSwipedLeft: handleSwiped,
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
    });

    const renderStars = (level) => {
        if (level === 0) {
            return <span className={styles.capitalist}>⚠️ Capitalist</span>;
        }
        return Array.from({ length: level }, (_, i) => <span key={i} className={styles.star}>⭐</span>);
    };

    const renderPartnerShare = (share) => {
        return share ? <span className={styles.partnerShare}>Share and Care</span> : <span className={styles.partnerShare}>Keep to Myself</span>;
    };

    return (
        <div className={styles.parentContainer}>
            <div className={styles.container} {...handlers}>
                {profiles.map((profile, i) => (
                    <div
                        key={i}
                        className={`${styles.card} ${liked && i === index ? styles.liked : ''} ${disliked && i === index ? styles.disliked : ''}`}
                        style={{ 
                            zIndex: profiles.length - i, 
                            opacity: i === index && !isProfileLoading ? 1 : 0, 
                            pointerEvents: i === index && !isProfileLoading ? 'auto' : 'none' 
                        }}
                    >
                        <div className={styles.imageContainer}>
                            <img src={profile.profilePicture} alt={`${profile.name}'s profile`} className={styles.image} />
                        </div>
                        <div className={`${styles.infoContainer} ${liked && i === index ? styles.swipedRight : ''} ${disliked && i === index ? styles.swipedLeft : ''}`}>
                            <h2 className={styles.name}>{profile.name}, <span className={styles.age}>{profile.age}</span></h2>
                            {showPrivateMessages && i === index ? (
                                <PrivateMessageList 
                                    selectedMessage={selectedMessage} 
                                    togglePrivateMessages={togglePrivateMessages} 
                                    setSelectedMessage={setSelectedMessage} 
                                    userId={profile.id} // Pass userId to fetch messages
                                />
                            ) : (
                                <div className={`${styles.scrollableInfo} ${styles.hideScrollbar}`}>
                                    <p className={styles.description}>{profile.description}</p>
                                    <p className={styles.location}><strong>Location:</strong> {profile.location}</p>
                                    <p className={styles.politicalBelief}><strong>Political Belief:</strong> {profile.politicalBelief}</p>
                                    <p className={styles.communismLevel}><strong>Communism Level:</strong> {renderStars(profile.communismLevel)}</p>
                                    <p className={styles.partnerShare}><strong>Partner Share:</strong> {renderPartnerShare(profile.partnerShare)}</p>
                                    <button className={styles.button} onClick={() => togglePrivateMessages(profile)}>Watch his private messages</button>
                                    <h3 className={styles.topicHeader}>{profile.name}'s blogs:</h3>
                                    <ul className={styles.blogList}>
                                        {profile.topics.map((topic, index) => (
                                            <li key={index} className={styles.blogItem}>
                                                <div className={styles.blogHeader} onClick={() => toggleExpandTopic(index)}>
                                                    <div className={styles.blogTitle}>{topic.title}</div>
                                                </div>
                                                {expandedTopic === index && (
                                                    <div className={styles.blogContent} dangerouslySetInnerHTML={{ __html: topic.content }}>
                                                    </div>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <MatchModal 
                isOpen={isMatchModalOpen} 
                onClose={() => setIsMatchModalOpen(false)} 
                matchedUser={matchedUser} 
                fetchNextProfile={moveToNextProfile} // Pass the function to fetch next profile
            />
        </div>
    );
};

export default SwiperCard;
