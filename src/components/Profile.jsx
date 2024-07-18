import React, { useEffect, useState } from 'react';
import MyBlogs from './MyBlogs';
import AccountInfo from './AccountInfo';
import ProfileInfo from './ProfileInfo';
import SearchPref from './SearchPref';
import { useAuth } from '../contexts/AuthContext';
import styles from '../css/Profile.module.css';

const Profile = ({ selectedOption }) => {
  const { token } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

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
            setProfileData(data.User);
          } else {
            console.error('Failed to fetch profile data');
          }
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      }
      setLoading(false);
    };

    fetchProfileData();
  }, [token]);

  let content = null;

  switch (selectedOption) {
    case 'myblogs':
      content = <MyBlogs />;
      break;
    case 'accountinfo':
      content = <AccountInfo />;
      break;
    case 'profileinfo':
      content = <ProfileInfo />;
      break;
    case 'searchpref':
      content = <SearchPref />;
      break;
    default:
      content = loading ? (
        <div className={styles.profileSummary}>
          <h1>My Profile</h1>
          <p>Loading profile data...</p>
        </div>
      ) : profileData ? (
        <div className={styles.profileSummary}>
          <h1>My Profile</h1>
          <div className={styles.profileDetails}>
            <img
              src={profileData.profilePicture || 'https://via.placeholder.com/750'}
              alt="Profile"
              className={styles.profilePicture}
            />
            <div className={styles.textDetails}>
              <p><strong className={styles.fieldName}>Username:</strong> {profileData.username}</p>
              <p><strong className={styles.fieldName}>Age:</strong> {profileData.age}</p>
              <p><strong className={styles.fieldName}>Description:</strong> {profileData.description || 'No description available'}</p>
              <p><strong className={styles.fieldName}>Gender:</strong> {profileData.gender}</p>
              <p><strong className={styles.fieldName}>Country:</strong> {profileData.countryOfResidence}</p>
              <p><strong className={styles.fieldName}>City:</strong> {profileData.city}</p>
              <p><strong className={styles.fieldName}>Language:</strong> {profileData.language}</p>
              <p><strong className={styles.fieldName}>Partner Share:</strong> {profileData.partnerShare ? 'Yes' : 'No'}</p>
              <p><strong className={styles.fieldName}>Political Belief:</strong> {profileData.politicalBelief}</p>
              <p><strong className={styles.fieldName}>Level of Communism:</strong> {profileData.communismLevel}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.profileSummary}>
          <h1>My Profile</h1>
          <p>Failed to load profile data</p>
        </div>
      );
      break;
  }

  return (
    <div className={styles.profile}>
      {content}
    </div>
  );
}

export default Profile;
