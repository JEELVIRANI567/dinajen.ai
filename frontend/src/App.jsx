import React, { useState, useEffect } from 'react';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { ContentProvider } from './context/ContentContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { AppDashboard } from './components/AppDashboard';
import { AdminPanel } from './components/AdminPanel';
import { AuthModal } from './components/AuthModal';
import { isAppSubdomain, isAdminRoute } from './utils/subdomainRouter';

function MainAppContent() {
  const [isAppView, setIsAppView] = useState(() => isAppSubdomain());
  const [isAdminView, setIsAdminView] = useState(() => isAdminRoute());
  const [landingPageNav, setLandingPageNav] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '');
      return ['research', 'tools', 'blog', 'community', 'contact', 'admin'].includes(hash) ? hash : 'home';
    }
    return 'home';
  });
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('tab') || 'feed';
    }
    return 'feed';
  });

  useEffect(() => {
    const handleUrlChange = () => {
      const appDetected = isAppSubdomain();
      const adminDetected = isAdminRoute();
      setIsAppView(appDetected);
      setIsAdminView(adminDetected);

      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      if (tabParam) {
        setActiveTab(tabParam);
      }

      if (window.location.hash) {
        const hash = window.location.hash.replace('#', '');
        if (['research', 'tools', 'blog', 'community', 'contact'].includes(hash)) {
          setLandingPageNav(hash);
        }
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    const newUrl = new URL(window.location.href);
    newUrl.pathname = isAppView ? '/app' : '/';
    newUrl.searchParams.set('tab', tabKey);
    window.history.pushState({}, '', newUrl.toString());
  };

  const handleLandingNavChange = (navKey) => {
    setLandingPageNav(navKey);
    if (typeof window !== 'undefined') {
      window.location.hash = navKey === 'home' ? '' : navKey;
    }
  };

  if (isAdminView) {
    return (
      <div className="dizipix-app-root admin-standalone-wrapper">
        <AdminPanel />
      </div>
    );
  }

  return (
    <div className="dizipix-app-root">
      <Navbar
        isAppView={isAppView}
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        landingPageNav={landingPageNav}
        setLandingPageNav={handleLandingNavChange}
      />

      <main>
        {!isAppView ? (
          <LandingPage
            landingPageNav={landingPageNav}
            setLandingPageNav={handleLandingNavChange}
          />
        ) : (
          <AppDashboard
            activeTab={activeTab}
            setActiveTab={handleTabChange}
          />
        )}
      </main>

      <AuthModal />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <MainAppContent />
      </ContentProvider>
    </AuthProvider>
  );
}

