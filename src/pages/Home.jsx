// Home.jsx

import React from 'react'; 
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features.jsx';
import Footer from '../components/Footer.jsx';

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features /> 
      <Footer />
    </div>
  )
}

export default Home;