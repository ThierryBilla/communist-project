import React, { useState } from 'react';
import flagimg from '../assets/picture/flag.jpg';
import styles from '../css/Contact.module.css';
import Navbar from '../components/Navbar';

import image1 from '../assets/captcha/1.png';
import image2 from '../assets/captcha/2.png';
import image3 from '../assets/captcha/3.png';
import image4 from '../assets/captcha/4.png';
import image5 from '../assets/captcha/5.png';
import image6 from '../assets/captcha/6.png';
import image7 from '../assets/captcha/7.png';
import image8 from '../assets/captcha/8.png';
import image9 from '../assets/captcha/9.png';
import image10 from '../assets/captcha/10.png';
import image11 from '../assets/captcha/11.png';
import image12 from '../assets/captcha/12.png';
import image13 from '../assets/captcha/13.png';
import image14 from '../assets/captcha/14.png';
import image15 from '../assets/captcha/15.png';
import image16 from '../assets/captcha/16.png';
import image17 from '../assets/captcha/17.png';
import image18 from '../assets/captcha/18.png';
import image19 from '../assets/captcha/19.png';
import image20 from '../assets/captcha/20.png';

const images = [
  image1, image2, image3, image4, image5,
  image6, image7, image8, image9, image10,
  image11, image12, image13, image14, image15,
  image16, image17, image18, image19, image20
];

// Indices des images de Karl Marx ajustés pour un tableau 0-indexé
const karlMarxImages = [4, 6, 12, 15, 18];  // Les indices des images de Karl Marx dans un tableau 0-indexé

const getRandomImages = () => {
  const images = [];
  while (images.length < 9) {
    const randomIndex = Math.floor(Math.random() * 20);
    if (!images.includes(randomIndex)) {
      images.push(randomIndex);
    }
  }
  return images;
};

