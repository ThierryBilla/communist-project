import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import Home from '../pages/Home';
import Dating from '../pages/Dating';
import Signup from '../components/Signup';
import Signin from '../components/Signin';
import MyAccount from '../pages/MyAccount';
import About from '../pages/About'; 
import Contact from '../pages/Contact';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // or a loading spinner
  }

  return user ? <Component /> : <Navigate to="/signin" />;
};

function AppRouter() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dating" element={<PrivateRoute element={Dating} />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/myaccount" element={<PrivateRoute element={MyAccount} />} />
          <Route path="/about" element={<About />} /> 
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default AppRouter;
