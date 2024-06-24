import React, { useState } from 'react';
import styles from '../css/AccountInfo.module.css';

const AccountInfo = () => {
    const [accountData, setAccountData] = useState({
        username: '',
        password: '',
        email: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccountData({
            ...accountData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Account data:', accountData);
    };

    return (
        <div className={styles.accountInfoContainer}>
            <h1>Account Info</h1>
            <form className={styles.accountForm} onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label>
                            Username:
                            <input 
                                type="text" 
                                name="username" 
                                value={accountData.username} 
                                onChange={handleChange} 
                            />
                        </label>
                    </div>
                </div>
                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label>
                            Password:
                            <input 
                                type="password" 
                                name="password" 
                                value={accountData.password} 
                                onChange={handleChange} 
                            />
                        </label>
                    </div>
                </div>
                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label>
                            Email:
                            <input 
                                type="email" 
                                name="email" 
                                value={accountData.email} 
                                onChange={handleChange} 
                            />
                        </label>
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <button type="submit">Update Account</button>
                </div>
            </form>
        </div>
    );
};

export default AccountInfo;