const Contact = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isCaptchaChecked, setIsCaptchaChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [captchaImages, setCaptchaImages] = useState([]);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const handleCaptchaCheck = () => {
    setCaptchaImages(getRandomImages());
    setSelectedImages([]); // Réinitialiser les sélections
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleImageClick = (index) => {
    const newSelectedImages = [...selectedImages];
    if (newSelectedImages.includes(index)) {
      newSelectedImages.splice(newSelectedImages.indexOf(index), 1);
    } else {
      newSelectedImages.push(index);
    }
    setSelectedImages(newSelectedImages);
  };

  const handleSubmitCaptcha = () => {
    const correctKarlMarxImagesInCaptcha = captchaImages.filter(image => karlMarxImages.includes(image));
    const selectedKarlMarxImages = selectedImages.filter(image => correctKarlMarxImagesInCaptcha.includes(image));
    const allSelectedImagesCorrect = selectedImages.every(image => correctKarlMarxImagesInCaptcha.includes(image));

    const isCorrectSelection = allSelectedImagesCorrect &&
                               selectedKarlMarxImages.length === correctKarlMarxImagesInCaptcha.length &&
                               selectedKarlMarxImages.every(image => correctKarlMarxImagesInCaptcha.includes(image));

    console.log('Captcha Images:', captchaImages.map(i => i + 1));  // Afficher les indices 1-indexés des images captcha
    console.log('Selected Images:', selectedImages.map(i => i + 1));  // Afficher les indices 1-indexés des images sélectionnées
    console.log('Correct Karl Marx Images In Captcha:', correctKarlMarxImagesInCaptcha.map(i => i + 1));  // Afficher les indices 1-indexés des images de Karl Marx dans le captcha
    console.log('Selected Karl Marx Images:', selectedKarlMarxImages.map(i => i + 1));  // Afficher les indices 1-indexés des images de Karl Marx sélectionnées
    console.log('Is Correct Selection:', isCorrectSelection);

    if (isCorrectSelection) {
      setIsCaptchaChecked(true);
      setIsModalOpen(false);
    } else {
      alert('You selected the wrong images. Try again.');
      handleCaptchaCheck(); // Générer un nouveau captcha en cas d'erreur
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.imageSection}>
          <img src={flagimg} alt="Flag" className={styles.image} />
        </div>
        <div className={styles.formSection}>
          <h1>Contact our leader Pietro</h1>
          <div className={styles.tabs}>
            <button onClick={() => handleTabClick(0)} className={activeTab === 0 ? styles.activeTab : ''}>Personal Info</button>
            <button onClick={() => handleTabClick(1)} className={activeTab === 1 ? styles.activeTab : ''}>Message</button>
          </div>
          <form>
            {activeTab === 0 && (
              <>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Comrade Name <span className={styles.smallText}>(Alias acceptable if you're in hiding from capitalist oppressors)</span>:</label>
                  <input type="text" id="name" name="name" />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Secret Revolutionary Email <span className={styles.smallText}>(Don’t worry, we’ll keep it safe from the bourgeoisie)</span>:</label>
                  <input type="email" id="email" name="email" />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="politicalBeliefs">Political Beliefs:</label>
                  <select id="politicalBeliefs" name="politicalBeliefs">
                  <option value="" disabled>Select a belief</option>
                  <option value="non communist">Non communist</option>
                  <option value="communist">Communist</option>
                  <option value="eurocommunist">Eurocommunist</option>
                  <option value="socialist">Socialist</option>
                  <option value="Mélanchonist">Mélanchonist</option>
                  <option value="Pietronist">Pietronist</option>
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
                </div>
              </>
            )}
            {activeTab === 1 && (
              <>
                <div className={styles.formGroup}>
                  <label htmlFor="reason">Reason for Contacting Pietro:</label>
                  <select id="reason" name="reason">
                    <option value="urgent">Urgent Revolutionary Matter</option>
                    <option value="love">Love Advice from the Leader</option>
                    <option value="avocado">Request for Avocado Toast Recipes</option>
                    <option value="confession">Confession of Capitalist Tendencies (Don't worry, we’ll forgive you… maybe)</option>
                    <option value="other">Other Revolutionary Concerns</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="message">Tell us your revolutionary dreams, funniest comrade jokes, or just vent about the capitalist menace:</label>
                  <textarea id="message" name="message" />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="urgency">Urgency:</label>
                  <select id="urgency" name="urgency">
                    <option value="yesterday">Yesterday (Pietro doesn’t own a time machine, but he’ll try his best)</option>
                    <option value="today">Today (Pietro will put down his cognac and get right to it)</option>
                    <option value="whenever">Whenever (Pietro appreciates your patience)</option>
                  </select>
                </div>
                <div className={`${styles.formGroup} ${styles.inlineFields}`}>
                  <div className={styles.inlineField}>
                    <label htmlFor="files">Attach Files:</label>
                    <input type="file" id="files" name="files" multiple />
                  </div>
                  <div className={styles.inlineField}>
                    <label htmlFor="captcha" className={styles.captchaLabel}>
                    <input type="checkbox" id="captcha" name="captcha" onChange={handleCaptchaCheck} className={styles.checkbox} />
                    I'm not a Captcha(list)
                    </label>
                  </div>
                </div>
              </>
            )}
            <div className={styles.formGroup}>
              <button type="submit" className={`${styles.submitContact}`}>Send</button>
            </div>
          </form>
        </div>
      </div>
      {isModalOpen && (
        <div className={styles.modal} style={{ display: 'block' }}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeModal}>&times;</span>
            <h2>Prove you're not a Capitalist Spy! Select all images with Karl Marx:</h2>
            <div className={styles.captchaImages}>
              {captchaImages.map((index) => (
                <img
                  key={index}
                  src={images[index]}
                  alt={`Captcha ${index + 1}`}
                  className={selectedImages.includes(index) ? styles.selected : ''}
                  onClick={() => handleImageClick(index)}
                />
              ))}
            </div>
            <button onClick={handleSubmitCaptcha}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
