import { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken') || null);

  useEffect(() => {
    const loadUserFromToken = async () => {
      if (token) {
        try {
          const response = await fetch('https://communistdate-0f582f5caf12.herokuapp.com/users/profile', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            console.log(userData);
          } else {
            setUser(null);
            setToken(null);
            localStorage.removeItem('authToken');
          }
        } catch (error) {
          console.error('Error loading user from token:', error);
        }
      }
    };

    loadUserFromToken();
  }, [token]);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('authToken', authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);