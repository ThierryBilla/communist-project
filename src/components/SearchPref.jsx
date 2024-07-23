import React, { useState, useEffect } from 'react';
import styles from '../css/SearchPref.module.css';
import { useAuth } from '../contexts/AuthContext';

const SearchPref = () => {
    const [searchData, setSearchData] = useState({
        ageRange: [18, 99],
        gender: '',
        politicalBelief: '',
        partnerShare: ''
    });
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();

    useEffect(() => {
        const fetchPreferences = async () => {
            try {
                const response = await fetch('https://communistdate-0f582f5caf12.herokuapp.com/users/preferences', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setSearchData({
                        ageRange: [data.minAge ?? 25, data.maxAge ?? 35],
                        gender: data.gender ?? '',
                        politicalBelief: data.politicalBelief ?? '',
                        partnerShare: data.partnerShare ?? ''
                    });
                } else {
                    console.error('Failed to fetch preferences');
                }
            } catch (error) {
                console.error('Error fetching preferences:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPreferences();
    }, [token]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        
        setSearchData({
            ...searchData,
            [name]: newValue
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Inclure tous les champs même s'ils sont vides
        const preferences = {
            minAge: searchData.ageRange[0],
            maxAge: searchData.ageRange[1],
            politicalBelief: searchData.politicalBelief,
            gender: searchData.gender,
            partnerShare: searchData.partnerShare
        };

        console.log('Preferences to be sent:', preferences);

        try {
            const response = await fetch('https://communistdate-0f582f5caf12.herokuapp.com/users/preferences', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(preferences)
            });

            if (response.ok) {
                console.log('Preferences updated successfully');
            } else {
                console.error('Failed to update preferences');
            }
        } catch (error) {
            console.error('Error updating preferences:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.searchPrefContainer}>
            <h1>Search preference to find the commie of my dreams #love</h1>
            <form className={styles.searchForm} onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label>
                            Age Range:
                            <div className={styles.ageRange}>
                                <input 
                                    type="number" 
                                    name="ageMin" 
                                    value={searchData.ageRange[0] || ''} 
                                    onChange={(e) => setSearchData({ ...searchData, ageRange: [parseInt(e.target.value), searchData.ageRange[1]] })} 
                                    min="18" 
                                />
                                <span>-</span>
                                <input 
                                    type="number" 
                                    name="ageMax" 
                                    value={searchData.ageRange[1] || ''} 
                                    onChange={(e) => setSearchData({ ...searchData, ageRange: [searchData.ageRange[0], parseInt(e.target.value)] })} 
                                    max="100" 
                                />
                            </div>
                        </label>
                    </div>
                    <div className={styles.formGroup}>
                        <label>
                            Gender:
                            <select name="gender" value={searchData.gender || ''} onChange={handleChange}>
                                <option value="" disabled>Select</option>
                                <option value="">No preferences</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label>
                            Political Belief:
                            <select name="politicalBelief" value={searchData.politicalBelief || ''} onChange={handleChange}>
                                <option value="" disabled>Select a belief</option>
                                <option value="">No preferences</option>
                                <option value="Non Communist">Non communist</option>
                                <option value="Communist">Communist</option>
                                <option value="Eurocommunist">Eurocommunist</option>
                                <option value="Socialist">Socialist</option>
                                <option value="Mélanchonist">Mélanchonist</option>
                                <option value="Revolutionary Syndicalist">Revolutionary Syndicalist</option>
                                <option value="Anarchist">Anarchist</option>
                                <option value="Marxist">Marxist</option>
                                <option value="Leninist">Leninist</option>
                                <option value="Maoist">Maoist</option>
                                <option value="Stalinist">Stalinist</option>
                                <option value="Trotskyist">Trotskyist</option>
                                <option value="Castroist">Castroist</option>
                                <option value="Guevarist">Guevarist</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label>
                            Partner Share:
                            <select name="partnerShare" value={searchData.partnerShare !== '' ? searchData.partnerShare : ''} onChange={handleChange}>
                                <option value="">No preferences</option>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <button type="submit">Search</button>
                </div>
            </form>
        </div>
    );
};

export default SearchPref;
