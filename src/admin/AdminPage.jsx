import React, { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import './AdminStyles.css';

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
  useEffect(() => {
    // Vérifier si un token existe déjà dans le localStorage
    const checkAuthentication = async () => {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        setIsAuthenticated(false);
        setIsCheckingAuth(false);
        return;
      }
      
      try {
        // Vérifier la validité du token
        const response = await fetch('http://localhost:5000/api/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          // Token invalide, le supprimer
          localStorage.removeItem('adminToken');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Erreur de vérification d\'authentification:', error);
        setIsAuthenticated(false);
      } finally {
        setIsCheckingAuth(false);
      }
    };
    
    checkAuthentication();
  }, []);
  
  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
  };
  
  if (isCheckingAuth) {
    return (
      <div className="admin-page">
        <div className="admin-loading-auth">Vérification de l'authentification...</div>
      </div>
    );
  }
  
  return (
    <div className="admin-page">
      {isAuthenticated ? (
        <AdminDashboard onLogout={handleLogout} />
      ) : (
        <AdminLogin onLogin={handleLogin} />
      )}
    </div>
  );
};

export default AdminPage;