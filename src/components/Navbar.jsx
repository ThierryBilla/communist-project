import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/Navbar.module.css'; // Importez le fichier CSS module
import { AuthContext } from '../contexts/AuthContext'; // Assurez-vous que le chemin est correct

const Navbar = () => {
    const { user } = useContext(AuthContext);

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                {/* Placeholder de couleur jaune pour le logo */}
                <div className={styles['logo-placeholder']}></div>
            </div>
            <div className={styles['nav-links']}>
                {/* Lien vers la page "About our leader Pietro" */}
                <Link to="/about" className={styles['nav-link']}>About our leader Pietro</Link>
                {/* Lien vers la page "Dating" si l'utilisateur est connecté */}
                {user && (
                    <Link to="/dating" className={styles['nav-link']}>Match Maker</Link>
                )}
                {/* Condition pour afficher "My Profile" ou "Sign in" */}
                {user ? (
                    <Link to="/myaccount" className={styles['nav-link']}>My Profile</Link>
                ) : (
                    <Link to="/signin" className={styles['nav-link']}>Sign in</Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
