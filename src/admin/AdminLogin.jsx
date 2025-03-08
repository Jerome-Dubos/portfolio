import React, { useState } from 'react';
import { FaSignInAlt, FaExclamationCircle, FaHome } from 'react-icons/fa';
import './AdminStyles.css';

const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!credentials.username || !credentials.password) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Échec de la connexion');
      }
      
      localStorage.setItem('adminToken', data.token);
      
      onLogin();
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <h2>Administration</h2>
          <a href="/" className="admin-btn admin-btn-home">
            <FaHome /> Retour au site
          </a>
        </div>
        <p className="admin-login-subtitle">Connectez-vous pour gérer les témoignages</p>
        
        {error && (
          <div className="admin-error">
            <FaExclamationCircle />
            <span>{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Entrez votre nom d'utilisateur"
              disabled={loading}
            />
          </div>
          
          <div className="admin-form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Entrez votre mot de passe"
              disabled={loading}
            />
          </div>
          
          <button 
            type="submit" 
            className="admin-btn admin-btn-primary"
            disabled={loading}
          >
            {loading ? 'Connexion...' : (
              <>
                <FaSignInAlt /> Se connecter
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;