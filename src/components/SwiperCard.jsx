import React, { useState, useEffect, useContext } from 'react';
import { useSwipeable } from 'react-swipeable';
import styles from '../css/SwiperCard.module.css';
import PrivateMessageList from './PrivateMessageList';
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

    useEffect(() => {
        fetchRandomProfiles();
    }, []);

    const fetchRandomProfiles = async () => {
        try {
            const response = await fetch('https://communistdate-0f582f5caf12.herokuapp.com/users/random', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                const newProfile = {
                    id: data.id,
                    name: data.username,
                    age: data.age,
                    partnerShare: data.partnerShare,
                    description: data.biography || 'No biography available.',
                    location: `${data.city}, ${data.countryOfResidence}`,
                    politicalBelief: data.politicalBelief,
                    communismLevel: data.communismLevel,
                    topics: [
                        { id: 1, title: 'How I met our leader Pietro?', content: 'Content of Topic 1' },
                        { id: 2, title: 'Ive been converted to Stalinism', content: 'Content of Topic 2' },
                        { id: 3, title: 'Topic 3', content: 'Content of Topic 3' },
                        { id: 4, title: 'Topic 4', content: 'Content of Topic 4' },
                        { id: 5, title: 'Topic 5', content: 'Content of Topic 5' },
                        { id: 6, title: 'Topic 6', content: 'Content of Topic 6' }
                    ],
                    liked: false
                };
                setProfiles(prevProfiles => [...prevProfiles, newProfile]);
            } else {
                console.error('Failed to fetch profile');
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
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

            if (!response.ok) {
                console.error('Failed to send like');
            }
        } catch (error) {
            console.error('Error sending like:', error);
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
        setShowPrivateMessages(false);
        setSelectedMessage(null);
        setIndex(prevIndex => {
            const newIndex = (prevIndex + 1) % profiles.length;
            if (newIndex === profiles.length - 1) {
                fetchRandomProfiles();
            }
            return newIndex;
        });
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
            return <span className={styles.capitalist}>⚠️ capitalist</span>;
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
                        style={{ zIndex: profiles.length - i, opacity: i === index ? 1 : 0, pointerEvents: i === index ? 'auto' : 'none' }}
                    >
                        <div className={styles.imageContainer}>
                            <img src="placeholder.jpg" alt="image" className={styles.image} />
                        </div>
                        <div className={`${styles.infoContainer} ${liked && i === index ? styles.swipedRight : ''} ${disliked && i === index ? styles.swipedLeft : ''}`}>
                            <h2 className={styles.name}>{profile.name}, <span className={styles.age}>{profile.age}</span></h2>
                            {showPrivateMessages && i === index ? (
                                <PrivateMessageList 
                                    selectedMessage={selectedMessage} 
                                    togglePrivateMessages={togglePrivateMessages} 
                                    setSelectedMessage={setSelectedMessage} 
                                />
                            ) : (
                                <div className={`${styles.scrollableInfo} ${styles.hideScrollbar}`}>
                                    <p className={styles.description}>{profile.description}</p>
                                    <p className={styles.location}><strong>Location:</strong> {profile.location}</p>
                                    <p className={styles.politicalBelief}><strong>Political Belief:</strong> {profile.politicalBelief}</p>
                                    <p className={styles.communismLevel}><strong>Communism Level:</strong> {renderStars(profile.communismLevel)}</p>
                                    <p className={styles.partnerShare}><strong>Partner Share:</strong> {renderPartnerShare(profile.partnerShare)}</p>
                                    <button className={styles.button} onClick={() => togglePrivateMessages(profile)}>Watch his private messages</button>
                                    <h3 className={styles.topicHeader}>{profile.name}'s blogs   :</h3>
                                    <ul className={styles.blogList}>
                                        {profile.topics.map((topic, index) => (
                                            <li key={index} className={styles.blogItem}>
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
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SwiperCard;
