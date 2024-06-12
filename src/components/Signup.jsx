import React, { useState } from 'react';
import styles from '../css/Signup.module.css';
import Modal from '../components/Modal';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        nationality: '',
        country: '',
        city: '',
        age: '',
        language: '',
        levelOfCommunism: 1,
        politicalBelief: '',
        shareSoulMate: 'yes',
        showModal: false,
        gender: '' // Ajout du champ pour le genre
    });

    const grades = [
        { grade: "Bourgeois Bypasser", value: 1 },
        { grade: "Pinkie Dabbler", value: 2 },
        { grade: "Marxist Muddler", value: 3 },
        { grade: "Bolshevik Buddy", value: 4 },
        { grade: "Red Revolutionist", value: 5 }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
            showModal: value === "non communist"
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    const handleCloseModal = () => {
        setFormData({
            ...formData,
            showModal: false
        });
    };

    const shouldDisplaySlider = formData.politicalBelief !== "non communist" && formData.politicalBelief !== "";

    return (
        <div className={styles.signupContainer}>
            <div className={styles.overlay}></div>
            <form className={styles.signupForm} onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <div className={styles.formGroup}>
                    <label>
                        Username:
                        <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </label>
                </div>
                <div className={styles.formGroup}>
                    <label>
                        Email:
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </label>
                    <label>
                        Nationality:
                        <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} required />
                    </label>
                </div>
                <div className={styles.formGroup}>
                    <label>
                        Country:
                        <input type="text" name="country" value={formData.country} onChange={handleChange} required />
                    </label>
                    <label>
                        City:
                        <input type="text" name="city" value={formData.city} onChange={handleChange} required />
                    </label>
                </div>
                <div className={styles.formGroup}>
                    <label>
                        Age:
                        <input type="number" name="age" value={formData.age} onChange={handleChange} required />
                    </label>
                    <label>
                        Language:
                        <input type="text" name="language" value={formData.language} onChange={handleChange} required />
                    </label>
                </div>
                <div className={styles.formGroup}>
  
    <label>
        Gender:
        <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="" disabled>Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
        </select>
    </label>
    <label>
        Do you want to share your (current or future) soul mate with other members?
        <select name="shareSoulMate" value={formData.shareSoulMate} onChange={handleChange}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
        </select>
    </label>
</div>
                <div className={styles.formGroup}>
                    <label>
                        Political Belief:
                        <select name="politicalBelief" value={formData.politicalBelief} onChange={handleChange}>
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
                            <span className={styles.levelDisplay} style={{ color: '#C0463F' }}>{grades[formData.levelOfCommunism - 1].grade}</span>
                            <input type="range" name="levelOfCommunism" value={formData.levelOfCommunism} onChange={handleChange} min="1" max="5" />
                        </label>
                    </div>
                )}


                <button type="submit">Sign Up</button>
                <p className={styles.loginPrompt}>Do you have an account? <a href="/Signin">Login</a></p>
            </form>
            {formData.showModal && <Modal handleClose={handleCloseModal} message="Attention the big brother is watching you" />}
        </div>
    );
};

export default Signup;
