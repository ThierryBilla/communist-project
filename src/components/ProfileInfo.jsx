import React, { useState, useEffect } from 'react';
import styles from '../css/ProfileInfo.module.css';
import { useAuth } from '../contexts/AuthContext';

const ProfileInfo = () => {
    const { token } = useAuth();
    const [profileData, setProfileData] = useState({
        profilePicture: '',
        description: '',
        gender: '',
        country: '',
        city: '',
        language: '',
        partnerShare: false,
        politicalBelief: '',
        communismLevel: '1'
    });
    const [userId, setUserId] = useState(null);

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
                        if (data && data.User && data.User.id) {
                            setUserId(data.User.id);
                        } else {
                            console.error('Invalid profile data structure:', data);
                        }
                    } else {
                        console.error('Failed to fetch profile data');
                    }
                } catch (error) {
                    console.error('Error fetching profile data:', error);
                }
            }
        };

        fetchProfileData();
    }, [token]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : type === 'range' ? parseInt(value) : value;

        let updatedData = {
            ...profileData,
            [name]: newValue
        };

        if (name === 'politicalBelief' && value === 'non communist') {
            updatedData = {
                ...updatedData,
                communismLevel: '0'
            };
        }

        setProfileData(updatedData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log('Profile data:', profileData);
        console.log('User ID:', userId);

        if (profileData.profilePicture && userId) {
            const formData = new FormData();
            formData.append('profilePicture', profileData.profilePicture);

            // Debugging FormData
            for (let pair of formData.entries()) {
                console.log(pair[0]+ ': ' + pair[1]); 
            }

            try {
                const response = await fetch(`https://communistdate-0f582f5caf12.herokuapp.com/users/${userId}/uploadProfilePicture`, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    body: formData
                });

                if (response.ok) {
                    const contentType = response.headers.get('content-type');
                    if (contentType && contentType.includes('application/json')) {
                        const data = await response.json();
                        console.log('Success:', data);
                    } else {
                        const textData = await response.text();
                        console.log('Response is not JSON:', textData);
                    }
                } else {
                    const errorText = await response.text();
                    console.error('Failed to upload profile picture:', errorText);
                }
            } catch (error) {
                console.error('Error uploading profile picture:', error);
            }
        } else {
            console.log('No profile picture selected or user ID not available');
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileData({ ...profileData, profilePicture: file });
        }
    };

    const grades = [
        { grade: "Bourgeois Bypasser", value: 1 },
        { grade: "Pinkie Dabbler", value: 2 },
        { grade: "Marxist Muddler", value: 3 },
        { grade: "Bolshevik Buddy", value: 4 },
        { grade: "Red Revolutionist", value: 5 }
    ];

    const shouldDisplaySlider = profileData.politicalBelief !== 'non communist' && profileData.politicalBelief !== '';

    return (
        <div className={styles.profileInfoContainer}>
            <h1>Profile Info</h1>
            <form className={styles.profileForm} onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label>
                            Profile Picture:
                            <input type="file" name="profilePicture" onChange={handleFileChange} />
                        </label>
                        {profileData.profilePicture && (
                            <img src={URL.createObjectURL(profileData.profilePicture)} alt="Profile" className={styles.profilePicture} />
                        )}
                    </div>
                    <div className={styles.formGroup}>
                        <label>
                            Description:
                            <textarea 
                                name="description" 
                                value={profileData.description} 
                                onChange={handleChange}
                                maxLength="250"
                                className={styles.textarea}
                            />
                        </label>
                    </div>
                </div>
                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label>
                            Gender:
                            <select name="gender" value={profileData.gender} onChange={handleChange}>
                                <option value="" disabled>Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </label>
                    </div>
                    <div className={styles.formGroup}>
                        <label>
                            Country:
                            <input type="text" name="country" value={profileData.country} onChange={handleChange} />
                        </label>
                    </div>
                </div>
                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label>
                            City:
                            <input type="text" name="city" value={profileData.city} onChange={handleChange} />
                        </label>
                    </div>
                    <div className={styles.formGroup}>
                        <label>
                            Language:
                            <input type="text" name="language" value={profileData.language} onChange={handleChange} />
                        </label>
                    </div>
                </div>
                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label>
                            Political Belief:
                            <select name="politicalBelief" value={profileData.politicalBelief} onChange={handleChange}>
                                <option value="" disabled>Select a belief</option>
                                <option value="non communist">Non communist</option>
                                <option value="communist">Communist</option>
                                <option value="eurocommunist">Eurocommunist</option>
                                <option value="socialist">Socialist</option>
                                <option value="revolutionary_syndicalist">Revolutionary Syndicalist</option>
                                <option value="anarchist">Anarchist</option>
                                <option value="marxist">Marxist</option>
                                <option value="leninist">Leninist</option>
                                <option value="maoist">Maoist</option>
                                <option value="stalinist">Stalinist</option>
                                <option value="trotskyist">Trotskyist</option>
                                <option value="castroist">Castroist</option>
                                <option value="guevarist">Guevarist</option>
                            </select>
                        </label>
                    </div>
                    <div className={styles.formGroup}>
                        <label>
                            Partner Share:
                            <select name="partnerShare" value={profileData.partnerShare} onChange={handleChange}>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </select>
                        </label>
                    </div>
                </div>
                {shouldDisplaySlider && (
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label>
                                Level of Communism:
                                <span className={styles.levelDisplay}>
                                    {grades[profileData.communismLevel - 1]?.grade || ""}
                                </span>
                                <input type="range" name="communismLevel" value={parseInt(profileData.communismLevel)} onChange={handleChange} min="1" max="5" />
                            </label>
                        </div>
                    </div>
                )}
                <div className={styles.buttonContainer}>
                    <button type="submit">Update Profile</button>
                </div>
            </form>
        </div>
    );
};

export default ProfileInfo;
