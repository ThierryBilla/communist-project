import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/Navbar.module.css'; // Importez le fichier CSS module

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                {/* Placeholder de couleur jaune pour le logo */}
                <div className={styles['logo-placeholder']}></div>
            </div>
            <div className={styles['nav-links']}>
                {/* Lien vers la page "About our leader Pietro" */}
                <Link to="/about" className={styles['nav-link']}>About our leader Pietro</Link>
                {/* Lien pour la connexion */}
                <Link to="/signin" className={styles['nav-link']}>Sign in</Link>
            </div>
        </nav>
    );
}

export default Navbar;
