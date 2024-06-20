// Dating.jsx

import React from 'react';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import SwiperCard from '../components/SwiperCard';
import styles from '../css/Dating.module.css';
import { useAuth } from '../contexts/AuthContext';

const Dating = () => {
  const { user } = useAuth();

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
