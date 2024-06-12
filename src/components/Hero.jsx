import React from 'react';
import styles from '../css/Hero.module.css';
import communistHeroImage from '../assets/picture/communist-hero.jpg';

const Hero = () => {
    return (
        <div className={styles.hero}>
            <img src={communistHeroImage} alt="Hero Image" className={styles['hero-image']} />
            <div className={styles.overlay}></div> {/* Ajoutez l'overlay ici */}
            <div className={styles['button-container']}>
                <button className={styles['get-started-button']}>GET STARTED</button>
            </div>
        </div>
    );
}

export default Hero;
