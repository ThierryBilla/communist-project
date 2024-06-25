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

    useEffect(() => {
        fetchRandomProfiles(); // Adjusted to pre-fetch multiple profiles
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
                    id: data.id, // Ensure to include the user ID
                    name: data.username,
                    age: data.age,
                    description: data.biography || 'No biography available.',
                    location: `${data.city}, ${data.countryOfResidence}`,
                    liked: false // Initialize liked as false
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
            }, 500); // Match the animation duration
        } else if (direction === 'Left') {
            setDisliked(true);
            updatedProfiles[index].liked = false;
            likedUser = { likedUser: updatedProfiles[index].id, like: false };
            await sendLike(likedUser);
            setTimeout(() => {
                setDisliked(false);
                moveToNextProfile();
            }, 500); // Match the animation duration
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

    const handlers = useSwipeable({
        onSwipedRight: handleSwiped,
        onSwipedLeft: handleSwiped,
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
    });

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
                                    <p className={styles.description}>Description: {profile.description}</p>
                                    <p className={styles.location}>Location: {profile.location}</p>
                                    <button className={styles.button} onClick={() => togglePrivateMessages(profile)}>Watch his private messages</button>
                                    <h3 className={styles.topicHeader}>Topics</h3>
                                    <ul className={styles.topics}>
                                        <li className={styles.topic}>Topic 1: Lorem ipsum dolor sit amet</li>
                                        <li className={styles.topic}>Topic 2: Consectetur adipiscing elit</li>
                                        <li className={styles.topic}>Topic 3: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</li>
                                        <li className={styles.topic}>Topic 4: Excepteur sint occaecat cupidatat non proident</li>
                                        <li className={styles.topic}>Topic 5: Sunt in culpa qui officia deserunt mollit anim id est laborum</li>
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
