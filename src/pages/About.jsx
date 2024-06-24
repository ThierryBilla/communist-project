import React from 'react';
import Navbar from '../components/Navbar'; // Import Navbar
import styles from '../css/About.module.css';
import PietroImage from '../assets/picture/Pietro.jpg'; // Import the image

const About = () => {
  return (
    <div>
      <Navbar /> {/* Add Navbar */}
      <div className={styles.aboutContainer}>
        <h1>About our leader Pietro</h1>
        <div className={styles.content}>
          <img src={PietroImage} alt="Pietro" className={styles.image} />
          <p>
            In the year 2024, times are tough. Italy, once a proud nation with a booming population, is now facing an
            unprecedented demographic challenge: our young people are abandoning the fields and factories to indulge in the
            frivolous joys of social media and avocado toast.
          </p>
          <p>
            Fortunately, one man has heeded the call to duty. Pietro, a charismatic and visionary leader, had a revelation
            during a late-night conversation with Alexandru Drăghici (no one quite knows where he was getting cognac at that
            hour, but let's not dwell on that...).
          </p>
          <p>
            And so, this website was born, a haven designed to awaken sleeping consciences and kickstart the Italian baby
            machine.
          </p>
          <p>
            Join us in our crusade for a more populous, louder, and more fragrant Italy! Together, we will make Italy the
            new China, with overcrowded nurseries and endless queues at the bakery.
          </p>
          <p>
            But be warned, this is not for the faint of heart. Here, we dare to say things as they are, without platitudes
            or spaghetti on the plate. We laugh at everything, including ourselves (because Pietro, our leader, doesn't give
            us a choice, let's be honest).
          </p>
          <p>
            So what are you waiting for? Come meet the hottest communists in your area. Together, we will make Italy the
            funniest and most populous country in Europe (or at least, we'll try).
          </p>
          <p>Remember: reproduction is a patriotic act!</p>
        </div>
      </div>
    </div>
  );
};

export default About;
