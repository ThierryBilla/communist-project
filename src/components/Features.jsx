import React from 'react';
import styles from '../css/Features.module.css';
import snoopimg from '../assets/picture/snoop-phone-bw.png';
import shareimg from '../assets/picture/sharing-partner-bw.png';
import loveimg from  '../assets/picture/love-bw.png';

function Features() {
  return (
    <div className={styles.featuresContainer}>
      <div className={styles.features}>
        <h2>Our main features</h2>
        <div className={`${styles.feature} ${styles['feature-left']}`}>
          <div className={`${styles.placeholder} ${styles.loveimgPlaceholder}`}>
            <img src={loveimg} alt="Meet Fellow Comrades" />
          </div>
          <div className={styles.text}>
            <h3>Meet Fellow Comrades</h3>
            <p>Are you a Stalinist, North Korean Eurocommunist, and on the hunt for a Chinese Marxist or revolutionary syndicalist? Specify your political beliefs and level of communism (from Bourgeois Bypasser to Red Revolutionist), and let our platform do the rest. We match you based on your ideological stance, ensuring you find a true comrade who shares your fervent zeal and unwavering commitment to the cause. Connect with like-minded individuals passionate about socialism and communism. Why settle for bourgeois romance when you can have a revolutionary love story?</p>
          </div>
        </div>
        <div className={`${styles.feature} ${styles['feature-right']}`}>
          <div className={styles.text}>
            <h3>Snoop on Your Match's Private Messages</h3>
            <p>Why should secrets exist among comrades? Embrace the spirit of communal living and transparency by snooping on your match's private messages. In true Big Brother fashion, ensure that nothing is hidden and everything is shared for the collective good. It's not just about trust; it's about building a truly open and honest revolutionary community. After all, in the quest for equality, privacy is just another bourgeois construct!</p>
          </div>
          <div className={styles.placeholder}>
            <img src={snoopimg} alt="Snoop on your match's private messages" />
          </div>
        </div>
        <div className={`${styles.feature} ${styles['feature-left']}`}>
          <div className={`${styles.placeholder} ${styles.shareimg}`}>
            <img src={shareimg} alt="Share your partner" />
          </div>
          <div className={styles.text}>
            <h3>Share Your (Actual and/or Future) Partner</h3>
            <p>Why keep the revolutionary love all to yourself? In the spirit of true communism, share your partner with fellow comrades. Whether you're in search of a collective relationship or just want to spread the joy of revolutionary companionship, our platform allows you to connect and share. It's not just about finding love; it's about building a community where everyone can partake in the camaraderie. Remember, in a truly equal society, love and solidarity are for everyone!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
