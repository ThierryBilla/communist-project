import React from 'react';
import footerbanner from '../assets/picture/footer-banner.jpg';
import styles from '../css/Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.imageContainer}>
        <img src={footerbanner} alt="Footer Banner" className={styles.footerImage} />
        <div className={styles.quoteContainer}>
          "Capitalists may have wealth, but they'll never find true love!"
        </div>
        <div className={styles.linksContainer}>
          <a href="/about" className={styles.footerLink}>About</a>
          <a href="/contact" className={styles.footerLink}>Contact</a>
        </div>
        <div className={styles.copyrightContainer}>
          &copy; 2024 Proletarian Passion - All rights reserved
        </div>
      </div>
    </div>
  );
}

export default Footer;
