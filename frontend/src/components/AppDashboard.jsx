import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export function AppDashboard({ activeTab, setActiveTab }) {
  const { user, credits, deductCredits, addCredits, userCreations, communityFeed, addCreation, setAuthModalOpen } = useAuth();

  // Active Tool inside 'create' tab: 'poster' | 'logo' | 'flyer' | 'video'
  const [activeTool, setActiveTool] = useState('poster');

  // Tool Form States
  const [prompt, setPrompt] = useState('Neon Cyberpunk Music Festival 2026 Poster');
  const [aspectRatio, setAspectRatio] = useState('9:16');
  const [stylePreset, setStylePreset] = useState('Cyberpunk');
  const [logoName, setLogoName] = useState('DiziPix Studio');
  const [logoTagline, setLogoTagline] = useState('AI Visual Engine');
  const [logoStyle, setLogoStyle] = useState('3D Emblem');
  const [flyerTitle, setFlyerTitle] = useState('Summer Beats Beach Party');
  const [videoMotion, setVideoMotion] = useState('Camera Orbit 360');
  const [videoSpeed, setVideoSpeed] = useState(5);

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedMedia, setGeneratedMedia] = useState(null);
  const [feedFilter, setFeedFilter] = useState('all');

  // Handle Generation Action
  const handleGenerate = () => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    const cost = activeTool === 'video' ? 10 : 5;

    if (credits < cost) {
      alert(`Insufficient credits! You need ${cost} credits to generate a ${activeTool}. Please top up your credits.`);
      setActiveTab('credits');
      return;
    }

    // Deduct credits
    const success = deductCredits(cost);
    if (!success) return;

    setIsGenerating(true);
    setProgress(10);
    setGeneratedMedia(null);

    // Simulate real-time progress steps
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 20;
      });
    }, 400);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setIsGenerating(false);

      // Selected stock visual based on tool type
      let resultUrl = '';
      let videoUrl = null;

      if (activeTool === 'poster') {
        resultUrl = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80';
      } else if (activeTool === 'logo') {
        resultUrl = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80';
      } else if (activeTool === 'flyer') {
        resultUrl = 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80';
      } else if (activeTool === 'video') {
        resultUrl = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80';
        videoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4';
      }

      const newMedia = {
        type: activeTool,
        title: activeTool === 'logo' ? logoName : prompt || `${activeTool.toUpperCase()} Creation`,
        prompt: prompt || `${activeTool} creation`,
        imageUrl: resultUrl,
        videoUrl: videoUrl,
        aspectRatio,
        stylePreset
      };

      setGeneratedMedia(newMedia);
      addCreation(newMedia);
    }, 2500);
  };

  const handleRemix = (item) => {
    setActiveTab('create');
    setActiveTool(item.type);
    setPrompt(item.prompt);
  };

  const filteredFeed = communityFeed.filter(item => {
    if (feedFilter === 'all') return true;
    return item.type === feedFilter;
  });

  return (
    <div className="dashboard-container container">
      {/* Tab 1: Community Feed */}
      {activeTab === 'feed' && (
        <div className="tab-pane animate-fade-in">
          <div className="tab-header">
            <div>
              <h2>Explore Community Creations</h2>
              <p>Trending AI Posters, Logos, Flyers and Videos generated on app.dizipix.ai</p>
            </div>
            <div className="filter-chips">
              {['all', 'poster', 'logo', 'flyer', 'video'].map((filter) => (
                <button
                  key={filter}
                  className={`filter-btn ${feedFilter === filter ? 'active' : ''}`}
                  onClick={() => setFeedFilter(filter)}
                >
                  {filter === 'all' ? '✨ All Creations' : filter.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="feed-grid">
            {filteredFeed.map((item) => (
              <div key={item.id} className="feed-card glass-card">
                <div className="card-media">
                  <img src={item.imageUrl} alt={item.title} />
                  {item.videoUrl && <span className="video-badge">▶ 60FPS Video</span>}
                  <span className="type-badge">{item.type.toUpperCase()}</span>
                </div>
                <div className="card-content">
                  <h4>{item.title}</h4>
                  <p className="prompt-text">"{item.prompt}"</p>
                  <div className="card-meta">
                    <span>by <strong>{item.creator}</strong></span>
                    <button className="remix-btn" onClick={() => handleRemix(item)}>
                      ✦ Remix Prompt
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: AI Studio Creator */}
      {activeTab === 'create' && (
        <div className="tab-pane animate-fade-in">
          <div className="studio-layout">
            {/* Left Control Panel */}
            <div className="studio-sidebar glass-panel">
              <div className="tool-selector">
                <button
                  className={`tool-btn ${activeTool === 'poster' ? 'active' : ''}`}
                  onClick={() => setActiveTool('poster')}
                >
                  🖼️ Poster AI
                </button>
                <button
                  className={`tool-btn ${activeTool === 'logo' ? 'active' : ''}`}
                  onClick={() => setActiveTool('logo')}
                >
                  🏷️ Logo AI
                </button>
                <button
                  className={`tool-btn ${activeTool === 'flyer' ? 'active' : ''}`}
                  onClick={() => setActiveTool('flyer')}
                >
                  📄 Flyer AI
                </button>
                <button
                  className={`tool-btn ${activeTool === 'video' ? 'active' : ''}`}
                  onClick={() => setActiveTool('video')}
                >
                  🎬 AI Video
                </button>
              </div>

              <div className="tool-form">
                {/* Poster / Video / General Prompt */}
                {activeTool !== 'logo' && (
                  <div className="form-field">
                    <label>AI Prompt Description</label>
                    <textarea
                      rows="3"
                      placeholder={`Describe your ${activeTool} design in detail...`}
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                    />
                  </div>
                )}

                {/* Specific Logo Controls */}
                {activeTool === 'logo' && (
                  <>
                    <div className="form-field">
                      <label>Brand / Company Name</label>
                      <input
                        type="text"
                        value={logoName}
                        onChange={(e) => setLogoName(e.target.value)}
                        placeholder="e.g. DiziPix Studio"
                      />
                    </div>
                    <div className="form-field">
                      <label>Tagline (Optional)</label>
                      <input
                        type="text"
                        value={logoTagline}
                        onChange={(e) => setLogoTagline(e.target.value)}
                        placeholder="e.g. Next-Gen Visual Engine"
                      />
                    </div>
                    <div className="form-field">
                      <label>Logo Emblem Style</label>
                      <select value={logoStyle} onChange={(e) => setLogoStyle(e.target.value)}>
                        <option value="3D Emblem">3D Emblem & Metallic</option>
                        <option value="Minimalist Line">Minimalist Vector Line</option>
                        <option value="Lettermark">Lettermark Initial Monogram</option>
                        <option value="Cyberpunk Geometric">Cyberpunk Geometric Shape</option>
                      </select>
                    </div>
                  </>
                )}

                {/* Specific Flyer Controls */}
                {activeTool === 'flyer' && (
                  <div className="form-field">
                    <label>Headline Event Title</label>
                    <input
                      type="text"
                      value={flyerTitle}
                      onChange={(e) => setFlyerTitle(e.target.value)}
                    />
                  </div>
                )}

                {/* Style Presets */}
                <div className="form-field">
                  <label>Aesthetic Preset</label>
                  <div className="preset-grid">
                    {['Cyberpunk', 'Minimalist', '3D Render', 'Cinematic', 'Vintage Gold', 'Neon Night'].map((preset) => (
                      <button
                        key={preset}
                        className={`preset-btn ${stylePreset === preset ? 'active' : ''}`}
                        onClick={() => setStylePreset(preset)}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Aspect Ratio */}
                <div className="form-field">
                  <label>Aspect Ratio</label>
                  <div className="ratio-options">
                    {['1:1', '9:16', '16:9', '4:5'].map((ratio) => (
                      <button
                        key={ratio}
                        className={`ratio-btn ${aspectRatio === ratio ? 'active' : ''}`}
                        onClick={() => setAspectRatio(ratio)}
                      >
                        {ratio}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Video Motion Settings */}
                {activeTool === 'video' && (
                  <>
                    <div className="form-field">
                      <label>Camera Motion Control</label>
                      <select value={videoMotion} onChange={(e) => setVideoMotion(e.target.value)}>
                        <option value="Camera Orbit 360">Orbit 360 Camera</option>
                        <option value="Pan Right Slow">Pan Right Cinematic</option>
                        <option value="Zoom In Motion">Smooth Zoom In</option>
                        <option value="Drone Flyover">Top-Down Drone View</option>
                      </select>
                    </div>
                    <div className="form-field">
                      <label>Motion Speed Intensity: {videoSpeed}</label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={videoSpeed}
                        onChange={(e) => setVideoSpeed(parseInt(e.target.value, 10))}
                      />
                    </div>
                  </>
                )}

                {/* Submit Button with Credit Cost */}
                <button
                  className="btn btn-primary btn-block studio-submit-btn"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <span>Generating... ({progress}%)</span>
                  ) : (
                    <span>Generate {activeTool.toUpperCase()} (⚡ {activeTool === 'video' ? '10' : '5'} Credits)</span>
                  )}
                </button>
              </div>
            </div>

            {/* Right Preview Canvas */}
            <div className="studio-canvas glass-panel">
              {isGenerating ? (
                <div className="canvas-loading">
                  <div className="spinner">✦</div>
                  <h3>DiziPix Engine Processing...</h3>
                  <p>Synthesizing pixels, lighting, and AI parameters</p>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
              ) : generatedMedia ? (
                <div className="canvas-output animate-fade-in">
                  <div className="output-media-frame">
                    {generatedMedia.videoUrl ? (
                      <video controls autoPlay loop src={generatedMedia.videoUrl} />
                    ) : (
                      <img src={generatedMedia.imageUrl} alt="Generated output" />
                    )}
                  </div>
                  <div className="output-controls">
                    <div className="output-info">
                      <h3>{generatedMedia.title}</h3>
                      <p>Aspect Ratio: {generatedMedia.aspectRatio} | Style: {generatedMedia.stylePreset}</p>
                    </div>
                    <div className="output-actions">
                      <a href={generatedMedia.imageUrl} download="dizipix_render.jpg" className="btn btn-secondary">
                        📥 Download 4K
                      </a>
                      <button className="btn btn-primary" onClick={() => setActiveTab('assets')}>
                        📁 View in My Assets
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="canvas-placeholder">
                  <div className="placeholder-icon">✨</div>
                  <h3>Ready to Create</h3>
                  <p>Configure your prompt and settings on the left sidebar, then click Generate to create your AI {activeTool}.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: My Assets */}
      {activeTab === 'assets' && (
        <div className="tab-pane animate-fade-in">
          <div className="tab-header">
            <div>
              <h2>My Assets Library</h2>
              <p>Your saved AI creations generated on app.dizipix.ai</p>
            </div>
          </div>

          {userCreations.length === 0 ? (
            <div className="empty-assets glass-panel">
              <div className="empty-icon">📁</div>
              <h3>No Creations Yet</h3>
              <p>You haven't generated any posters, logos, flyers or videos yet.</p>
              <button className="btn btn-primary" onClick={() => setActiveTab('create')}>
                Create Your First Asset ✨
              </button>
            </div>
          ) : (
            <div className="feed-grid">
              {userCreations.map((item) => (
                <div key={item.id} className="feed-card glass-card">
                  <div className="card-media">
                    <img src={item.imageUrl} alt={item.title} />
                    <span className="type-badge">{item.type.toUpperCase()}</span>
                  </div>
                  <div className="card-content">
                    <h4>{item.title}</h4>
                    <p className="prompt-text">"{item.prompt}"</p>
                    <div className="card-meta">
                      <a href={item.imageUrl} download className="btn btn-ghost btn-sm">
                        📥 Download
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Buy Credits */}
      {activeTab === 'credits' && (
        <div className="tab-pane animate-fade-in">
          <div className="tab-header text-center">
            <h2>Top Up Your DiziPix Credits</h2>
            <p>Current Balance: <strong style={{ color: '#fef08a' }}>⚡ {credits} Credits</strong></p>
          </div>

          <div className="pricing-grid" style={{ marginTop: '2rem' }}>
            <div className="pricing-card glass-card">
              <h3>Starter Pack</h3>
              <div className="price-tag">$5</div>
              <p className="plan-desc">+100 AI Credits</p>
              <button className="btn btn-secondary btn-block" onClick={() => addCredits(100)}>
                Add 100 Credits Instant
              </button>
            </div>

            <div className="pricing-card glass-card featured">
              <div className="popular-badge">BEST VALUE</div>
              <h3>Pro Booster</h3>
              <div className="price-tag">$19</div>
              <p className="plan-desc">+500 AI Credits</p>
              <button className="btn btn-primary btn-block" onClick={() => addCredits(500)}>
                Add 500 Credits Instant
              </button>
            </div>

            <div className="pricing-card glass-card">
              <h3>Mega Pack</h3>
              <div className="price-tag">$49</div>
              <p className="plan-desc">+1500 AI Credits</p>
              <button className="btn btn-secondary btn-block" onClick={() => addCredits(1500)}>
                Add 1500 Credits Instant
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .dashboard-container {
          padding-top: 2rem;
          padding-bottom: 4rem;
        }

        .tab-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .tab-header h2 {
          font-size: 2rem;
        }

        .tab-header p {
          color: var(--text-secondary);
        }

        .filter-chips {
          display: flex;
          gap: 0.5rem;
          max-width: 100%;
          overflow-x: auto;
          padding-bottom: 4px;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }

        .filter-chips::-webkit-scrollbar {
          display: none;
        }

        .filter-btn {
          white-space: nowrap;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-glass);
          color: var(--text-secondary);
          padding: 0.4rem 1rem;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
        }

        .filter-btn.active {
          background: var(--accent-purple);
          color: #fff;
        }

        /* Feed Grid */
        .feed-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .feed-card {
          padding: 0;
          overflow: hidden;
        }

        .card-media {
          position: relative;
          height: 240px;
        }

        .card-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .video-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: rgba(0, 0, 0, 0.8);
          color: var(--accent-cyan);
          font-size: 0.75rem;
          font-weight: bold;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
        }

        .type-badge {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: rgba(0, 0, 0, 0.8);
          color: #fff;
          font-size: 0.7rem;
          padding: 0.2rem 0.5rem;
          border-radius: var(--radius-sm);
        }

        .card-content {
          padding: 1.2rem;
        }

        .prompt-text {
          color: var(--text-muted);
          font-size: 0.85rem;
          font-style: italic;
          margin: 0.4rem 0 1rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .remix-btn {
          background: rgba(139, 92, 246, 0.15);
          border: 1px solid rgba(139, 92, 246, 0.3);
          color: var(--accent-purple);
          padding: 0.3rem 0.7rem;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
        }

        /* Studio Workspace Layout */
        .studio-layout {
          display: grid;
          grid-template-columns: 360px 1fr;
          gap: 1.5rem;
          min-height: 640px;
        }

        .studio-sidebar {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .tool-selector {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.4rem;
          background: rgba(0, 0, 0, 0.3);
          padding: 4px;
          border-radius: var(--radius-md);
        }

        .tool-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          padding: 0.6rem;
          font-size: 0.82rem;
          font-weight: 600;
          border-radius: var(--radius-sm);
          cursor: pointer;
        }

        .tool-btn.active {
          background: var(--gradient-primary);
          color: #fff;
        }

        .tool-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .form-field label {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .form-field textarea, .form-field input, .form-field select {
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid var(--border-glass);
          border-radius: var(--radius-sm);
          padding: 0.7rem;
          color: #fff;
          font-size: 0.9rem;
          outline: none;
        }

        .preset-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.4rem;
        }

        .preset-btn {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-glass);
          color: var(--text-muted);
          padding: 0.4rem;
          font-size: 0.75rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
        }

        .preset-btn.active {
          border-color: var(--accent-purple);
          color: #fff;
          background: rgba(139, 92, 246, 0.2);
        }

        .ratio-options {
          display: flex;
          gap: 0.4rem;
        }

        .ratio-btn {
          flex: 1;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-glass);
          color: var(--text-muted);
          padding: 0.4rem;
          font-size: 0.75rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
        }

        .ratio-btn.active {
          background: var(--accent-cyan);
          color: #000;
          font-weight: bold;
        }

        /* Studio Canvas Right */
        .studio-canvas {
          padding: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .canvas-placeholder, .canvas-loading {
          text-align: center;
          max-width: 400px;
        }

        .placeholder-icon, .spinner {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .spinner {
          animation: spin 1s infinite linear;
          color: var(--accent-purple);
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .progress-bar-track {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          margin-top: 1.5rem;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background: var(--gradient-primary);
          transition: width 0.3s ease;
        }

        .canvas-output {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .output-media-frame {
          flex: 1;
          min-height: 400px;
          background: #000;
          border-radius: var(--radius-md);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .output-media-frame img, .output-media-frame video {
          max-width: 100%;
          max-height: 500px;
          object-fit: contain;
        }

        .output-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }

        .output-actions {
          display: flex;
          gap: 0.8rem;
        }

        .empty-assets {
          text-align: center;
          padding: 5rem 2rem;
        }

        .empty-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        @media (max-width: 900px) {
          .studio-layout {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          .studio-canvas {
            padding: 1.5rem;
          }
        }

        @media (max-width: 600px) {
          .dashboard-container {
            padding-top: 1rem;
            padding-bottom: 2rem;
          }
          .tab-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.8rem;
            margin-bottom: 1.2rem;
          }
          .tab-header h2 {
            font-size: 1.5rem;
          }
          .feed-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .studio-sidebar {
            padding: 1.25rem;
          }
          .output-controls {
            flex-direction: column;
            align-items: stretch;
          }
          .output-actions {
            flex-direction: column;
            width: 100%;
          }
          .output-actions .btn {
            width: 100%;
          }
          .output-media-frame {
            min-height: 260px;
          }
        }
      `}</style>
    </div>
  );
}
