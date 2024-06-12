import React, { useState } from 'react';
import styles from '../css/Signin.module.css';

const Signin = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        showPassword: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleShowPassword = () => {
        setFormData({
            ...formData,
            showPassword: !formData.showPassword
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className={styles.signinContainer} >
            <div className={styles.overlay}></div>
            <form className={styles.signinForm} onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className={styles.formGroup}>
                    <label>
                        Username:
                        <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                    </label>
                    <label>
                        Password:
                        <input type={formData.showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} required />
                    </label>
                    <div className={styles.showPasswordContainer}>
                        <label>
                            <input type="checkbox" name="showPassword" checked={formData.showPassword} onChange={handleShowPassword} />
                            Show password
                        </label>
                    </div>
                </div>


                <button type="submit">Login</button>
                <p className={styles.registerPrompt}>Don't have an account? <a href="/Signup">Register now</a></p>
            </form>
        </div>
    );
};

export default Signin;
