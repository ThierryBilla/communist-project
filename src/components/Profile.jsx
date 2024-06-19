import React from 'react';
import MyBlogs from './MyBlogs';
import AccountInfo from './AccountInfo';
import ProfileInfo from './ProfileInfo';
import SearchPref from './SearchPref';
import styles from '../css/Profile.module.css';

const Profile = ({ selectedOption }) => {
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
      content = (
        <div className={styles.profile}>
          <h1>My Profile</h1>
          <p>Profile details go here.</p>
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
