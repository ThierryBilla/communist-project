import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/Navbar.module.css'; // Importez le fichier CSS module
import { AuthContext } from '../contexts/AuthContext'; // Assurez-vous que le chemin est correct
import prolologo from '../assets/picture/prolo-passion-logo.png';

const Navbar = () => {
    const { user } = useContext(AuthContext);
    const [menuActive, setMenuActive] = useState(false);

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

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
                {/* Condition pour afficher "My Profile" ou "Sign in" */}
                {user ? (
                    <Link to="/myaccount" className={styles['nav-link']}>My Profile</Link>
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
