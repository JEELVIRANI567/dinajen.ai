import React, { useState, useEffect } from 'react';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { AppDashboard } from './components/AppDashboard';
import { AuthModal } from './components/AuthModal';
import { isAppSubdomain } from './utils/subdomainRouter';

function MainAppContent() {
  const [isAppView, setIsAppView] = useState(() => isAppSubdomain());
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
      setIsAppView(appDetected);

      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      if (tabParam) {
        setActiveTab(tabParam);
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

  return (
    <div className="dizipix-app-root">
      <Navbar
        isAppView={isAppView}
        activeTab={activeTab}
        setActiveTab={handleTabChange}
      />

      <main>
        {!isAppView ? (
          <LandingPage />
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
      <MainAppContent />
    </AuthProvider>
  );
}
