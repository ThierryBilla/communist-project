import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from '../css/ProfileMenu.module.css';
import ConfirmationModal from './ConfirmationModal';

const ProfileMenu = ({ onSelect }) => {
  const { logout, token } = useAuth();
  const navigate = useNavigate();
  const [profileId, setProfileId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (token) {
        try {
          const response = await fetch('https://communistdate-0f582f5caf12.herokuapp.com/users/profile', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (response.ok) {
            const data = await response.json();
            setProfileId(data.User.id);
          } else {
            console.error('Failed to fetch profile data', response.status);
          }
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      }
    };

    fetchProfileData();
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDeleteAccount = async () => {
    if (!profileId) {
      console.error('Profile ID is not available.');
      return;
    }

    try {
      const response = await fetch(`https://communistdate-0f582f5caf12.herokuapp.com/users/${profileId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        alert('Account deleted successfully.');
        handleLogout();
      } else {
        const errorData = await response.json();
        console.error('Failed to delete account', response.status, errorData);
        alert(`Failed to delete account: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('An error occurred while deleting your account.');
    }
  };

  const handleClick = (option) => {
    if (option === 'signout') {
      handleLogout();
    } else if (option === 'deleteaccount') {
      setShowModal(true);
    } else {
      onSelect(option);
    }
  };

  const handleConfirmDelete = () => {
    setShowModal(false);
    handleDeleteAccount();
  };

  const handleCancelDelete = () => {
    setShowModal(false);
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
      {showModal && (
        <ConfirmationModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default ProfileMenu;
