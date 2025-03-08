import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaSignOutAlt, FaExclamationCircle, FaStar, FaSync } from 'react-icons/fa';
import './AdminStyles.css';

const AdminDashboard = ({ onLogout }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('pending');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const fetchTestimonials = async () => {
    try {
      setIsRefreshing(true);
      setError('');
      
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        throw new Error('Vous devez être connecté pour accéder à cette page');
      }
      
      const response = await fetch('http://localhost:5000/api/testimonials/all', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la récupération des témoignages');
      }
      
      setTestimonials(data.data);
      
    } catch (err) {
      setError(err.message);
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };
  
  // Récupérer les témoignages au chargement et chaque fois que refreshTrigger change
  useEffect(() => {
    fetchTestimonials();
  }, [refreshTrigger]);
  
  // Fonction pour déclencher manuellement un rafraîchissement
  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };
  
  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch(`http://localhost:5000/api/testimonials/${id}/approve`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de l\'approbation du témoignage');
      }
      
      // Déclencher le rafraîchissement
      setRefreshTrigger(prev => prev + 1);
      
    } catch (err) {
      setError(err.message);
    }
  };
  
  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce témoignage ?')) {
      return;
    }
    
    try {
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch(`http://localhost:5000/api/testimonials/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la suppression du témoignage');
      }
      
      // Déclencher le rafraîchissement
      setRefreshTrigger(prev => prev + 1);
      
    } catch (err) {
      setError(err.message);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    onLogout();
  };
  
  const pendingTestimonials = testimonials.filter(testimonial => !testimonial.isApproved);
  const approvedTestimonials = testimonials.filter(testimonial => testimonial.isApproved);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="admin-loading">Chargement des témoignages...</div>
      </div>
    );
  }
  
  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>Gestion des témoignages</h2>
        <div className="admin-header-actions">
          <button 
            className="admin-btn admin-btn-refresh" 
            onClick={handleRefresh}
            disabled={isRefreshing}
            title="Rafraîchir les données"
          >
            <FaSync className={isRefreshing ? "icon-spin" : ""} /> 
            {isRefreshing ? "Rafraîchissement..." : "Rafraîchir"}
          </button>
          <button className="admin-btn admin-btn-logout" onClick={handleLogout}>
            <FaSignOutAlt /> Déconnexion
          </button>
        </div>
      </div>
      
      {error && (
        <div className="admin-error">
          <FaExclamationCircle />
          <span>{error}</span>
        </div>
      )}
      
      <div className="admin-tabs">
        <button 
          className={`admin-tab ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          En attente ({pendingTestimonials.length})
        </button>
        <button 
          className={`admin-tab ${activeTab === 'approved' ? 'active' : ''}`}
          onClick={() => setActiveTab('approved')}
        >
          Approuvés ({approvedTestimonials.length})
        </button>
      </div>
      
      <div className="admin-content">
        {activeTab === 'pending' && (
          <>
            <h3>Témoignages en attente d'approbation</h3>
            
            {pendingTestimonials.length === 0 ? (
              <p className="admin-empty-message">Aucun témoignage en attente d'approbation.</p>
            ) : (
              <div className="admin-testimonials-list">
                {pendingTestimonials.map(testimonial => (
                  <div key={testimonial._id} className="admin-testimonial-card">
                    <div className="admin-testimonial-header">
                      <div className="admin-testimonial-info">
                        <h4>{testimonial.name}</h4>
                        <p>{testimonial.position}</p>
                      </div>
                      <div className="admin-testimonial-rating">
                        {[...Array(5)].map((_, index) => (
                          <FaStar 
                            key={index}
                            className={index < testimonial.rating ? 'star active' : 'star'}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="admin-testimonial-content">
                      <p>{testimonial.text}</p>
                    </div>
                    
                    <div className="admin-testimonial-footer">
                      <span className="admin-testimonial-date">
                        Soumis le {formatDate(testimonial.createdAt)}
                      </span>
                      
                      <div className="admin-testimonial-actions">
                        <button 
                          className="admin-btn admin-btn-approve"
                          onClick={() => handleApprove(testimonial._id)}
                        >
                          <FaCheck /> Approuver
                        </button>
                        <button 
                          className="admin-btn admin-btn-delete"
                          onClick={() => handleDelete(testimonial._id)}
                        >
                          <FaTimes /> Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        
        {activeTab === 'approved' && (
          <>
            <h3>Témoignages approuvés</h3>
            
            {approvedTestimonials.length === 0 ? (
              <p className="admin-empty-message">Aucun témoignage approuvé.</p>
            ) : (
              <div className="admin-testimonials-list">
                {approvedTestimonials.map(testimonial => (
                  <div key={testimonial._id} className="admin-testimonial-card approved">
                    <div className="admin-testimonial-header">
                      <div className="admin-testimonial-info">
                        <h4>{testimonial.name}</h4>
                        <p>{testimonial.position}</p>
                      </div>
                      <div className="admin-testimonial-rating">
                        {[...Array(5)].map((_, index) => (
                          <FaStar 
                            key={index}
                            className={index < testimonial.rating ? 'star active' : 'star'}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="admin-testimonial-content">
                      <p>{testimonial.text}</p>
                    </div>
                    
                    <div className="admin-testimonial-footer">
                      <span className="admin-testimonial-date">
                        Approuvé le {formatDate(testimonial.updatedAt)}
                      </span>
                      
                      <div className="admin-testimonial-actions">
                        <button 
                          className="admin-btn admin-btn-delete"
                          onClick={() => handleDelete(testimonial._id)}
                        >
                          <FaTimes /> Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;