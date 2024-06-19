import React, { useState } from 'react'; // Importer useState depuis React
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProfileMenu from '../components/ProfileMenu';
import Profile from '../components/Profile';

import styles from '../css/MyAccount.module.css';

const MyAccount = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('profile'); // Utiliser useState ici

  const handleMenuClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className={styles.myAccountPage}>
      <Navbar />
      <div className={styles.accountContainer}>
        <ProfileMenu onSelect={handleMenuClick} navigate={navigate} />
        <div className={styles.profileContent}>
          <Profile selectedOption={selectedOption} />
        </div>
      </div>
    </div>
  );
}

export default MyAccount;