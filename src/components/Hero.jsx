import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/Hero.module.css';
import communistHeroImage from '../assets/picture/communist-hero.jpg';
import getstarted from '../assets/picture/logo-getstarted.png';

const Hero = () => {
    const navigate = useNavigate();

    const handleGetStartedClick = () => {
        navigate('/signin');
    };

    return (
        <div className={styles.hero}>
            <img src={communistHeroImage} alt="Hero Image" className={styles['hero-image']} />
            <div className={styles.overlay}></div>
            <div className={styles['content-container']}>
                <h1 className={styles['hero-title']}>Ready to Spread Revolutionary Love and Fill Europe's Nurseries?</h1>
                <button className={styles['get-started-button']} onClick={handleGetStartedClick}>
                    <img src={getstarted} alt="Get Started" className={styles['get-started-image']} />
                </button>
            </div>
        </div>
    );
}

export default Hero;
