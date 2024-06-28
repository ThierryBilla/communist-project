import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import styles from '../css/Signup.module.css';
import Modal from '../components/Modal';
import Navbar from './Navbar';

const Signup = () => {
    const navigate = useNavigate(); // Get the navigate function from react-router-dom
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        nationality: '',
        countryOfResidence: '',
        city: '',
        age: '',
        language: '',
        communismLevel: '1', 
        politicalBelief: '',
        partnerShare: false,
        gender: ''
    });

    const grades = [
        { grade: "Bourgeois Bypasser", value: 1 },
        { grade: "Pinkie Dabbler", value: 2 },
        { grade: "Marxist Muddler", value: 3 },
        { grade: "Bolshevik Buddy", value: 4 },
        { grade: "Red Revolutionist", value: 5 }
    ];

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const newValue = type === "range" ? parseInt(value) : value;
        
        let updatedData = {
            ...formData,
            [name]: newValue,
            showModal: value === "non communist"
        };

        // Ajouter une condition pour définir communismLevel sur "0" lorsque politicalBelief est "non communist"
        if (name === "politicalBelief" && value === "non communist") {
            updatedData = {
                ...updatedData,
                communismLevel: "0"
            };
        }

        setFormData(updatedData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { showModal, ...dataToSend } = formData;
            console.log("Data being sent to server:", dataToSend);
            const response = await fetch('https://communistdate-0f582f5caf12.herokuapp.com/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });
            if (response.ok) {
                navigate('/Signin'); // Redirect to login
            } else {
                // Error message
            }
        } catch (error) {
            // Error management
        }
    };
    

    const handleCloseModal = () => {
        setFormData({
            ...formData,
            showModal: false
        });
    };

    const shouldDisplaySlider = formData.politicalBelief !== "non communist" && formData.politicalBelief !== "";

    return (
        <div>
            <Navbar /> {/* Add Navbar */}
        
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
                        Country of Residence:
                        <input type="text" name="countryOfResidence" value={formData.countryOfResidence} onChange={handleChange} required />
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
                        <select name="partnerShare" value={formData.partnerShare} onChange={handleChange}>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
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
                            <span className={styles.levelDisplay} style={{ color: '#C0463F' }}>
                                {grades[formData.communismLevel - 1]?.grade || ""}
                            </span>
                            <input type="range" name="communismLevel" value={parseInt(formData.communismLevel)} onChange={handleChange} min="0" max="5" />
                        </label>
                    </div>
                )}

                <button type="submit">Sign Up</button>
                <p className={styles.loginPrompt}>Do you have an account? <a href="/Signin">Login</a></p>
            </form>
            {formData.showModal && <Modal handleClose={handleCloseModal} message="Attention the big brother is watching you" />}
        </div>
        </div>
    );
};

export default Signup;
