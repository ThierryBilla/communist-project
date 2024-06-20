import React, { useState } from 'react';
import styles from '../css/SearchPref.module.css';

const SearchPref = () => {
    const [searchData, setSearchData] = useState({
        ageRange: [20, 40],
        gender: '',
        politicalBelief: '',
        communismLevel: '1',
        country: '',
        city: '',
        language: '',
        partnerShare: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : type === 'range' ? parseInt(value) : value;

        let updatedData = {
            ...searchData,
            [name]: newValue
        };

        if (name === 'politicalBelief' && value === 'non communist') {
            updatedData = {
                ...updatedData,
                communismLevel: '0'
            };
        }

        setSearchData(updatedData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Search preferences:', searchData);
    };

    const grades = [
        { grade: "Bourgeois Bypasser", value: 1 },
        { grade: "Pinkie Dabbler", value: 2 },
        { grade: "Marxist Muddler", value: 3 },
        { grade: "Bolshevik Buddy", value: 4 },
        { grade: "Red Revolutionist", value: 5 }
    ];

    const shouldDisplaySlider = searchData.politicalBelief !== 'non communist' && searchData.politicalBelief !== '';

    return (
        <div className={styles.searchPrefContainer}>
            <h1>Search preference to find the commie of my dreams #love</h1>
            <form className={styles.searchForm} onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label>
                            Age Range:
                            <div className={styles.ageRange}>
                                <input type="number" name="ageMin" value={searchData.ageRange[0]} onChange={(e) => setSearchData({ ...searchData, ageRange: [parseInt(e.target.value), searchData.ageRange[1]] })} min="18" />
                                <span>-</span>
                                <input type="number" name="ageMax" value={searchData.ageRange[1]} onChange={(e) => setSearchData({ ...searchData, ageRange: [searchData.ageRange[0], parseInt(e.target.value)] })} max="100" />
                            </div>
                        </label>
                    </div>
                    <div className={styles.formGroup}>
                        <label>
                            Gender:
                            <select name="gender" value={searchData.gender} onChange={handleChange}>
                                <option value="" disabled>Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label>
                            Political Belief:
                            <select name="politicalBelief" value={searchData.politicalBelief} onChange={handleChange}>
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
                    {shouldDisplaySlider && (
                        <div className={styles.formGroup}>
                            <label>
                                Level of Communism:
                                <span className={styles.levelDisplay}>
                                    {grades[searchData.communismLevel - 1]?.grade || ""}
                                </span>
                                <input type="range" name="communismLevel" value={parseInt(searchData.communismLevel)} onChange={handleChange} min="1" max="5" />
                            </label>
                        </div>
                    )}
                </div>
                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label>
                            Country:
                            <input type="text" name="country" value={searchData.country} onChange={handleChange} />
                        </label>
                    </div>
                    <div className={styles.formGroup}>
                        <label>
                            City:
                            <input type="text" name="city" value={searchData.city} onChange={handleChange} />
                        </label>
                    </div>
                </div>
                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label>
                            Language:
                            <input type="text" name="language" value={searchData.language} onChange={handleChange} />
                        </label>
                    </div>
                    <div className={styles.formGroup}>
                        <label>
                            Partner Share:
                            <select name="partnerShare" value={searchData.partnerShare} onChange={handleChange}>
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
