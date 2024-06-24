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
    const [showPrivateMessages, setShowPrivateMessages] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);

    useEffect(() => {
        fetchRandomProfile();
    }, []);

    const fetchRandomProfile = async () => {
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
                    name: data.username,
                    age: data.age,
                    description: data.biography || 'No biography available.',
                    location: `${data.city}, ${data.countryOfResidence}`
                };
                setProfiles((prevProfiles) => [...prevProfiles, newProfile]);
            } else {
                console.error('Failed to fetch profile');
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const handleSwiped = async (eventData) => {
        const direction = eventData.dir;
        if (direction === 'Right') {
            setLiked(true);
            setTimeout(async () => {
                setLiked(false);
                setIndex((prevIndex) => (prevIndex + 1) % profiles.length);
                await fetchRandomProfile();
                setShowPrivateMessages(false); // Reset to show basic info
                setSelectedMessage(null); // Reset selected message
            }, 500); // Match the animation duration
        }
    };

    const togglePrivateMessages = (message = null) => {
        setSelectedMessage(message);
        setShowPrivateMessages(!showPrivateMessages);
    };

    const handlers = useSwipeable({
        onSwipedRight: handleSwiped,
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
    });

    return (
        <div className={styles.parentContainer}>
            <div className={styles.container} {...handlers}>
                {profiles.map((profile, i) => (
                    <div
                        key={i}
                        className={`${styles.card} ${liked && i === index ? styles.liked : ''}`}
                        style={{ zIndex: profiles.length - i, opacity: i === index ? 1 : 0, pointerEvents: i === index ? 'auto' : 'none' }}
                    >
                        <div className={styles.imageContainer}>
                            <img src="placeholder.jpg" alt="image" className={styles.image} />
                        </div>
                        <div className={`${styles.infoContainer} ${liked && i === index ? styles.swipedRight : ''}`}>
                            <h2 className={styles.name}>{profile.name}, <span className={styles.age}>{profile.age}</span></h2>
                            {showPrivateMessages && i === index ? (
                                <PrivateMessageList 
                                    selectedMessage={selectedMessage} 
                                    togglePrivateMessages={togglePrivateMessages} 
                                    setSelectedMessage={setSelectedMessage} 
                                />
                            ) : (
                                <div className={styles.scrollableInfo}>
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
