import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { useAuth } from '../contexts/AuthContext';
import styles from '../css/Signin.module.css';
import Navbar from './Navbar';

const Signin = () => {
  const navigate = useNavigate(); // Get the navigate function from react-router-dom
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    showPassword: false
  });

  const [errorMessage, setErrorMessage] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = formData;

    try {
      console.log('Sending login request with:', { username, password });

      const response = await fetch('https://communistdate-0f582f5caf12.herokuapp.com/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const text = await response.text(); // Read the response as text

      console.log('Server response status:', response.status);
      console.log('Server response text:', text);

      if (response.ok) {
        const data = text ? JSON.parse(text) : {};
        console.log('Login successful:', data);

        if (data.user && data.token) {
          login(data.user, data.token); // Store user and token in context
          navigate('/dating'); // Redirect to the 'Dating' page upon successful login
        } else {
          console.error('Invalid login response:', data);
          setErrorMessage('Invalid login response from server.');
        }
      } else {
        const errorData = text ? JSON.parse(text) : {};
        console.error('Login failed:', errorData);
        if (response.status === 401) {
          setErrorMessage('Incorrect username or password.');
        } else {
          setErrorMessage(errorData.message || 'Login failed');
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Network error or server is not responding');
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.signinContainer}>
        <div className={styles.overlay}></div>
        <form className={styles.signinForm} onSubmit={handleSubmit}>
          <h2>Login</h2>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
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
          <p className={styles.registerPrompt}>
            Don't have an account? <a href="/Signup">Register now</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
