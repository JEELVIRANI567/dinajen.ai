import React, { useState, useEffect } from 'react';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { ContentProvider } from './context/ContentContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { AppDashboard } from './components/AppDashboard';
import { AdminPanel } from './components/AdminPanel';
import { TemplateStudioPage } from './components/TemplateStudioPage';
import { AuthModal } from './components/AuthModal';
import { isAppSubdomain, isAdminRoute, isProductRoute } from './utils/subdomainRouter';

function MainAppContent() {
  const [isAppView, setIsAppView] = useState(() => isAppSubdomain());
  const [isAdminView, setIsAdminView] = useState(() => isAdminRoute());
  const [landingPageNav, setLandingPageNav] = useState(() => {
    if (isProductRoute()) return 'product';
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '');
      return ['research', 'tools', 'blog', 'community', 'contact', 'admin', 'template', 'product'].includes(hash) ? (hash === 'template' ? 'product' : hash) : 'home';
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
      const productDetected = isProductRoute();
      setIsAppView(appDetected);
      setIsAdminView(adminDetected);

      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      if (tabParam) {
        setActiveTab(tabParam);
      }

      if (productDetected) {
        setLandingPageNav('product');
        if (window.location.hash === '#product' || window.location.hash === '#products' || window.location.hash === '#template') {
          window.history.replaceState({}, '', '/app/products');
        }
      } else if (window.location.hash) {
        const hash = window.location.hash.replace('#', '');
        if (['research', 'tools', 'blog', 'community', 'contact', 'template', 'product', 'products'].includes(hash)) {
          setLandingPageNav(hash === 'template' ? 'product' : hash);
        }
      }
    };

    if (typeof window !== 'undefined' && (window.location.hash === '#product' || window.location.hash === '#products' || window.location.hash === '#template')) {
      window.history.replaceState({}, '', '/app/products');
    }

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
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
      if (navKey === 'product' || navKey === 'products' || navKey === 'template') {
        const newUrl = new URL(window.location.href);
        newUrl.pathname = '/app/products';
        newUrl.hash = '';
        window.history.pushState({}, '', newUrl.toString());
      } else {
        const newUrl = new URL(window.location.href);
        if (newUrl.pathname.startsWith('/app/products') || newUrl.pathname.startsWith('/app/product') || newUrl.pathname.startsWith('/products') || newUrl.pathname.startsWith('/product') || newUrl.pathname.startsWith('/template')) {
          newUrl.pathname = '/';
        }
        newUrl.hash = navKey === 'home' ? '' : navKey;
        window.history.pushState({}, '', newUrl.toString());
      }
    }
  };

  if (isAdminView) {
    return (
      <div className="dizipix-app-root admin-standalone-wrapper">
        <AdminPanel />
      </div>
    );
  }

  // Product Studio View for /app/product, #product, and #template route
  if (isProductRoute() || landingPageNav === 'product' || landingPageNav === 'template') {
    return (
      <div className="dizipix-app-root">
        <TemplateStudioPage setLandingPageNav={handleLandingNavChange} />
        <AuthModal />
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

