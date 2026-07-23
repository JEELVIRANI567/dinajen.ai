import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { navigateToApp, navigateToLanding } from '../utils/subdomainRouter';

export function Navbar({ isAppView, activeTab, setActiveTab }) {
  const { user, credits, setAuthModalOpen, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="navbar-header">
      <div className="container nav-wrapper">
        {/* Brand Logo */}
        <div className="brand-logo" onClick={() => { closeMenu(); navigateToLanding(); }} style={{ cursor: 'pointer' }}>
          <div className="logo-sparkle">✦</div>
          <span className="logo-text">Dizi<span className="logo-accent">Pix</span>.ai</span>
          <span className="domain-pill">{isAppView ? 'app.dizipix.ai' : 'dizipix.ai'}</span>
        </div>

        {/* Desktop Navigation Links */}
        {!isAppView ? (
          <nav className="nav-links desktop-only">
            <a href="#features" className="nav-item">Features</a>
            <a href="#showcase" className="nav-item">Showcase</a>
            <a href="#tools" className="nav-item">AI Tools</a>
            <a href="#pricing" className="nav-item">Pricing</a>
          </nav>
        ) : (
          <nav className="nav-links app-tabs desktop-only">
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

        {/* Action Controls - Desktop */}
        <div className="nav-actions desktop-only">
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

        {/* Mobile Action Controls & Hamburger Toggle */}
        <div className="mobile-actions">
          <div 
            className="credits-badge mobile-credits" 
            onClick={() => {
              if (isAppView) setActiveTab('credits');
              else navigateToApp('credits');
            }}
          >
            <span className="credit-icon">⚡</span>
            <span className="credit-amount">{credits}</span>
          </div>

          <button 
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={closeMenu}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            {isAppView && (
              <div className="mobile-tabs-grid">
                <button
                  className={`mobile-tab-btn ${activeTab === 'feed' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('feed'); closeMenu(); }}
                >
                  📰 Feed
                </button>
                <button
                  className={`mobile-tab-btn ${activeTab === 'create' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('create'); closeMenu(); }}
                >
                  ✨ AI Studio
                </button>
                <button
                  className={`mobile-tab-btn ${activeTab === 'assets' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('assets'); closeMenu(); }}
                >
                  📁 My Assets
                </button>
                <button
                  className={`mobile-tab-btn ${activeTab === 'credits' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('credits'); closeMenu(); }}
                >
                  ⚡ Buy Credits
                </button>
              </div>
            )}

            {!isAppView && (
              <nav className="mobile-nav-links">
                <a href="#features" className="mobile-nav-item" onClick={closeMenu}>Features</a>
                <a href="#showcase" className="mobile-nav-item" onClick={closeMenu}>Showcase</a>
                <a href="#tools" className="mobile-nav-item" onClick={closeMenu}>AI Tools</a>
                <a href="#pricing" className="mobile-nav-item" onClick={closeMenu}>Pricing</a>
              </nav>
            )}

            <div className="mobile-drawer-footer">
              <div 
                className="credits-badge mobile-drawer-credits"
                onClick={() => {
                  closeMenu();
                  if (isAppView) setActiveTab('credits');
                  else navigateToApp('credits');
                }}
              >
                <span className="credit-icon">⚡</span>
                <span className="credit-amount">{credits} Credits Available</span>
              </div>

              {user ? (
                <div className="mobile-user-card">
                  <div className="avatar-circle">{user.name.charAt(0)}</div>
                  <div className="user-details">
                    <span className="user-name">{user.name}</span>
                    <button className="logout-link" onClick={() => { logout(); closeMenu(); }}>Sign Out</button>
                  </div>
                </div>
              ) : (
                <button 
                  className="btn btn-ghost btn-block" 
                  onClick={() => { closeMenu(); setAuthModalOpen(true); }}
                >
                  Sign In
                </button>
              )}

              {!isAppView ? (
                <button 
                  className="btn btn-primary btn-block" 
                  onClick={() => { closeMenu(); navigateToApp('create'); }}
                >
                  <span>Launch Studio</span>
                  <span className="subdomain-tag">app.dizipix.ai ↗</span>
                </button>
              ) : (
                <button 
                  className="btn btn-secondary btn-block" 
                  onClick={() => { closeMenu(); navigateToLanding(); }}
                >
                  Main Site ↗
                </button>
              )}
            </div>
          </div>
        </div>
      )}

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

        .logo-sparkle {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: var(--gradient-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: bold;
          font-size: 1.2rem;
          box-shadow: 0 0 15px rgba(139, 92, 246, 0.4);
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

        /* Mobile Controls */
        .mobile-actions {
          display: none;
          align-items: center;
          gap: 0.6rem;
        }

        .mobile-credits {
          padding: 0.25rem 0.6rem;
        }

        .mobile-menu-toggle {
          background: none;
          border: none;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          width: 30px;
          height: 24px;
          cursor: pointer;
          padding: 0;
          z-index: 501;
        }

        .mobile-menu-toggle span {
          width: 100%;
          height: 2px;
          background: var(--text-primary);
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .mobile-menu-toggle.open span:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
        }

        .mobile-menu-toggle.open span:nth-child(2) {
          opacity: 0;
        }

        .mobile-menu-toggle.open span:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }

        /* Mobile Drawer */
        .mobile-drawer-overlay {
          position: fixed;
          top: 70px;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(4, 5, 8, 0.8);
          backdrop-filter: blur(12px);
          z-index: 499;
          display: flex;
          flex-direction: column;
          animation: fadeIn 0.2s ease-out;
        }

        .mobile-drawer {
          background: rgba(15, 17, 26, 0.98);
          border-bottom: 1px solid var(--border-glass);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          max-height: calc(100vh - 70px);
          overflow-y: auto;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .mobile-nav-item {
          color: var(--text-primary);
          text-decoration: none;
          font-size: 1.1rem;
          font-weight: 600;
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--border-glass);
        }

        .mobile-tabs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.6rem;
        }

        .mobile-tab-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-glass);
          color: var(--text-secondary);
          padding: 0.7rem 0.5rem;
          font-size: 0.9rem;
          font-weight: 600;
          border-radius: var(--radius-md);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
        }

        .mobile-tab-btn.active {
          background: var(--gradient-primary);
          color: #fff;
          border-color: transparent;
        }

        .mobile-drawer-footer {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-glass);
        }

        .mobile-drawer-credits {
          justify-content: center;
          padding: 0.6rem 1rem;
        }

        .mobile-user-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(255, 255, 255, 0.04);
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-glass);
        }

        @media (max-width: 900px) {
          .desktop-only {
            display: none !important;
          }
          .mobile-actions {
            display: flex;
          }
          .domain-pill {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}

