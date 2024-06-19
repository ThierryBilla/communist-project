import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import styles from '../css/SwiperCard.module.css';
import PrivateMessageList from './PrivateMessageList'; // Assurez-vous d'importer PrivateMessageList si nécessaire

const profiles = [
    { name: 'Vladimir', age: 30, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', location: 'Paris, France' },
    { name: 'Alex', age: 25, description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', location: 'Berlin, Germany' },
    // Ajoutez plus de profils ici
];

const SwiperCard = () => {
    const [index, setIndex] = useState(0);
    const [liked, setLiked] = useState(false); // État pour indiquer si la carte actuelle a été likée
    const [swipeDirection, setSwipeDirection] = useState(null); // État pour indiquer la direction du swipe actif
    const [showPrivateMessages, setShowPrivateMessages] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);

    const handleSwiped = (eventData) => {
        const direction = eventData.dir; // Direction du swipe ('Left' ou 'Right')

        if (direction === 'Right') {
            setLiked(true);
            setSwipeDirection('liked'); // Définir la direction du swipe actif
            setTimeout(() => {
                setIndex((prevIndex) => (prevIndex + 1) % profiles.length);
                setSwipeDirection(null); // Réinitialiser la direction du swipe actif
            }, 300); // Délai pour correspondre à la durée de la transition CSS
        }
    };

    const togglePrivateMessages = (message = null) => {
        setSelectedMessage(message);
        setShowPrivateMessages(!showPrivateMessages);
    };

    const handlers = useSwipeable({
        onSwipedRight: handleSwiped, // Utiliser seulement onSwipedRight pour le swipe à droite
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
    });

    const profile = profiles[index];

    const onAnimationEnd = () => {
        if (liked) {
            setLiked(false); // Réinitialiser l'état de like après avoir changé de carte
        }
    };

    return (
        <div className={styles.container} {...handlers}>
            <div className={`${styles.card} ${liked ? styles.liked : ''}`} onAnimationEnd={onAnimationEnd}>
                <div className={styles.imageContainer}>
                    <img src="placeholder.jpg" alt="Image de la personne" className={styles.image} />
                </div>
                <div className={`${styles.infoContainer} ${swipeDirection === 'liked' ? styles.swipedRight : ''}`}>
                    <h2 className={styles.name}>{profile.name}, <span className={styles.age}>{profile.age}</span></h2>
                    {showPrivateMessages ? (
                        <PrivateMessageList selectedMessage={selectedMessage} togglePrivateMessages={togglePrivateMessages} setSelectedMessage={setSelectedMessage} />
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
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SwiperCard;
