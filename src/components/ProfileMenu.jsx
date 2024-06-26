import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from '../css/ProfileMenu.module.css';

const ProfileMenu = ({ onSelect }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const menuItems = [
    { id: 'profile', label: 'My Profile' },
    { id: 'myblogs', label: 'My Blogs' },
    { id: 'accountinfo', label: 'Account Info' },
    { id: 'profileinfo', label: 'Profile Info' },
    { id: 'searchpref', label: 'Search Preferences' },
    { id: 'signout', label: 'Sign out' },
    { id: 'deleteaccount', label: 'Delete Account', isDelete: true }
  ];

  const handleClick = (option) => {
    if (option === 'signout') {
      handleLogout();
    } else {
      onSelect(option);
    }
  };

  return (
    <div className={styles.profileMenu}>
      <h2>Account Settings</h2>
      <ul className={styles.menuList}>
        {menuItems.map(item => (
          <li key={item.id} className={`${styles.menuItem} ${item.isDelete ? styles.delete : ''}`}>
            <div className={styles.label} onClick={() => handleClick(item.id)}>{item.label}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileMenu;
