import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const userInfo = localStorage.getItem('adminInfo');
    if (userInfo) {
      setAdmin(JSON.parse(userInfo));
    }
  }, []);

  const login = (data) => {
    localStorage.setItem('adminInfo', JSON.stringify(data));
    localStorage.setItem('adminToken', data.token);
    setAdmin(data);
  };

  const logout = () => {
    localStorage.removeItem('adminInfo');
    localStorage.removeItem('adminToken');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
