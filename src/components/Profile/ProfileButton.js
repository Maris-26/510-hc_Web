import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import LoginForm from '../Auth/LoginForm';
import RegisterForm from '../Auth/RegisterForm';

const ProfileButton = () => {
  const { user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const handleProfileClick = () => {
    if (user) {
      // Show user menu
      setShowAuthModal(true);
    } else {
      // Show auth modal
      setAuthMode('login');
      setShowAuthModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowAuthModal(false);
  };

  const switchAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
  };

  const handleLogout = () => {
    logout();
    handleCloseModal();
    // Force a page reload to reset the state and show all cocktails
    window.location.reload();
  };

  return (
    <div className="profile-container">
      <button className="profile-button" onClick={handleProfileClick}>
        {user ? (
          <div className="user-profile">
            <span className="user-name">{user.name}</span>
            <div className="user-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        ) : (
          <div className="login-prompt">
            <span>Login / Register</span>
          </div>
        )}
      </button>

      {showAuthModal && (
        <div className="auth-modal">
          <div className="auth-modal-content">
            <button className="close-button" onClick={handleCloseModal}>×</button>
            {user ? (
              <div className="user-menu">
                <h3>Welcome, {user.name}!</h3>
                <button onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <>
                {authMode === 'login' ? (
                  <>
                    <LoginForm onClose={handleCloseModal} />
                    <p className="auth-switch">
                      Don't have an account?{' '}
                      <button onClick={switchAuthMode}>Register</button>
                    </p>
                  </>
                ) : (
                  <>
                    <RegisterForm onClose={handleCloseModal} />
                    <p className="auth-switch">
                      Already have an account?{' '}
                      <button onClick={switchAuthMode}>Login</button>
                    </p>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileButton; 