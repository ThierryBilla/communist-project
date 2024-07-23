import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/Navbar.module.css'; // Importez le fichier CSS module
import { AuthContext } from '../contexts/AuthContext'; // Assurez-vous que le chemin est correct
import prolologo from '../assets/picture/prolo-passion-logo.png';

const Navbar = () => {
    const { user, token } = useContext(AuthContext);
    const [menuActive, setMenuActive] = useState(false);
    const [username, setUsername] = useState(null);

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

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
                        setUsername(data.User.username);
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

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                {/* Lien vers la page d'accueil quand on clique sur le logo */}
                <Link to="/">
                    <img src={prolologo} alt="Prolo Passion Logo" className={styles['logo-image']} />
                </Link>
            </div>
            <div className={`${styles['nav-links']} ${menuActive ? styles['menu-active'] : ''}`}>
                {/* Lien vers la page "About our leader Pietro" */}
                <Link to="/about" className={styles['nav-link']}>About our leader Pietro</Link>
                {/* Lien vers la page "Dating" si l'utilisateur est connecté */}
                {user && (
                    <Link to="/dating" className={styles['nav-link']}>Prole Maker</Link>
                )}
                {/* Condition pour afficher le username ou "Sign in" */}
                {user ? (
                    <Link to="/myaccount" className={styles['nav-link']}>{username ? username : 'Loading...'}</Link>
                ) : (
                    <Link to="/signin" className={styles['nav-link']}>Sign in</Link>
                )}
            </div>
            <div className={styles['menu-burger']} onClick={toggleMenu}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </nav>
    );
}

export default Navbar;
