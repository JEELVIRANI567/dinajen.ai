import React, { useState } from 'react';
import { navigateToApp } from '../utils/subdomainRouter';
import { useAuth } from '../context/AuthContext';

export function LandingPage() {
  const { setAuthModalOpen } = useAuth();
  const [selectedPrompt, setSelectedPrompt] = useState('Cyberpunk Neon Music Festival Poster 8K');
  const [activeCategory, setActiveCategory] = useState('all');

  const SAMPLE_PROMPTS = [
    { label: '🖼️ Cyberpunk Poster', text: 'Futuristic neon cyberpunk poster for electric music festival, vibrant purple and cyan, 8k render' },
    { label: '🏷️ Minimalist Logo', text: 'Modern geometric 3D emblem logo for AI startup, gold & deep obsidian gradient, luxury vector' },
    { label: '📄 Event Flyer', text: 'Luxury yacht summer party flyer with tropical gradient typography and gold accent overlays' },
    { label: '🎬 Cinematic Video', text: 'Ultra slow-motion camera orbit around glowing bioluminescent jellyfish in dark deep ocean' }
  ];

  const SHOWCASE_ITEMS = [
    {
      type: 'poster',
      title: 'Synthwave Night Poster',
      author: '@Dhruvil_N',
      tag: 'AI Poster',
      img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80'
    },
    {
      type: 'video',
      title: 'Neon Hyper-drive Motion',
      author: '@Jeel_V',
      tag: 'AI Video 60fps',
      img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
      isVideo: true
    },
    {
      type: 'logo',
      title: 'Quantum AI Tech Logo',
      author: '@DiziStudio',
      tag: 'Vector Logo',
      img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'
    },
    {
      type: 'flyer',
      title: 'Minimalist Architecture Exhibition',
      author: '@Elena_R',
      tag: 'Flyer Design',
      img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div className="landing-container">
      {/* Background Glow Effects */}
      <div className="glow-sphere sphere-1"></div>
      <div className="glow-sphere sphere-2"></div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-content">
          <div className="badge badge-cyan animate-fade-in">
            <span>✨ Introducing DiziPix AI v2.5 Suite</span>
          </div>

          <h1 className="hero-title">
            Generate & Edit <span className="text-gradient">Posters, Logos, Flyers & AI Videos</span>
          </h1>

          <p className="hero-subtitle">
            The next-generation visual AI studio. Create studio-grade marketing assets, vector brand logos, and 4K cinematic video clips with simple text prompts.
          </p>

          <div className="hero-cta-group">
            <button className="btn btn-primary btn-lg" onClick={() => navigateToApp('create')}>
              🚀 Start Creating Free (50 Credits)
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => setAuthModalOpen(true)}>
              🔑 Sign In / Register
            </button>
          </div>

          <div className="subdomain-badge-bar">
            <span>⚡ Main App Domain: <strong>app.dizipix.ai</strong></span>
          </div>

          {/* Interactive Prompt Playground */}
          <div className="prompt-sandbox glass-panel">
            <div className="sandbox-header">
              <span className="sandbox-title">⚡ Interactive AI Prompt Sandbox</span>
              <span className="sandbox-hint">Click a sample prompt to try:</span>
            </div>

            <div className="sample-tags">
              {SAMPLE_PROMPTS.map((p, idx) => (
                <button
                  key={idx}
                  className={`prompt-chip ${selectedPrompt === p.text ? 'active' : ''}`}
                  onClick={() => setSelectedPrompt(p.text)}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div className="prompt-input-wrapper">
              <input
                type="text"
                value={selectedPrompt}
                onChange={(e) => setSelectedPrompt(e.target.value)}
                className="sandbox-input"
              />
              <button
                className="btn btn-primary sandbox-submit"
                onClick={() => navigateToApp('create')}
              >
                Generate on App ↗
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features & Tools Grid */}
      <section id="tools" className="section container">
        <div className="section-header">
          <span className="badge badge-pink">All-In-One Studio</span>
          <h2>Four Powerful AI Tools in One Platform</h2>
          <p>Everything you need to produce stunning brand visuals and video content</p>
        </div>

        <div className="features-grid">
          <div className="feature-card glass-card">
            <div className="card-icon">🖼️</div>
            <h3>AI Poster Generator</h3>
            <p>Design high-resolution event posters, movie graphics, and social promo art with custom lighting, typography, and theme controls.</p>
            <div className="card-footer-link" onClick={() => navigateToApp('create')}>Try Poster AI &rarr;</div>
          </div>

          <div className="feature-card glass-card">
            <div className="card-icon">🏷️</div>
            <h3>AI Logo & Brand Creator</h3>
            <p>Generate unique 3D emblems, minimal vector logos, and corporate brand marks with instant color palette variations.</p>
            <div className="card-footer-link" onClick={() => navigateToApp('create')}>Try Logo AI &rarr;</div>
          </div>

          <div className="feature-card glass-card">
            <div className="card-icon">📄</div>
            <h3>AI Flyer Builder</h3>
            <p>Create print-ready business flyers, party invitations, and promotional banners with customizable grid layouts.</p>
            <div className="card-footer-link" onClick={() => navigateToApp('create')}>Try Flyer AI &rarr;</div>
          </div>

          <div className="feature-card glass-card">
            <div className="card-icon">🎬</div>
            <h3>AI Video Generator</h3>
            <p>Transform text prompts or static posters into fluid 60fps cinematic video scenes with camera trajectory and motion controls.</p>
            <div className="card-footer-link" onClick={() => navigateToApp('create')}>Try Video AI &rarr;</div>
          </div>
        </div>
      </section>

      {/* Community Showcase Gallery */}
      <section id="showcase" className="section container">
        <div className="section-header">
          <span className="badge badge-cyan">Made with DiziPix</span>
          <h2>Created by Our Global Community</h2>
        </div>

        <div className="showcase-grid">
          {SHOWCASE_ITEMS.map((item, idx) => (
            <div key={idx} className="showcase-item glass-card">
              <div className="media-container">
                <img src={item.img} alt={item.title} />
                {item.isVideo && <span className="play-badge">▶ 4K Video</span>}
                <span className="type-badge">{item.tag}</span>
              </div>
              <div className="showcase-info">
                <h4>{item.title}</h4>
                <p>by {item.author}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing & Credit Tiers */}
      <section id="pricing" className="section container">
        <div className="section-header">
          <span className="badge badge-pink">Flexible Pricing</span>
          <h2>Simple Credit-Based Plans</h2>
          <p>Get started free, top up anytime, or subscribe for unlimited creation</p>
        </div>

        <div className="pricing-grid">
          <div className="pricing-card glass-card">
            <h3>Starter Free</h3>
            <div className="price-tag">0<span> / month</span></div>
            <p className="plan-desc">Perfect for testing the power of DiziPix AI</p>
            <ul className="plan-features">
              <li>⚡ <strong>50 Free Credits</strong> on signup</li>
              <li>🖼️ Access Poster, Logo & Flyer Generators</li>
              <li>🎬 Standard resolution AI Video rendering</li>
              <li>📁 Community asset storage</li>
            </ul>
            <button className="btn btn-secondary btn-block" onClick={() => navigateToApp('create')}>
              Claim 50 Free Credits
            </button>
          </div>

          <div className="pricing-card glass-card featured">
            <div className="popular-badge">MOST POPULAR</div>
            <h3>Creator Pro</h3>
            <div className="price-tag">$19<span> / month</span></div>
            <p className="plan-desc">For designers, marketers, and content creators</p>
            <ul className="plan-features">
              <li>⚡ <strong>500 Credits</strong> per month</li>
              <li>🚀 Priority generation speed</li>
              <li>🎬 4K High-Frame Rate Video Generation</li>
              <li>Commercial license rights</li>
              <li>Remove DiziPix watermark</li>
            </ul>
            <button className="btn btn-primary btn-block" onClick={() => navigateToApp('credits')}>
              Upgrade to Pro
            </button>
          </div>

          <div className="pricing-card glass-card">
            <h3>Enterprise</h3>
            <div className="price-tag">$49<span> / month</span></div>
            <p className="plan-desc">For agencies and heavy production teams</p>
            <ul className="plan-features">
              <li>⚡ <strong>2000 Credits</strong> per month</li>
              <li>⚡ Unlimited fast-lane render queue</li>
              <li>API Access & Custom Brand Kits</li>
              <li>Dedicated 24/7 Support</li>
            </ul>
            <button className="btn btn-secondary btn-block" onClick={() => navigateToApp('credits')}>
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="footer-section">
        <div className="container footer-content">
          <div className="footer-brand">
            <div className="brand-logo">
              <span className="logo-text">Dizi<span className="logo-accent">Pix</span>.ai</span>
            </div>
            <p>Created by Dhruvil Nakrani & Jeel Virani. The ultimate AI visual & video generator suite.</p>
          </div>

          <div className="footer-links">
            <div className="link-col">
              <h5>App Domain</h5>
              <a href="#" onClick={(e) => { e.preventDefault(); navigateToApp('feed'); }}>app.dizipix.ai/?tab=feed</a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigateToApp('create'); }}>app.dizipix.ai/?tab=create</a>
            </div>

            <div className="link-col">
              <h5>Tools</h5>
              <a href="#tools">Poster Generator</a>
              <a href="#tools">Logo Creator</a>
              <a href="#tools">Flyer Builder</a>
              <a href="#tools">Video AI Engine</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom container">
          <p>&copy; {new Date().getFullYear()} DiziPix.ai. All rights reserved. Co-founded by Dhruvil & Jeel.</p>
        </div>
      </footer>

      <style>{`
        .landing-container {
          position: relative;
          overflow: hidden;
          padding-top: 2rem;
        }

        .glow-sphere {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          z-index: 0;
        }

        .sphere-1 {
          width: 500px;
          height: 500px;
          background: rgba(139, 92, 246, 0.18);
          top: -100px;
          left: 50%;
          transform: translateX(-50%);
        }

        .sphere-2 {
          width: 400px;
          height: 400px;
          background: rgba(6, 182, 212, 0.15);
          top: 600px;
          right: -100px;
        }

        .hero-section {
          padding: 4rem 0 6rem;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .hero-title {
          font-size: 3.8rem;
          line-height: 1.1;
          margin: 1.5rem 0 1.2rem;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--text-secondary);
          max-width: 720px;
          margin: 0 auto 2.5rem;
        }

        .hero-cta-group {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.2rem;
          margin-bottom: 1.5rem;
        }

        .btn-lg {
          padding: 1rem 2.2rem;
          font-size: 1.05rem;
        }

        .subdomain-badge-bar {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 3rem;
        }

        .subdomain-badge-bar strong {
          color: var(--accent-cyan);
        }

        /* Prompt Sandbox */
        .prompt-sandbox {
          max-width: 840px;
          margin: 0 auto;
          padding: 2rem;
          text-align: left;
          border-color: rgba(139, 92, 246, 0.3);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
        }

        .sandbox-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .sandbox-title {
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--text-primary);
        }

        .sandbox-hint {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .sample-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-bottom: 1.2rem;
        }

        .prompt-chip {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-glass);
          color: var(--text-secondary);
          padding: 0.4rem 0.9rem;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .prompt-chip:hover, .prompt-chip.active {
          background: rgba(139, 92, 246, 0.2);
          border-color: var(--accent-purple);
          color: #fff;
        }

        .prompt-input-wrapper {
          display: flex;
          gap: 0.8rem;
          position: relative;
        }

        .sandbox-input {
          flex: 1;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid var(--border-glass);
          border-radius: var(--radius-md);
          padding: 0.9rem 1.2rem;
          color: #fff;
          font-size: 0.95rem;
          outline: none;
        }

        .sandbox-input:focus {
          border-color: var(--accent-cyan);
        }

        .sandbox-submit {
          white-space: nowrap;
          border-radius: var(--radius-md);
        }

        /* Section Commons */
        .section {
          padding: 6rem 0;
          position: relative;
          z-index: 1;
        }

        .section-header {
          text-align: center;
          margin-bottom: 3.5rem;
        }

        .section-header h2 {
          font-size: 2.5rem;
          margin: 0.8rem 0 0.5rem;
        }

        .section-header p {
          color: var(--text-secondary);
          font-size: 1.1rem;
        }

        /* Features Grid */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.8rem;
        }

        .feature-card {
          padding: 2.2rem;
          display: flex;
          flex-direction: column;
        }

        .card-icon {
          font-size: 2.5rem;
          margin-bottom: 1.2rem;
        }

        .feature-card h3 {
          font-size: 1.4rem;
          margin-bottom: 0.8rem;
        }

        .feature-card p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          flex: 1;
          margin-bottom: 1.5rem;
        }

        .card-footer-link {
          color: var(--accent-purple);
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
        }

        .card-footer-link:hover {
          color: var(--accent-pink);
        }

        /* Showcase Grid */
        .showcase-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.5rem;
        }

        .showcase-item {
          overflow: hidden;
          padding: 0;
        }

        .media-container {
          position: relative;
          height: 280px;
          overflow: hidden;
        }

        .media-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .showcase-item:hover img {
          transform: scale(1.06);
        }

        .play-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          color: var(--accent-cyan);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.3rem 0.6rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(6, 182, 212, 0.4);
        }

        .type-badge {
          position: absolute;
          bottom: 12px;
          right: 12px;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          color: #fff;
          font-size: 0.75rem;
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-full);
        }

        .showcase-info {
          padding: 1.2rem;
        }

        .showcase-info h4 {
          font-size: 1.1rem;
          margin-bottom: 0.2rem;
        }

        .showcase-info p {
          color: var(--text-muted);
          font-size: 0.85rem;
        }

        /* Pricing Grid */
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          align-items: stretch;
        }

        .pricing-card {
          padding: 2.5rem;
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .pricing-card.featured {
          border-color: var(--accent-purple);
          box-shadow: 0 0 40px rgba(139, 92, 246, 0.25);
          background: rgba(22, 24, 38, 0.9);
        }

        .popular-badge {
          position: absolute;
          top: -14px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--gradient-primary);
          color: #fff;
          font-size: 0.75rem;
          font-weight: 800;
          padding: 0.2rem 1rem;
          border-radius: var(--radius-full);
        }

        .price-tag {
          font-size: 3rem;
          font-weight: 800;
          margin: 1rem 0 0.5rem;
          font-family: var(--font-heading);
        }

        .price-tag span {
          font-size: 1rem;
          color: var(--text-muted);
          font-weight: 400;
        }

        .plan-desc {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-bottom: 1.8rem;
        }

        .plan-features {
          list-style: none;
          flex: 1;
          margin-bottom: 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .plan-features li::before {
          content: '✓ ';
          color: var(--accent-emerald);
          font-weight: bold;
        }

        /* Footer */
        .footer-section {
          background: #040508;
          border-top: 1px solid var(--border-glass);
          padding: 5rem 0 2rem;
          margin-top: 4rem;
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          gap: 4rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .footer-brand {
          max-width: 380px;
        }

        .footer-brand p {
          color: var(--text-muted);
          font-size: 0.9rem;
          margin-top: 1rem;
        }

        .footer-links {
          display: flex;
          gap: 4rem;
        }

        .link-col {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .link-col h5 {
          color: var(--text-primary);
          font-size: 0.95rem;
          margin-bottom: 0.5rem;
        }

        .link-col a {
          color: var(--text-muted);
          text-decoration: none;
          font-size: 0.9rem;
        }

        .link-col a:hover {
          color: var(--accent-purple);
        }

        .footer-bottom {
          text-align: center;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          color: var(--text-muted);
          font-size: 0.85rem;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          .hero-cta-group {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
