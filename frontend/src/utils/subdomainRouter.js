/**
 * Subdomain and Route Utility for DiziPix.ai
 * Handles routing between Landing site (dizipix.ai) and App workspace (app.dizipix.ai).
 */

export function isAppSubdomain() {
  if (typeof window === 'undefined') return false;

  const hostname = window.location.hostname;
  const pathname = window.location.pathname;
  const searchParams = new URLSearchParams(window.location.search);

  // Check 1: Production Subdomain (e.g. app.dizipix.ai or app.localhost)
  if (hostname.startsWith('app.')) return true;

  // Check 2: Subpath routing for local dev (http://localhost:5173/app)
  if (pathname.startsWith('/app') || pathname.startsWith('/products') || pathname.startsWith('/product') || pathname.startsWith('/template')) return true;

  // Check 3: Explicit query parameter (http://localhost:5173/?mode=app)
  if (searchParams.get('mode') === 'app' || searchParams.has('app')) return true;

  return false;
}

export function isProductRoute() {
  if (typeof window === 'undefined') return false;

  const pathname = window.location.pathname;
  const hash = window.location.hash;

  return (
    pathname === '/app/products' ||
    pathname === '/app/product' ||
    pathname === '/app/template' ||
    pathname === '/products' ||
    pathname === '/product' ||
    pathname === '/template' ||
    pathname.startsWith('/app/products') ||
    pathname.startsWith('/app/product') ||
    pathname.startsWith('/products') ||
    pathname.startsWith('/product') ||
    pathname.startsWith('/template') ||
    hash === '#products' ||
    hash === '#product' ||
    hash === '#template'
  );
}

export function getProductUrl(tab) {
  if (typeof window === 'undefined') return '/app/products';

  const isProduction = window.location.hostname.includes('dizipix.ai');
  const baseUrl = isProduction ? 'https://app.dizipix.ai/products' : '/app/products';
  return tab ? `${baseUrl}?tab=${tab}` : baseUrl;
}

export function navigateToApp(tab = 'feed') {
  if (typeof window === 'undefined') return;

  const isProduction = window.location.hostname.includes('dizipix.ai');

  if (isProduction) {
    // Production redirect to subdomain
    window.location.href = `https://app.dizipix.ai/?tab=${tab}`;
  } else {
    // Local dev mode switch
    const newUrl = new URL(window.location.href);
    newUrl.pathname = '/app';
    newUrl.searchParams.set('tab', tab);
    window.history.pushState({}, '', newUrl.toString());
    // Dispatch custom event to update state
    window.dispatchEvent(new Event('popstate'));
  }
}

export function isAdminRoute() {
  if (typeof window === 'undefined') return false;

  const hostname = window.location.hostname;
  const pathname = window.location.pathname;
  const searchParams = new URLSearchParams(window.location.search);
  const hash = window.location.hash;

  if (hostname.startsWith('admin.')) return true;
  if (pathname.startsWith('/admin')) return true;
  if (searchParams.get('mode') === 'admin' || searchParams.has('admin')) return true;
  if (hash === '#admin') return true;

  return false;
}

export function navigateToAdmin() {
  if (typeof window === 'undefined') return;

  const newUrl = new URL(window.location.href);
  newUrl.pathname = '/admin';
  window.history.pushState({}, '', newUrl.toString());
  window.dispatchEvent(new Event('popstate'));
}

export function navigateToLanding() {
  if (typeof window === 'undefined') return;

  const isProduction = window.location.hostname.includes('dizipix.ai');

  if (isProduction) {
    window.location.href = 'https://dizipix.ai/';
  } else {
    const newUrl = new URL(window.location.href);
    newUrl.pathname = '/';
    newUrl.searchParams.delete('tab');
    newUrl.searchParams.delete('app');
    newUrl.searchParams.delete('mode');
    newUrl.hash = '';
    window.history.pushState({}, '', newUrl.toString());
    window.dispatchEvent(new Event('popstate'));
  }
}

