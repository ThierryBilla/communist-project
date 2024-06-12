import React, { useState } from 'react';
import styles from '../css/SwiperCard.module.css';
import PrivateMessageList from './PrivateMessageList'; // Importez votre composant PrivateMessageList

const SwiperCard = () => {
    const [showPrivateMessages, setShowPrivateMessages] = useState(false);

    const togglePrivateMessages = () => {
        setShowPrivateMessages(!showPrivateMessages);
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.imageContainer}>
                    <img src="placeholder.jpg" alt="Image de la personne" className={styles.image} />
                </div>
                <div className={styles.infoContainer}>
                    <h2 className={styles.name}>Vladimir, <span className={styles.age}>30</span></h2>
                    {showPrivateMessages ? (
                        <PrivateMessageList />
                    ) : (
                        <div className={styles.scrollableInfo}>
                            <p className={styles.description}>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            <p className={styles.location}>Location: Paris, France</p>
                            <button className={styles.button} onClick={togglePrivateMessages}>Watch his private messages</button>
                            <h3 className={styles.topicHeader}>Topics</h3>
                            <ul className={styles.topics}>
                                <li className={styles.topic}>Topic 1: Lorem ipsum dolor sit amet</li>
                                <li className={styles.topic}>Topic 2: Consectetur adipiscing elit</li>
                                <li className={styles.topic}>Topic 3: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</li>
                                <li className={styles.topic}>Topic 4: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</li>
                                <li className={styles.topic}>Topic 5: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</li>
                                <li className={styles.topic}>Topic 6: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</li>                    
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SwiperCard;
