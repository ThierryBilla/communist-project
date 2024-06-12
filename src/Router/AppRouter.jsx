//AppRouter.jsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Dating from '../pages/Dating';
import Signup from '../components/Signup';
import Signin from '../components/Signin';

function AppRouter() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dating" element={<Dating />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>

  );

}

export default AppRouter;