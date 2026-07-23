import React from 'react';
import { useAuth } from '../context/AuthContext';
import { navigateToApp, navigateToLanding } from '../utils/subdomainRouter';
import logo from '../assets/logo1.png';

export function Navbar({ isAppView, activeTab, setActiveTab }) {
  const { user, credits, setAuthModalOpen, logout } = useAuth();

  return (
    <header className="navbar-header">
      <div className="container nav-wrapper">
        {/* Brand Logo */}
        <div className="brand-logo" onClick={navigateToLanding} style={{ cursor: 'pointer' }}>
          <img src={logo} alt="DiziPix Logo" className="logo-img" />
          <span className="logo-text">Dizi<span className="logo-accent">Pix</span>.ai</span>
          <span className="domain-pill">{isAppView ? 'app.dizipix.ai' : 'dizipix.ai'}</span>
        </div>

        {/* Navigation Links */}
        {!isAppView ? (
          <nav className="nav-links">
            <a href="#features" className="nav-item">Features</a>
            <a href="#showcase" className="nav-item">Showcase</a>
            <a href="#tools" className="nav-item">AI Tools</a>
            <a href="#pricing" className="nav-item">Pricing</a>
          </nav>
        ) : (
          <nav className="nav-links app-tabs">
            <button
              className={`app-tab-btn ${activeTab === 'feed' ? 'active' : ''}`}
              onClick={() => setActiveTab('feed')}
            >
              📰 Feed
            </button>
            <button
              className={`app-tab-btn ${activeTab === 'create' ? 'active' : ''}`}
              onClick={() => setActiveTab('create')}
            >
              ✨ AI Studio
            </button>
            <button
              className={`app-tab-btn ${activeTab === 'assets' ? 'active' : ''}`}
              onClick={() => setActiveTab('assets')}
            >
              📁 My Assets
            </button>
            <button
              className={`app-tab-btn ${activeTab === 'credits' ? 'active' : ''}`}
              onClick={() => setActiveTab('credits')}
            >
              ⚡ Buy Credits
            </button>
          </nav>
        )}

        {/* Action Controls */}
        <div className="nav-actions">
          {/* Credit Badge */}
          <div 
            className="credits-badge" 
            title="Click to get more credits" 
            onClick={() => {
              if (isAppView) setActiveTab('credits');
              else navigateToApp('credits');
            }}
          >
            <span className="credit-icon">⚡</span>
            <span className="credit-amount">{credits}</span>
            <span className="credit-label">Credits</span>
          </div>

          {user ? (
            <div className="user-profile-menu">
              <div className="avatar-circle">
                {user.name.charAt(0)}
              </div>
              <div className="user-details">
                <span className="user-name">{user.name}</span>
                <button className="logout-link" onClick={logout}>Sign Out</button>
              </div>
            </div>
          ) : (
            <button className="btn btn-ghost" onClick={() => setAuthModalOpen(true)}>
              Sign In
            </button>
          )}

          {!isAppView ? (
            <button className="btn btn-primary" onClick={() => navigateToApp('create')}>
              <span>Launch Studio</span>
              <span className="subdomain-tag">app.dizipix.ai ↗</span>
            </button>
          ) : (
            <button className="btn btn-secondary btn-sm" onClick={navigateToLanding}>
              Main Site ↗
            </button>
          )}
        </div>
      </div>

      <style>{`
        .navbar-header {
          position: sticky;
          top: 0;
          z-index: 500;
          background: rgba(8, 9, 13, 0.85);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border-glass);
          height: 70px;
          display: flex;
          align-items: center;
        }

        .nav-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          user-select: none;
        }

        .logo-img {
          height: 38px;
          width: auto;
          object-fit: contain;
          filter: drop-shadow(0 0 10px rgba(139, 92, 246, 0.4));
          transition: transform 0.25s ease;
        }

        .brand-logo:hover .logo-img {
          transform: scale(1.06);
        }

        .logo-text {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.03em;
        }

        .logo-accent {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .domain-pill {
          font-size: 0.7rem;
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.08);
          color: var(--text-muted);
          margin-left: 0.3rem;
          border: 1px solid var(--border-glass);
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 1.8rem;
        }

        .nav-item {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          transition: var(--transition-fast);
        }

        .nav-item:hover {
          color: var(--text-primary);
        }

        .app-tabs {
          background: rgba(255, 255, 255, 0.04);
          padding: 4px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-glass);
          gap: 4px;
        }

        .app-tab-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          padding: 0.4rem 1.1rem;
          font-size: 0.85rem;
          font-weight: 600;
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: var(--transition-fast);
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .app-tab-btn:hover {
          color: var(--text-primary);
        }

        .app-tab-btn.active {
          background: var(--gradient-primary);
          color: #fff;
          box-shadow: 0 2px 10px rgba(139, 92, 246, 0.4);
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .credits-badge {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(234, 179, 8, 0.12);
          border: 1px solid rgba(234, 179, 8, 0.3);
          padding: 0.35rem 0.8rem;
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .credits-badge:hover {
          background: rgba(234, 179, 8, 0.2);
          transform: scale(1.03);
        }

        .credit-icon {
          color: #eab308;
          font-size: 0.9rem;
        }

        .credit-amount {
          font-weight: 800;
          color: #fef08a;
          font-size: 0.9rem;
        }

        .credit-label {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .user-profile-menu {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .avatar-circle {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: var(--accent-purple);
          color: #fff;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
        }

        .user-details {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          line-height: 1.2;
        }

        .user-name {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .logout-link {
          background: none;
          border: none;
          color: var(--accent-pink);
          font-size: 0.75rem;
          cursor: pointer;
          padding: 0;
        }

        .subdomain-tag {
          font-size: 0.7rem;
          opacity: 0.8;
          font-weight: 400;
          margin-left: 0.2rem;
        }

        @media (max-width: 900px) {
          .nav-links:not(.app-tabs) {
            display: none;
          }
          .domain-pill {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
