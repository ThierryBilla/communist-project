import React from 'react'
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import SwiperCard from '../components/SwiperCard';
import styles from '../css/Dating.module.css';

const Dating = () => {
    return (
        <div className={styles.datingPage}>
            <Navbar />
        <div className={styles.datingContainer}>
            <SideBar />
        <div className={styles.mainContent}>
            <SwiperCard />
            </div>
            </div>
            </div>
    );
};

export default Dating;