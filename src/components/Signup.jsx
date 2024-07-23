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

    const [passwordError, setPasswordError] = useState(''); // State for password error

    const grades = [
        { grade: "Bourgeois Bypasser", value: 1 },
        { grade: "Pinkie Dabbler", value: 2 },
        { grade: "Marxist Muddler", value: 3 },
        { grade: "Bolshevik Buddy", value: 4 },
        { grade: "Red Revolutionist", value: 5 }
    ];

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const newValue = type === "range" ? parseInt(value) : value;

        let updatedData = {
            ...formData,
            [name]: newValue,
            showModal: value === "non communist"
        };

        // Capitalize first letter for specific fields
        if (name === 'city' || name === 'language' || name === 'countryOfResidence' || name === 'nationality') {
            updatedData[name] = capitalizeFirstLetter(newValue);
        }

        // Set communismLevel to "0" when politicalBelief is "non communist"
        if (name === "politicalBelief" && value === "non communist") {
            updatedData = {
                ...updatedData,
                communismLevel: "0"
            };
        }

        setFormData(updatedData);
    };

    const validatePassword = (password) => {
        const minLength = /.{5,}/;
        const hasUpperCase = /[A-Z]/;
        const hasNumber = /[0-9]/;

        if (!minLength.test(password)) {
            return "Le mot de passe doit contenir au moins 5 caractères.";
        }
        if (!hasUpperCase.test(password)) {
            return "Le mot de passe doit contenir au moins une majuscule.";
        }
        if (!hasNumber.test(password)) {
            return "Le mot de passe doit contenir au moins un chiffre.";
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate password
        const passwordError = validatePassword(formData.password);
        if (passwordError) {
            setPasswordError(passwordError);
            return;
        }

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
                            {passwordError && <p className={styles.error}>{passwordError}</p>}
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
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
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
