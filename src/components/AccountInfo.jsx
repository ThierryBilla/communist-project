import React, { useState, useEffect } from 'react';
import styles from '../css/AccountInfo.module.css';
import { useAuth } from '../contexts/AuthContext';

const AccountInfo = () => {
    const { token, logout } = useAuth();
    const [userId, setUserId] = useState(null);
    const [accountData, setAccountData] = useState({
        username: '',
        password: '',
        email: '',
        newPassword: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserId = async () => {
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
                        console.log('Fetched profile data:', data);

                        if (data && data.User && data.User.id) {
                            setUserId(data.User.id);
                        }
                    } else {
                        console.error('Failed to fetch profile data', await response.text());
                    }
                } catch (error) {
                    console.error('Error fetching user ID:', error);
                }
            }
        };

        fetchUserId();
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccountData({
            ...accountData,
            [name]: value
        });
    };

    const validateNewPassword = (password) => {
        const minLength = 5;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);

        return password.length >= minLength && hasUpperCase && hasNumber;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!accountData.password) {
            setError('Current password is required for any update.');
            return;
        }

        if (accountData.newPassword && !validateNewPassword(accountData.newPassword)) {
            setError('New password must be at least 5 characters long, contain at least one uppercase letter and one number.');
            return;
        }

        const updateData = {
            newUsername: accountData.username || '',
            email: accountData.email || '',
            password: accountData.password,
            newPassword: accountData.newPassword || ''
        };

        console.log('Update data being sent:', updateData);

        try {
            const response = await fetch(`https://communistdate-0f582f5caf12.herokuapp.com/users/${userId}/updateAccount`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(updateData)
            });

            if (response.ok) {
                console.log('Account data updated successfully');
                // Déconnexion automatique après la mise à jour réussie si le mot de passe ou le nom d'utilisateur est changé
                if (accountData.username || accountData.newPassword) {
                    logout();
                }
            } else {
                const errorText = await response.text();
                console.error('Failed to update account data', errorText);
                setError(errorText);
            }
        } catch (error) {
            console.error('Error updating account data:', error);
            setError('An error occurred while updating the account data.');
        }
    };

    return (
        <div className={styles.accountInfoContainer}>
            <h1 className={styles.title}>Account Info</h1>
            {error && <div className={styles.error}>{error}</div>}
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
                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label>
                            New Password:
                            <input 
                                type="password" 
                                name="newPassword" 
                                value={accountData.newPassword} 
                                onChange={handleChange} 
                            />
                        </label>
                    </div>
                </div>
                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label>
                            Password (current) to validate changes:
                            <input 
                                type="password" 
                                name="password" 
                                value={accountData.password} 
                                onChange={handleChange} 
                                required
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
