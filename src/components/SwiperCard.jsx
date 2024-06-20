import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import styles from '../css/SwiperCard.module.css';
import PrivateMessageList from './PrivateMessageList';

const profiles = [
    { name: 'Pietro', age: 30, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', location: 'Paris, France' },
    { name: 'Alex', age: 25, description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', location: 'Berlin, Germany' },
    // Add more profiles here
];

const SwiperCard = () => {
    const [index, setIndex] = useState(0);
    const [liked, setLiked] = useState(false);
    const [showPrivateMessages, setShowPrivateMessages] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);

    const handleSwiped = (eventData) => {
        const direction = eventData.dir;
        if (direction === 'Right') {
            setLiked(true);
            setTimeout(() => {
                setIndex((prevIndex) => (prevIndex + 1) % profiles.length);
                setShowPrivateMessages(false); // Reset to show basic info
                setSelectedMessage(null); // Reset selected message
                setLiked(false); // Reset liked state after animation
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
                        style={{ zIndex: profiles.length - i, opacity: i < index ? 0 : 1 }}
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
                                        <li className={styles.topic}>Topic 3: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</li>
                                        <li className={styles.topic}>Topic 3: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</li>
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
