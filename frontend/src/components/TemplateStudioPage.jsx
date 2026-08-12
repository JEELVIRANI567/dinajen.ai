import React, { useState } from 'react';
import { navigateToLanding } from '../utils/subdomainRouter';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo1.png';

export function TemplateStudioPage({ setLandingPageNav }) {
  const { user, setAuthModalOpen } = useAuth();
  const [sidebarTab, setSidebarTab] = useState('template'); // 'home' | 'creation' | 'agent' | 'profile' | 'subscription' | 'setting' | 'help' | 'template'
  const [activeCategory, setActiveCategory] = useState('All');
  const [contentTab, setContentTab] = useState('Template'); // 'Video' | 'Template' | 'Challenge'
  const [creationMode, setCreationMode] = useState('Video'); // 'Video' | 'Image' | 'Audio'
  const [creationSubTool, setCreationSubTool] = useState('Image & Text');
  const [promptInput, setPromptInput] = useState('');
  const [modelEngine, setModelEngine] = useState('DiziPix V6');
  const [resolution, setResolution] = useState('1080P');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [duration, setDuration] = useState('5s');
  const [audioToggle, setAudioToggle] = useState(true);
  const [multiShotToggle, setMultiShotToggle] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const TEMPLATES_DATA = [
    {
      id: 'fig-squishy',
      title: 'Figure Squishy',
      category: 'RUN TO SUMMER',
      badge: '✨ Figure Squishy',
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
      prompt: 'A cute 3D squishy anime character bouncing in soft pastel lighting, volumetric studio render, 8K ultra detail.',
      views: '142.8K',
      likes: '12.4K'
    },
    {
      id: 'ai-assistant-tablet',
      title: 'The AI assistant in the tablet',
      category: 'Parallel Life',
      badge: '🤖 AI Tablet Assistant',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      prompt: 'Futuristic glowing holographic tablet assistant floating in dark room with cyber neon particles.',
      views: '98.3K',
      likes: '8.9K'
    },
    {
      id: 'cute-pet-ice-cream',
      title: 'Cute Pet Ice Cream',
      category: 'Little Heroes',
      badge: '🍦 Cute Pet Ice Cream',
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80',
      prompt: 'Adorable fluffy cat holding a giant strawberry ice cream cone, Pixar style animation, warm golden light.',
      views: '210.5K',
      likes: '24.1K'
    },
    {
      id: 'born-to-shine-stage',
      title: 'Born To Shine On Stage',
      category: 'Star Style',
      badge: '✨ Born To Shine On Stage',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80',
      prompt: 'K-pop idol performing under glowing stadium spotlights, lens flare, cinematic fog, 60fps video camera pan.',
      views: '320.1K',
      likes: '38.9K'
    },
    {
      id: 'indian-cyberpunk-hero',
      title: 'Bharat Cyberpunk 2077',
      category: 'Game Fantasy',
      badge: '🇮🇳 Cyberpunk Cinema',
      image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
      prompt: 'Indian warrior in futuristic glowing neon cyber armor standing on rain-soaked Mumbai street, cinematic anamorphic lighting.',
      views: '184.2K',
      likes: '19.8K'
    },
    {
      id: 'dance-party-festival',
      title: 'Neon Dance Festival',
      category: 'Dance Party',
      badge: '🔥 Neon Dance Party',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80',
      prompt: 'High energy concert crowd dancing under vibrant laser lights, festival atmosphere, 4K camera motion.',
      views: '156.4K',
      likes: '14.2K'
    },
    {
      id: 'portrait-studio-glamour',
      title: 'Vogue Portrait Studio',
      category: 'Portrait Studio',
      badge: '📸 Portrait Studio',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
      prompt: 'Fashion model studio portrait, soft rim light, 85mm lens f/1.4 bokeh background, flawless editorial skin texture.',
      views: '275.9K',
      likes: '29.3K'
    },
    {
      id: 'story-mode-fantasy-dragon',
      title: 'Mythical Dragon Kingdom',
      category: 'Story Mode',
      badge: '🐉 Fantasy Story Mode',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
      prompt: 'Majestic golden dragon soaring over ancient mountain temple, volumetric clouds, epic movie trailer visual.',
      views: '412.3K',
      likes: '48.6K'
    }
  ];

  const CATEGORIES = [
    'All',
    '⚡ RUN TO SUMMER',
    'Little Heroes',
    'Star Style',
    'Dance Party',
    'Parallel Life',
    'Portrait Studio',
    'Face & Body',
    'Game Fantasy',
    'Story Mode'
  ];

  const filteredTemplates = activeCategory === 'All'
    ? TEMPLATES_DATA
    : TEMPLATES_DATA.filter(t => t.category.toLowerCase().includes(activeCategory.replace('⚡ ', '').toLowerCase()));

  const handleUseTemplate = (tmpl) => {
    setSelectedTemplate(tmpl);
    setPromptInput(tmpl.prompt);
    showToast(`✨ Template "${tmpl.title}" loaded into Creation Dock!`);
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!promptInput.trim()) {
      showToast('⚠️ Please enter a prompt or choose a template!');
      return;
    }
    showToast(`🚀 Generating 60fps AI ${creationMode}... Rendering with ${modelEngine}`);
  };

  return (
    <div className="template-studio-wrapper">
      {/* Toast Notice */}
      {toastMessage && (
        <div className="studio-toast-banner animate-slide-up">
          {toastMessage}
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="studio-sidebar">
        <div className="sidebar-brand" onClick={() => { setLandingPageNav('home'); window.location.hash = ''; }}>
          <img src={logo} alt="DiziPix Logo" className="logo-img" />
          <span className="brand-logo">Dizi<span className="accent">Pix</span>.ai</span>
        </div>

        <nav className="sidebar-menu">
          <button
            className={`sidebar-link ${sidebarTab === 'home' || sidebarTab === 'template' ? 'active' : ''}`}
            onClick={() => setSidebarTab('template')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span>Home</span>
          </button>

          <button
            className={`sidebar-link ${sidebarTab === 'creation' ? 'active' : ''}`}
            onClick={() => setSidebarTab('creation')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span>Creation</span>
          </button>

          <button
            className={`sidebar-link ${sidebarTab === 'agent' ? 'active' : ''}`}
            onClick={() => setSidebarTab('agent')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <span>Agent</span>
          </button>

          <button
            className={`sidebar-link ${sidebarTab === 'profile' ? 'active' : ''}`}
            onClick={() => setSidebarTab('profile')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>Profile</span>
          </button>

          <button
            className={`sidebar-link ${sidebarTab === 'subscription' ? 'active' : ''}`}
            onClick={() => setSidebarTab('subscription')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
              <line x1="1" y1="10" x2="23" y2="10"></line>
            </svg>
            <span>Subscription</span>
          </button>

          <button
            className={`sidebar-link ${sidebarTab === 'setting' ? 'active' : ''}`}
            onClick={() => setSidebarTab('setting')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
            <span>Setting</span>
          </button>

          <button
            className={`sidebar-link ${sidebarTab === 'help' ? 'active' : ''}`}
            onClick={() => setSidebarTab('help')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <span>Help & Support</span>
          </button>
        </nav>

        {/* Promo Upgrade Box */}
        <div className="sidebar-promo-card">
          <div className="promo-tag">🔥 PRO PASS</div>
          <p>Unlimited 60fps AI Video & Render Pipeline.</p>
          <button className="promo-btn" onClick={() => setSidebarTab('subscription')}>
            Get Paid / Upgrade
          </button>
        </div>
      </aside>

      {/* Main Studio Viewport */}
      <main className="studio-main">
        {/* Top Header Bar */}
        <header className="studio-top-header">
          <div className="header-search-bar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" placeholder="Search 10,000+ AI Video & Visual Templates..." />
          </div>

          <div className="header-actions">
            <button className="pill-btn highlight-pill" onClick={() => showToast('✨ DiziPix R1 Ultra Video Engine Active')}>
              ✨ DiziPix R1
            </button>
            <button className="pill-btn" onClick={() => showToast('🔌 API Platform Documentation')}>
              API Platform
            </button>
            <button className="pill-btn credit-pill" onClick={() => showToast('🎁 500 Free Daily Credits Refreshed')}>
              🎁 Earn Credits
            </button>
            <button className="pill-btn subscribe-pill" onClick={() => setSidebarTab('subscription')}>
              💎 Subscribe
            </button>
            <button className="account-login-btn" onClick={() => setAuthModalOpen(true)}>
              {user ? (user.name || 'Account') : 'Login'}
            </button>
          </div>
        </header>

        {/* Dynamic Sidebar View Content */}
        {sidebarTab === 'subscription' ? (
          /* Subscription Plans View */
          <div className="studio-content-view animate-fade-in">
            <div className="view-header">
              <h2>Choose Your DiziPix AI Plan</h2>
              <p>Unlock unlimited 60fps rendering, commercial licenses, and custom model training</p>
            </div>

            <div className="subscription-plans-grid">
              <div className="plan-card glass-card">
                <span className="plan-badge">STARTER</span>
                <h3>Free Creator</h3>
                <div className="plan-price">$0 <span>/ month</span></div>
                <ul>
                  <li>⚡ 50 Daily Generation Credits</li>
                  <li>🎬 Standard 1080P AI Video</li>
                  <li>🖼️ Unlimited Vernacular Posters</li>
                </ul>
                <button className="plan-btn secondary-btn" onClick={() => showToast('Current Free Plan')}>Current Plan</button>
              </div>

              <div className="plan-card glass-card featured">
                <span className="plan-badge popular">MOST POPULAR</span>
                <h3>Dizi-Pro Creator</h3>
                <div className="plan-price">$19 <span>/ month</span></div>
                <ul>
                  <li>🚀 2,500 Monthly Generation Credits</li>
                  <li>⚡ 60fps Ultra-Smooth Video Synthesis</li>
                  <li>🎯 Direct Adobe Illustrator & SVG Exports</li>
                  <li>✨ Priority GPU Render Queue</li>
                </ul>
                <button className="plan-btn primary-btn" onClick={() => showToast('🎉 Welcome to Dizi-Pro Plan!')}>Upgrade to Pro</button>
              </div>

              <div className="plan-card glass-card">
                <span className="plan-badge">ENTERPRISE</span>
                <h3>Cinema Studio Pass</h3>
                <div className="plan-price">$49 <span>/ month</span></div>
                <ul>
                  <li>💎 Unlimited AI Generations & Credits</li>
                  <li>🎬 Custom Regional Cinema Engine Access</li>
                  <li>🔌 Full REST API Access & Webhooks</li>
                  <li>📞 24/7 Dedicated Support Specialist</li>
                </ul>
                <button className="plan-btn secondary-btn" onClick={() => showToast('Contacting Enterprise Sales...')}>Get Studio Pass</button>
              </div>
            </div>
          </div>
        ) : sidebarTab === 'creation' ? (
          /* Advanced Creation View */
          <div className="studio-content-view animate-fade-in">
            <div className="view-header">
              <h2>DiziPix Creation Studio</h2>
              <p>Generate hyper-realistic video sequences and visual prompts</p>
            </div>

            <div className="creation-full-panel glass-card">
              <div className="creation-tabs">
                <button className={`tab-item ${creationMode === 'Video' ? 'active' : ''}`} onClick={() => setCreationMode('Video')}>🎥 Video Generator</button>
                <button className={`tab-item ${creationMode === 'Image' ? 'active' : ''}`} onClick={() => setCreationMode('Image')}>🖼️ Image Studio</button>
                <button className={`tab-item ${creationMode === 'Audio' ? 'active' : ''}`} onClick={() => setCreationMode('Audio')}>🎵 Vernacular Audio</button>
              </div>

              <div className="creation-body">
                <label className="input-label">Prompt Engine Input:</label>
                <textarea
                  className="creation-textarea"
                  rows="4"
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  placeholder="Describe your scene in English, Hindi, Tamil, or Telugu... (e.g. Hero character in traditional period armor with volumetric fog, golden hour lighting, 60fps cinematic pan)"
                />

                <div className="creation-options-row">
                  <div className="option-group">
                    <label>Resolution</label>
                    <select value={resolution} onChange={(e) => setResolution(e.target.value)}>
                      <option value="540P">540P Fast</option>
                      <option value="1080P">1080P HD</option>
                      <option value="4K">4K Cinema</option>
                    </select>
                  </div>

                  <div className="option-group">
                    <label>Aspect Ratio</label>
                    <select value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value)}>
                      <option value="16:9">16:9 Landscape</option>
                      <option value="9:16">9:16 Mobile Reel</option>
                      <option value="1:1">1:1 Square</option>
                    </select>
                  </div>

                  <div className="option-group">
                    <label>Duration</label>
                    <select value={duration} onChange={(e) => setDuration(e.target.value)}>
                      <option value="5s">5 Seconds</option>
                      <option value="10s">10 Seconds</option>
                    </select>
                  </div>

                  <button className="create-now-btn" onClick={handleCreateSubmit}>
                    Generate Scene ⚡
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : sidebarTab === 'agent' ? (
          /* Autonomous Agent View */
          <div className="studio-content-view animate-fade-in">
            <div className="view-header">
              <h2>Autonomous Prompt & Scene Agent</h2>
              <p>Let AI auto-generate complete video shot lists, storyboard prompts, and character dialogues</p>
            </div>
            <div className="glass-card" style={{ padding: '2rem' }}>
              <h3>🤖 Agent Studio Active</h3>
              <p>Type a movie theme or poster concept to let DiziPix Agent generate 10 complete scene variations.</p>
              <button className="create-now-btn" style={{ marginTop: '1rem' }} onClick={() => showToast('🤖 Agent generated 5 new video prompt variations!')}>Launch Agent Workflow 🚀</button>
            </div>
          </div>
        ) : sidebarTab === 'profile' ? (
          /* User Profile View */
          <div className="studio-content-view animate-fade-in">
            <div className="view-header">
              <h2>User Profile & Creations</h2>
              <p>Manage your account settings, generated art, and saved templates</p>
            </div>
            <div className="glass-card" style={{ padding: '2rem' }}>
              <h3>👤 {user ? user.name || user.email : 'Creator Account'}</h3>
              <p>Account Type: ⚡ Dizi-Pro Member</p>
              <p>Remaining Credits: 1,480 / 2,500</p>
            </div>
          </div>
        ) : sidebarTab === 'setting' ? (
          /* Settings View */
          <div className="studio-content-view animate-fade-in">
            <div className="view-header">
              <h2>Studio & API Settings</h2>
              <p>Configure model default render engines, API tokens, and vernacular font preferences</p>
            </div>
            <div className="glass-card" style={{ padding: '2rem' }}>
              <h3>⚙️ Engine Preferences</h3>
              <p>Default Model: DiziPix V6 Cinema Engine</p>
              <p>API Token: dizipix_live_sec_884920194857</p>
            </div>
          </div>
        ) : sidebarTab === 'help' ? (
          /* Help & Support View */
          <div className="studio-content-view animate-fade-in">
            <div className="view-header">
              <h2>Help & Creator Support</h2>
              <p>Guides, video tutorials, prompt cheat-sheets, and Discord community</p>
            </div>
            <div className="glass-card" style={{ padding: '2rem' }}>
              <h3>❓ Need assistance with AI Video Prompts?</h3>
              <p>Join our 40,000+ creator Discord server or read our documentation.</p>
              <button className="pill-btn highlight-pill" style={{ marginTop: '1rem' }} onClick={() => showToast('🌐 Opening DiziPix Discord Server...')}>Join Discord Community 💬</button>
            </div>
          </div>
        ) : (
          /* Main Template Home Gallery View */
          <div className="studio-content-view animate-fade-in">
            {/* Featured Contest Hero Banner */}
            <section className="featured-banner-card">
              <div className="banner-content">
                <div className="banner-top-pill">
                  <span>DiziPix AI Film Contest</span>
                </div>
                <h1>PIXLIGHT 2026</h1>
                <p className="prize-tag">$300K PRIZE POOL • SUBMISSIONS OPEN</p>
                <button
                  className="banner-submit-btn"
                  onClick={() => showToast('🏆 Opening PIXLIGHT 2026 Submission Portal...')}
                >
                  SUBMIT NOW ↗
                </button>
              </div>
            </section>

            {/* Sub Nav Tabs */}
            <div className="studio-nav-tabs">
              <button
                className={`tab-btn ${contentTab === 'Video' ? 'active' : ''}`}
                onClick={() => setContentTab('Video')}
              >
                Video
              </button>
              <button
                className={`tab-btn ${contentTab === 'Template' ? 'active' : ''}`}
                onClick={() => setContentTab('Template')}
              >
                Template
              </button>
              <button
                className={`tab-btn ${contentTab === 'Challenge' ? 'active' : ''}`}
                onClick={() => setContentTab('Challenge')}
              >
                Challenge
              </button>
            </div>

            {/* Category Tags Bar */}
            <div className="category-tags-scroll">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`category-tag-pill ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Template Cards Grid */}
            <div className="templates-grid">
              {filteredTemplates.map((tmpl) => (
                <div
                  key={tmpl.id}
                  className="template-card glass-card"
                  onClick={() => handleUseTemplate(tmpl)}
                >
                  <div className="card-image-wrapper">
                    <img src={tmpl.image} alt={tmpl.title} />
                    <span className="card-overlay-badge">{tmpl.badge}</span>
                    <button
                      className="card-use-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUseTemplate(tmpl);
                      }}
                    >
                      Use Template ⚡
                    </button>
                  </div>
                  <div className="card-details">
                    <h4>{tmpl.title}</h4>
                    <div className="card-stats">
                      <span>👁️ {tmpl.views}</span>
                      <span>❤️ {tmpl.likes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Floating Studio Creation Control Dock Overlay */}
            <div className="floating-creation-dock glass-card">
              <div className="dock-top-row">
                <div className="dock-mode-pills">
                  <button
                    className={`dock-pill ${creationMode === 'Video' ? 'active' : ''}`}
                    onClick={() => setCreationMode('Video')}
                  >
                    🎥 Video
                  </button>
                  <button
                    className={`dock-pill ${creationMode === 'Image' ? 'active' : ''}`}
                    onClick={() => setCreationMode('Image')}
                  >
                    🖼️ Image
                  </button>
                  <button
                    className={`dock-pill ${creationMode === 'Audio' ? 'active' : ''}`}
                    onClick={() => setCreationMode('Audio')}
                  >
                    🎵 Audio
                  </button>
                </div>

                <div className="dock-subtools">
                  <span className="subtool-item active">🖼️ Image & Text</span>
                  <span className="subtool-item">🎯 Reference</span>
                  <span className="subtool-item">✨ Template</span>
                  <span className="subtool-item">🔀 Transition</span>
                  <span className="subtool-item">✏️ Modify</span>
                  <span className="subtool-item">🎬 Motion Control</span>
                  <span className="subtool-item">⏩ Extend</span>
                  <span className="subtool-item">🗣️ Speech</span>
                </div>
              </div>

              <div className="dock-input-row">
                <input
                  type="text"
                  className="dock-prompt-input"
                  placeholder="Describe the content you want to create..."
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                />

                <div className="dock-controls-right">
                  <select
                    className="dock-select-picker"
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value)}
                  >
                    <option value="540P">540P</option>
                    <option value="1080P">1080P</option>
                    <option value="4K">4K</option>
                  </select>

                  <select
                    className="dock-select-picker"
                    value={aspectRatio}
                    onChange={(e) => setAspectRatio(e.target.value)}
                  >
                    <option value="16:9">16:9</option>
                    <option value="9:16">9:16</option>
                    <option value="1:1">1:1</option>
                  </select>

                  <select
                    className="dock-select-picker"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  >
                    <option value="5s">5s</option>
                    <option value="10s">10s</option>
                  </select>

                  <div className="dock-toggle-item">
                    <span>Audio</span>
                    <input
                      type="checkbox"
                      checked={audioToggle}
                      onChange={(e) => setAudioToggle(e.target.checked)}
                    />
                  </div>

                  <div className="dock-toggle-item">
                    <span>Multi-Shot</span>
                    <input
                      type="checkbox"
                      checked={multiShotToggle}
                      onChange={(e) => setMultiShotToggle(e.target.checked)}
                    />
                  </div>

                  <select
                    className="dock-select-picker engine-picker"
                    value={modelEngine}
                    onChange={(e) => setModelEngine(e.target.value)}
                  >
                    <option value="DiziPix V6">DiziPix V6</option>
                    <option value="Dizi-Bharat 2.5">Dizi-Bharat 2.5</option>
                    <option value="Dizi-Motion 60fps">Dizi-Motion 60fps</option>
                  </select>

                  <button className="dock-create-btn" onClick={handleCreateSubmit}>
                    Create ⚡ 38
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
