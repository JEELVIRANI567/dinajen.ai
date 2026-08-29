import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { navigateToApp, navigateToLanding, navigateToAdmin } from '../utils/subdomainRouter';
import logo from '../assets/logo1.png';

export function Navbar({ isAppView, activeTab, setActiveTab, landingPageNav = 'home', setLandingPageNav }) {
  const { user, credits, setAuthModalOpen, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  const handleNavClick = (navKey) => {
    if (setLandingPageNav) {
      setLandingPageNav(navKey);
    }
  };

  const handleLogoClick = () => {
    closeMenu();
    handleNavClick('home');
    if (typeof window !== 'undefined') {
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    navigateToLanding();
  };

  return (
    <>
      <header className="navbar-header">
        <div className="container nav-wrapper">
          {/* Brand Logo */}
          <div
            className="brand-logo"
            onClick={handleLogoClick}
            style={{ cursor: 'pointer' }}
          >
            <img src={logo} alt="DiziPix Logo" className="logo-img" />
            <span className="logo-text">Dizi<span className="logo-accent">Pix</span>.ai</span>
          </div>

          {/* Desktop Navigation Links */}
          {!isAppView ? (
            <nav className="nav-links desktop-only">
              <a
                href="#research"
                className={`nav-item ${landingPageNav === 'research' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('research'); }}
              >
                Research
              </a>
              <a
                href="#tools"
                className={`nav-item highlight-nav-item ${landingPageNav === 'tools' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('tools'); }}
              >
                <span className="vfx-sparkle sparkle-left">✦</span>
                <span className="vfx-sparkle sparkle-top">✨</span>
                <span className="vfx-sparkle sparkle-right">✧</span>
                <span className="ai-text-vfx">AI Tools</span>
                <span className="ai-scan-glow"></span>
              </a>
              <a
                href="#blog"
                className={`nav-item ${landingPageNav === 'blog' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('blog'); }}
              >
                Blog
              </a>
              <a
                href="/#product"
                target="_blank"
                rel="noopener noreferrer"
                className={`nav-item ${landingPageNav === 'product' || landingPageNav === 'template' ? 'active' : ''}`}
              >
                Product
              </a>
              <a
                href="#community"
                className={`nav-item ${landingPageNav === 'community' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('community'); }}
              >
                Community
              </a>
              <a
                href="#contact"
                className={`nav-item ${landingPageNav === 'contact' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}
              >
                Contact
              </a>
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
                Try DiziPix
              </button>
            ) : (
              <button className="btn btn-secondary btn-sm" onClick={navigateToLanding}>
                Main Site ↗
              </button>
            )}
          </div>

          {/* Mobile Action Controls & Hamburger Toggle */}
          <div className="mobile-actions">
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
      </header>

      {/* Mobile Drawer Overlay - Rendered OUTSIDE header */}
      {isMobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={closeMenu}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <div className="brand-logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
                <img src={logo} alt="DiziPix Logo" className="logo-img" />
                <span className="logo-text">Dizi<span className="logo-accent">Pix</span>.ai</span>
              </div>
              <button className="mobile-drawer-close" onClick={closeMenu} aria-label="Close menu">
                ✕
              </button>
            </div>
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
                <a
                  href="#research"
                  className={`mobile-nav-item ${landingPageNav === 'research' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick('research'); closeMenu(); }}
                >
                  Research
                </a>
                <a
                  href="#tools"
                  className={`mobile-nav-item ${landingPageNav === 'tools' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick('tools'); closeMenu(); }}
                >
                  AI Tools
                </a>
                <a
                  href="#blog"
                  className={`mobile-nav-item ${landingPageNav === 'blog' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick('blog'); closeMenu(); }}
                >
                  Blog
                </a>
                <a
                  href="/#product"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mobile-nav-item ${landingPageNav === 'product' || landingPageNav === 'template' ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  Product
                </a>
                <a
                  href="#community"
                  className={`mobile-nav-item ${landingPageNav === 'community' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick('community'); closeMenu(); }}
                >
                  Community
                </a>
                <a
                  href="#contact"
                  className={`mobile-nav-item ${landingPageNav === 'contact' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick('contact'); closeMenu(); }}
                >
                  Contact
                </a>
              </nav>
            )}

            <div className="mobile-drawer-footer">
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
                  className="btn btn-ghost btn-block mobile-footer-btn"
                  onClick={() => { closeMenu(); setAuthModalOpen(true); }}
                >
                  Sign In
                </button>
              )}

              {!isAppView ? (
                <button
                  className="btn btn-primary btn-block mobile-footer-btn"
                  onClick={() => { closeMenu(); navigateToApp('create'); }}
                >
                  Try DiziPix
                </button>
              ) : (
                <button
                  className="btn btn-secondary btn-block mobile-footer-btn"
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
          z-index: 10000;
          background: rgba(8, 9, 13, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
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
          position: relative;
          padding: 0.4rem 0;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-item::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 3px;
          background: var(--gradient-primary);
          border-radius: var(--radius-full);
          transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-item:hover,
        .nav-item.active {
          font-weight: 700 !important;
          color: #ffffff;
        }

        .nav-item:hover::after,
        .nav-item.active::after {
          width: 100%;
        }

        .highlight-nav-item {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.4rem 0 !important;
          background: transparent;
          border: none;
          box-shadow: none;
          overflow: visible;
          transition: all 0.3s ease;
        }

        .highlight-nav-item:hover {
          background: transparent;
          border: none;
          box-shadow: none;
          transform: translateY(-1px) scale(1.04);
        }

        .ai-text-vfx {
          background: linear-gradient(135deg, #a855f7 0%, #ff007f 30%, #06b6d4 65%, #f59e0b 85%, #a855f7 100%);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 800 !important;
          font-size: 0.95rem;
          animation: gradientTextFlow 1.2s linear infinite, aiTextWave 2.5s ease-in-out infinite;
          letter-spacing: 0.03em;
        }

        .vfx-sparkle {
          position: absolute;
          font-size: 0.65rem;
          pointer-events: none;
          z-index: 2;
          -webkit-text-fill-color: initial;
        }

        .sparkle-left {
          top: -2px;
          left: 4px;
          color: #ec4899;
          animation: floatSparkle1 2s infinite ease-in-out;
        }

        .sparkle-top {
          top: -4px;
          right: 12px;
          font-size: 0.55rem;
          color: #06b6d4;
          animation: floatSparkle2 1.6s infinite ease-in-out;
        }

        .sparkle-right {
          bottom: -2px;
          right: 2px;
          color: #f59e0b;
          animation: floatSparkle3 2.2s infinite ease-in-out;
        }

        @keyframes aiTextWave {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-1.5px); }
        }

        @keyframes floatSparkle1 {
          0%, 100% { transform: translateY(0) scale(0.8) rotate(0deg); opacity: 0.4; }
          50% { transform: translateY(-5px) scale(1.3) rotate(45deg); opacity: 1; }
        }

        @keyframes floatSparkle2 {
          0%, 100% { transform: translateY(0) scale(1) rotate(0deg); opacity: 0.9; }
          50% { transform: translateY(4px) scale(0.7) rotate(-30deg); opacity: 0.3; }
        }

        @keyframes floatSparkle3 {
          0%, 100% { transform: translateX(0) scale(0.7); opacity: 0.5; }
          50% { transform: translateX(-4px) translateY(-3px) scale(1.2); opacity: 1; }
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

        /* Mobile Controls */
        .mobile-actions {
          display: none;
          align-items: center;
          gap: 0.6rem;
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
          z-index: 10001;
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

        /* Mobile Drawer Overlay */
        .mobile-drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(4, 5, 8, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 99999;
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
          max-height: 100vh;
          overflow-y: auto;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
        }

        .mobile-drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 0.8rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 0.2rem;
        }

        .mobile-drawer-close {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #cbd5e1;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .mobile-drawer-close:hover {
          background: rgba(255, 255, 255, 0.18);
          color: #ffffff;
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .mobile-nav-item {
          color: var(--text-primary);
          text-decoration: none;
          font-size: 1.05rem;
          font-weight: 600;
          height: 50px;
          padding: 0 1.2rem;
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-glass);
          display: flex;
          align-items: center;
          justify-content: flex-start;
          transition: all 0.2s ease;
          box-sizing: border-box;
          width: 100%;
        }

        .mobile-nav-item:hover,
        .mobile-nav-item.active {
          background: var(--gradient-primary);
          color: #ffffff;
          border-color: transparent;
        }

        .mobile-footer-btn {
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.05rem;
          font-weight: 600;
          border-radius: var(--radius-md);
          width: 100%;
          padding: 0 1.2rem;
          box-sizing: border-box;
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
          height: 50px;
          padding: 0 0.5rem;
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
          gap: 0.75rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-glass);
        }

        .mobile-user-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(255, 255, 255, 0.04);
          padding: 0.75rem 1rem;
          height: 50px;
          box-sizing: border-box;
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
    </>
  );
}
