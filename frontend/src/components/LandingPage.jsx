import React, { useState, useEffect, useRef } from 'react';
import { navigateToApp } from '../utils/subdomainRouter';
import { useAuth } from '../context/AuthContext';

const RESEARCH_ARTICLES = [
  {
    id: 'bharat-cinema-engine',
    title: 'Dizi-Bharat Cinema Engine: AI Video & Scene Synthesis for Indian Filmmakers',
    date: 'Aug 02, 2026',
    tag: 'Indian Film & Media AI',
    readTime: '🔥 4 Min Read',
    views: '👁️ 28.5K Indian Creators',
    likes: 2840,
    trendingBadge: '🇮🇳 #1 Trending in India',
    ctaText: 'Read Deep Dive ↗',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
    summary: 'Empowering Bollywood, Tollywood, and Indian YouTube creators with real-time AI visual rendering, traditional lighting setups, and automated cinematic color grading.',
    sections: [
      {
        heading: 'Executive Summary',
        content: 'The Dizi-Bharat Cinema Engine is designed specifically for the Indian visual storytelling ecosystem. From grand period dramas to high-octane action sequences, creators can generate cinematic scene previews and VFX background plates with sub-50ms latency.'
      },
      {
        heading: 'Vernacular Lighting & Heritage Color Grading',
        content: 'Native rendering support for Indian golden-hour sun flares, traditional brass diya lighting, festive fireworks glow, and vibrant monsoon atmosphere presets tailored for regional cinema visual aesthetics.'
      },
      {
        heading: 'Key Technical Innovations for Indian Studios',
        bullets: [
          'Multi-lingual Prompting: Accepts scene prompts in Hindi, Tamil, Telugu, Marathi, and English.',
          'Zero-Buffer Real-Time Streaming: Live visual preview at 60 FPS for instant on-set storyboarding.',
          'Custom Preset Library: Includes lighting styles inspired by Indian cinematic classics.'
        ]
      }
    ]
  },
  {
    id: 'devanagari-vernacular-ai',
    title: 'Dizi-Diffusion 2.5: Devanagari & Indian Regional Vernacular Poster AI Engine',
    date: 'Jul 26, 2026',
    tag: 'Vernacular Graphic AI',
    readTime: '⚡ 3 Min Read',
    views: '👁️ 34.2K Indian Designers',
    likes: 3190,
    trendingBadge: '🇮🇳 Festival Special',
    ctaText: 'Explore Vernacular Model ↗',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80',
    summary: 'The world\'s first AI engine fine-tuned for crisp Devanagari, Tamil, Telugu, and Gujarati typography overlays on festive posters, greeting cards, and Indian brand graphics.',
    sections: [
      {
        heading: 'Zero-Artifact Vernacular Typography',
        content: 'Dizi-Diffusion 2.5 solves script distortion in AI graphic generation, outputting pristine Devanagari, Gurmukhi, Kannada, and Bengali characters directly on poster visual layouts.'
      },
      {
        heading: 'Festive Poster & Brand Synthesis',
        content: 'Instant poster creation for major Indian festivals including Diwali, Ganesh Chaturthi, Holi, Eid, Navratri, and Independence Day with automated brand logo integration.'
      },
      {
        heading: 'Direct SVG Vector Curve Export',
        content: 'Extract scalable vector meshes directly into Adobe Illustrator, Photoshop, or Canva for rapid commercial printing and digital campaign publishing.'
      }
    ]
  },
  {
    id: 'cricket-sports-engine',
    title: 'AI Cricket & Indian Sports Graphics Engine: Real-Time Action Visual Synthesis',
    date: 'Jul 14, 2026',
    tag: 'Indian Sports & Culture',
    readTime: '⏱️ 5 Min Read',
    views: '👁️ 42.9K Sports Fans',
    likes: 4520,
    trendingBadge: '🇮🇳 IPL & Matchday Visuals',
    ctaText: 'Generate Action Graphics ↗',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80',
    summary: 'High-impact real-time action sports poster generator engineered for IPL match promos, cricket fan artwork, and dynamic athlete graphics.',
    sections: [
      {
        heading: 'Cricket Stadium Lighting & Atmosphere',
        content: 'Generate hyper-realistic floodlight atmospheres, crowd stadium banners, night match glare, and dramatic bowler/batsman action motion blurs in milliseconds.'
      },
      {
        heading: 'Matchday Social Media Automation',
        content: 'Indian sports media teams and fan pages can create instant match-day graphics, player achievement milestone posters, and live scorecard banners automatically.'
      }
    ]
  },
  {
    id: 'ethnic-fashion-visualizer',
    title: 'Dizi-Ethnic AI Fashion: Real-Time Saree, Sherwani & Indian Apparel Studio',
    date: 'Jun 30, 2026',
    tag: 'Indian Fashion & E-Commerce',
    readTime: '✨ 4 Min Read',
    views: '👁️ 31.7K Brand Marketers',
    likes: 3810,
    trendingBadge: '🇮🇳 Royal Ethnic Fashion',
    ctaText: 'Try Fashion Studio ↗',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80',
    summary: 'AI visual model tailored for Indian fashion brands, wedding designers, and apparel stores to render high-resolution ethnic wear on virtual models instantly.',
    sections: [
      {
        heading: 'Zari & Silk Fabric Precision',
        content: 'Captures intricate Kanjivaram silk weaves, Banarasi zari gold threads, Chikankari embroidery, and royal wedding sherwani embroidery with macro texture fidelity.'
      },
      {
        heading: 'Virtual Indian Studio Lighting',
        content: 'Simulate palace heritage backdrops, festive lighting setups, and studio model poses for instant e-commerce catalog visual generation.'
      }
    ]
  }
];

export function LandingPage({ landingPageNav = 'home', setLandingPageNav }) {
  const { setAuthModalOpen } = useAuth();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedResearchArticle, setSelectedResearchArticle] = useState(null);
  const [likedArticles, setLikedArticles] = useState({});
  const [bookmarkedArticles, setBookmarkedArticles] = useState({});
  const [isMuted, setIsMuted] = useState(true);
  const [isResearchMuted, setIsResearchMuted] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRef = useRef(null);
  const researchVideoRef = useRef(null);

  // Play video on navigation change
  useEffect(() => {
    if (landingPageNav === 'research' && researchVideoRef.current) {
      researchVideoRef.current.play().catch(e => console.log('Research video autoplay blocked:', e));
    }
  }, [landingPageNav]);

  // Play/pause video based on scroll visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              videoRef.current.play().catch(e => console.log('Autoplay blocked:', e));
            } else {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.1 } // Play when at least 10% visible
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  // Ghost prompt typewriter settings
  const GHOST_PROMPTS = [
    "Glowing bioluminescent alien planet",
    "Neon cyberpunk city rain",
    "Luxury modern infinity pool",
    "Mythical crystal dragon hatching",
    "Majestic golden eagle soaring"
  ];

  const [ghostPromptIndex, setGhostPromptIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTypingForward, setIsTypingForward] = useState(true);
  const [userPrompt, setUserPrompt] = useState('');
  const [isInteracted, setIsInteracted] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Blinking cursor effect
  useEffect(() => {
    if (isInteracted) return;
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, [isInteracted]);

  // Character-by-character ghost typing effect
  useEffect(() => {
    if (isInteracted) return;

    const currentFullPrompt = GHOST_PROMPTS[ghostPromptIndex];
    let timer;

    if (isTypingForward) {
      if (charIndex < currentFullPrompt.length) {
        timer = setTimeout(() => {
          setCharIndex((prev) => prev + 1);
        }, 45);
      } else {
        // Pause at full sentence before backspacing
        timer = setTimeout(() => {
          setIsTypingForward(false);
        }, 2800);
      }
    } else {
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setCharIndex((prev) => prev - 1);
        }, 20);
      } else {
        setIsTypingForward(true);
        setGhostPromptIndex((prev) => (prev + 1) % GHOST_PROMPTS.length);
      }
    }

    return () => clearTimeout(timer);
  }, [charIndex, isTypingForward, ghostPromptIndex, isInteracted]);

  // When user clicks/focuses the prompt box, complete the active sentence instantly
  const handleBoxInteraction = () => {
    if (!isInteracted) {
      setIsInteracted(true);
      setUserPrompt(GHOST_PROMPTS[ghostPromptIndex]);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsTransitioning(true);

    // Allow the wide-screen popup animation to finish before navigating
    setTimeout(() => {
      navigateToApp('create');
    }, 700);
  };

  // Using the local video placed in the public directory
  const DUMMY_VIDEO_URL = "/0723_gwr_video_mvp.mp4";

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

      {/* Home / Hero Page View */}
      {(landingPageNav === 'home' || !landingPageNav) && (
        <section className="hero-section">
          <video
            ref={videoRef}
            className="hero-video-bg"
            autoPlay
            loop
            muted={isMuted}
            playsInline
          >
            <source src={DUMMY_VIDEO_URL} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="hero-video-overlay"></div>

          {/* Audio Toggle Button */}
          <button
            className="video-audio-toggle"
            onClick={(e) => {
              e.stopPropagation();
              setIsMuted(!isMuted);
            }}
            title={isMuted ? "Unmute Video" : "Mute Video"}
          >
            {isMuted ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <line x1="23" y1="9" x2="17" y2="15"></line>
                <line x1="17" y1="9" x2="23" y2="15"></line>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
            )}
          </button>

          <div className="container hero-content">
            <span className="hero-brand-tag">DiziPix AI</span>

            <h1 className="hero-main-title">
              Where Your Imagination Becomes Reality
            </h1>

            <p className="hero-main-subtitle">
              Create breathtaking AI images and cinematic videos in seconds—no limits, just your creativity.
            </p>

            <form
              className="hero-prompt-bar"
              onSubmit={handleFormSubmit}
              onClick={handleBoxInteraction}
            >
              <input
                type="text"
                className={`hero-prompt-input ${!isInteracted ? 'ghost-active' : ''}`}
                value={
                  isInteracted
                    ? userPrompt
                    : GHOST_PROMPTS[ghostPromptIndex].substring(0, charIndex) + (showCursor ? '|' : '')
                }
                onChange={(e) => {
                  setIsInteracted(true);
                  setUserPrompt(e.target.value.replace(/\|$/, ''));
                }}
                onFocus={handleBoxInteraction}
                placeholder="Type your prompt..."
              />
              <button type="submit" className={`hero-create-btn ${isTransitioning ? 'animate-click' : ''}`}>
                Create &rarr;
                <div className={`page-transition-cover ${isTransitioning ? 'active' : ''}`}></div>
              </button>
            </form>
          </div>
        </section>
      )}

      {/* PixVerse Style Research Page View with Site-Related Background Video */}
      {landingPageNav === 'research' && (
        <div className="research-page-wrapper">
          <div className="research-hero-banner">
            <video
              ref={researchVideoRef}
              className="research-video-bg"
              autoPlay
              loop
              muted={isResearchMuted}
              playsInline
              poster="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80"
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-neural-network-nodes-in-abstract-space-42829-large.mp4" type="video/mp4" />
              <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-network-lines-and-dots-42999-large.mp4" type="video/mp4" />
              <source src="https://cdn.pixabay.com/video/2021/04/12/70918-536485078_large.mp4" type="video/mp4" />
            </video>
            <div className="research-video-overlay"></div>

            {/* Audio Toggle Button */}
            <button
              className="video-audio-toggle"
              onClick={(e) => {
                e.stopPropagation();
                setIsResearchMuted(!isResearchMuted);
              }}
              title={isResearchMuted ? "Unmute Video" : "Mute Video"}
              style={{ zIndex: 10 }}
            >
              {isResearchMuted ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <line x1="23" y1="9" x2="17" y2="15"></line>
                  <line x1="17" y1="9" x2="23" y2="15"></line>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
              )}
            </button>

            <div className="container research-hero-content">
              <span className="research-eyebrow">DiziPix Research</span>
              <h2>Imagine. Build. Express. Play.</h2>
              <p>
                DiziPix's in-house AI video & visual research built to help every creative idea find its form.
                We develop real-time world models, continuous interactive video streams, and high-fidelity latent diffusion engines.
              </p>
            </div>
          </div>

          <section id="research" className="section container research-section">
            <div className="research-articles-header">
              <h3>Latest Research</h3>
            </div>

            <div className="research-articles-list">
              {RESEARCH_ARTICLES.map((article) => {
                const isLiked = likedArticles[article.id];
                const isBookmarked = bookmarkedArticles[article.id];
                const currentLikes = (article.likes || 0) + (isLiked ? 1 : 0);

                return (
                  <div
                    key={article.id}
                    className="research-article-card indian-interactive-card"
                  >
                    <div
                      className="research-article-content"
                      onClick={() => setSelectedResearchArticle(article)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="card-top-badges">
                        <span className="trending-badge">{article.trendingBadge}</span>
                        <span className="read-time-badge">{article.readTime}</span>
                        <span className="views-badge">{article.views}</span>
                      </div>

                      <h4>{article.title}</h4>
                      <p>{article.summary}</p>

                      <div className="research-article-meta">
                        <span className="research-tag">{article.tag}</span>
                        <span>{article.date}</span>
                        <span style={{ marginLeft: 'auto', color: '#c084fc', fontWeight: '700' }}>
                          {article.ctaText}
                        </span>
                      </div>
                    </div>

                    <div
                      className="research-article-image"
                      onClick={() => setSelectedResearchArticle(article)}
                      style={{ cursor: 'pointer' }}
                    >
                      <img src={article.image} alt={article.title} />
                      <div className="card-image-overlay">
                        <button
                          className={`card-action-btn ${isLiked ? 'active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setLikedArticles(prev => ({ ...prev, [article.id]: !prev[article.id] }));
                          }}
                          title="Like Article"
                        >
                          {isLiked ? '❤️' : '🤍'} {currentLikes}
                        </button>
                        <button
                          className={`card-action-btn ${isBookmarked ? 'active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setBookmarkedArticles(prev => ({ ...prev, [article.id]: !prev[article.id] }));
                          }}
                          title="Bookmark Article"
                        >
                          {isBookmarked ? '🔖 Saved' : '🔖 Save'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Research Article In-Site Modal */}
          {selectedResearchArticle && (
            <div className="modal-overlay" onClick={() => setSelectedResearchArticle(null)}>
              <div
                className="research-modal-card animate-slide-up"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="research-modal-close"
                  onClick={() => setSelectedResearchArticle(null)}
                  aria-label="Close modal"
                >
                  ✕
                </button>

                <div className="research-modal-header">
                  <div className="card-top-badges" style={{ marginBottom: '0.8rem' }}>
                    <span className="trending-badge">{selectedResearchArticle.trendingBadge}</span>
                    <span className="read-time-badge">{selectedResearchArticle.readTime}</span>
                    <span className="views-badge">{selectedResearchArticle.views}</span>
                  </div>

                  <div className="research-modal-meta">
                    <span className="research-tag">{selectedResearchArticle.tag}</span>
                    <span className="research-modal-date">{selectedResearchArticle.date}</span>
                  </div>
                  <h2>{selectedResearchArticle.title}</h2>
                </div>

                <div className="research-modal-image-container">
                  <img src={selectedResearchArticle.image} alt={selectedResearchArticle.title} />
                </div>

                <div className="research-modal-body">
                  <p className="research-modal-lead">{selectedResearchArticle.summary}</p>

                  {selectedResearchArticle.sections.map((sec, idx) => (
                    <div key={idx} className="research-modal-section">
                      <h3>{sec.heading}</h3>
                      {sec.content && <p>{sec.content}</p>}
                      {sec.bullets && (
                        <ul>
                          {sec.bullets.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>

                <div className="research-modal-footer">
                  <button
                    className={`btn btn-secondary ${likedArticles[selectedResearchArticle.id] ? 'active' : ''}`}
                    onClick={() => {
                      setLikedArticles(prev => ({ ...prev, [selectedResearchArticle.id]: !prev[selectedResearchArticle.id] }));
                    }}
                  >
                    {likedArticles[selectedResearchArticle.id] ? '❤️ Liked' : '🤍 Like'}
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setSelectedResearchArticle(null)}
                  >
                    Close Article
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setSelectedResearchArticle(null);
                      navigateToApp('create');
                    }}
                  >
                    Try in Studio ✨
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* AI Tools View */}
      {landingPageNav === 'tools' && (
        <section id="tools" className="section container">
          <div className="section-header">
            <span className="badge badge-pink">All-In-One Studio</span>
            <h2>Four Powerful AI Tools in One Platform</h2>
            <p>Everything you need to produce stunning brand visuals, logos, flyers, and video content</p>
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
      )}

      {/* Blog View */}
      {landingPageNav === 'blog' && (
        <section id="blog" className="section container">
          <div className="section-header">
            <span className="badge badge-cyan">Insights & Guides</span>
            <h2>Latest AI Design Articles</h2>
            <p>Tutorials, engineering deep-dives, and prompt design strategies from our team</p>
          </div>

          <div className="features-grid">
            <div className="feature-card glass-card">
              <div className="card-icon">📖</div>
              <h3>Mastering AI Poster Design in 2026</h3>
              <p>Learn how to write effective lighting, composition, and color palette prompts to generate professional movie-grade posters.</p>
              <div className="card-footer-link" onClick={() => navigateToApp('create')}>Read Article &rarr;</div>
            </div>

            <div className="feature-card glass-card">
              <div className="card-icon">🎨</div>
              <h3>Vector Logos vs Pixel AI Marks</h3>
              <p>Why scalable SVG vectors matter for modern corporate brand identity and how DiziPix generates crisp 3D emblems.</p>
              <div className="card-footer-link" onClick={() => navigateToApp('create')}>Read Article &rarr;</div>
            </div>

            <div className="feature-card glass-card">
              <div className="card-icon">🎥</div>
              <h3>The Architecture Behind 60fps AI Video</h3>
              <p>An inside look at our temporal attention mechanism and frame consistency algorithms for motion generation.</p>
              <div className="card-footer-link" onClick={() => navigateToApp('create')}>Read Article &rarr;</div>
            </div>
          </div>
        </section>
      )}

      {/* Community View */}
      {landingPageNav === 'community' && (
        <section id="community" className="section container">
          <div className="section-header">
            <span className="badge badge-cyan">Made with DiziPix</span>
            <h2>Created by Our Global Community</h2>
            <p>Explore stunning creations generated daily by creators worldwide</p>
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
      )}

      {/* Contact View */}
      {landingPageNav === 'contact' && (
        <section id="contact" className="section container">
          <div className="section-header">
            <span className="badge badge-pink">Get in Touch</span>
            <h2>Contact Us & Sales Inquiry</h2>
            <p>Have questions, custom enterprise needs, or feedback? Send us a message below.</p>
          </div>

          <div className="glass-panel" style={{ maxWidth: '680px', margin: '0 auto', padding: '2.5rem' }}>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for reaching out! Our team will contact you shortly.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Your Name</label>
                <input type="text" placeholder="e.g. Alex Rivera" required style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '1rem' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Email Address</label>
                <input type="email" placeholder="alex@company.com" required style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '1rem' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Message / Inquiry</label>
                <textarea rows="4" placeholder="How can we help you?" required style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '1rem', resize: 'vertical' }}></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-block" style={{ padding: '0.9rem', fontSize: '1rem', marginTop: '0.5rem' }}>
                ✉️ Send Message
              </button>
            </form>
          </div>
        </section>
      )}

      {/* Footer CTA */}
      <footer className="footer-section">
        <div className="container footer-content">
          <div className="footer-brand">
            <div className="brand-logo" onClick={() => setLandingPageNav && setLandingPageNav('home')} style={{ cursor: 'pointer' }}>
              <span className="logo-text">Dizi<span className="logo-accent">Pix</span>.ai</span>
            </div>
            <p>The ultimate AI visual & video generator suite.</p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter (X)">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="YouTube">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div className="link-col">
              <h5>Navigation</h5>
              <a href="#research" onClick={(e) => { e.preventDefault(); setLandingPageNav && setLandingPageNav('research'); }}>Research</a>
              <a href="#tools" onClick={(e) => { e.preventDefault(); setLandingPageNav && setLandingPageNav('tools'); }}>Tools</a>
              <a href="#blog" onClick={(e) => { e.preventDefault(); setLandingPageNav && setLandingPageNav('blog'); }}>Blog</a>
              <a href="#community" onClick={(e) => { e.preventDefault(); setLandingPageNav && setLandingPageNav('community'); }}>Community</a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); setLandingPageNav && setLandingPageNav('contact'); }}>Contact</a>
            </div>

            <div className="link-col">
              <h5>Tools</h5>
              <a href="#tools">Poster Maker</a>
              <a href="#tools">Logo Designer</a>
              <a href="#tools">Flyer Crafter</a>
              <a href="#tools">AI Video Engine</a>
            </div>

            <div className="link-col">
              <h5>Contact & Support</h5>
              <a href="mailto:support@dizipix.ai" className="footer-contact-item">
                support@dizipix.ai
              </a>
              <a href="#contact" className="footer-contact-item">
                Feedback
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom container">
          <p>&copy; {new Date().getFullYear()} DiziPix.ai. All rights reserved.</p>
        </div>
      </footer>

      <style>{`
        .landing-container {
          position: relative;
          overflow: hidden;
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
          position: relative;
          min-height: 85vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6rem 1rem 5rem;
          text-align: center;
          overflow: hidden;
        }

        .hero-video-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: fill;
          z-index: 0;
          pointer-events: none;
        }

        .hero-video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, rgba(8, 9, 13, 0.4) 0%, rgba(8, 9, 13, 0.9) 100%);
          z-index: 1;
        }

        .video-audio-toggle {
          position: absolute;
          bottom: 30px;
          right: 30px;
          z-index: 10;
          background: rgba(15, 17, 26, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .video-audio-toggle:hover {
          background: rgba(139, 92, 246, 0.4);
          transform: scale(1.1);
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 960px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-brand-tag {
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 4px;
          // text-transform: uppercase;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 1.5rem;
        }

        .hero-main-title {
          font-size: clamp(2.4rem, 5vw, 4.2rem);
          font-weight: 800;
          color: #ffffff;
          line-height: 1.15;
          margin: 0 auto 1.5rem;
          max-width: 920px;
          letter-spacing: -0.02em;
          text-shadow: 0 4px 24px rgba(0, 0, 0, 0.6);
        }

        .hero-main-subtitle {
          font-size: clamp(1rem, 1.8vw, 1.25rem);
          color: rgba(255, 255, 255, 0.75);
          max-width: 720px;
          line-height: 1.6;
          margin: 0 auto 3rem;
          font-weight: 300;
        }

        .hero-prompt-bar {
          display: flex;
          align-items: center;
          width: 100%;
          max-width: 620px;
          background: rgba(12, 14, 24, 0.6);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 9999px;
          padding: 6px 8px 6px 22px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .hero-prompt-bar:focus-within {
          border-color: rgba(255, 255, 255, 0.4);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 78, 136, 0.2);
        }

        .hero-prompt-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #ffffff;
          font-size: 1rem;
          padding: 0.6rem 0.5rem;
          font-family: inherit;
        }

        .hero-prompt-input.ghost-active {
          color: rgba(255, 255, 255, 0.78);
          font-style: italic;
        }

        .hero-prompt-input::placeholder {
          color: rgba(255, 255, 255, 0.45);
        }

        .hero-create-btn {
          position: relative;
          background: linear-gradient(135deg, #ff4e88 0%, #a855f7 100%);
          color: #ffffff;
          border: none;
          border-radius: 9999px;
          padding: 0.75rem 1.8rem;
          font-size: 0.98rem;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
          box-shadow: 0 4px 18px rgba(255, 78, 136, 0.4);
          overflow: visible;
        }

        .hero-create-btn:hover {
          transform: translateY(-1px);
          filter: brightness(1.1);
          box-shadow: 0 6px 24px rgba(255, 78, 136, 0.55);
        }

        .hero-create-btn:active {
          transform: scale(0.95);
        }

        .hero-create-btn.animate-click {
          transform: scale(0.9);
          transition: transform 0.1s;
        }

        .page-transition-cover {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, #ff4e88 0%, #a855f7 70%, #6366f1 100%);
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0);
          opacity: 0;
          pointer-events: none;
          z-index: 9999;
          transition: transform 0.7s cubic-bezier(0.8, 0, 0.2, 1), opacity 0.4s ease-out;
        }

        .page-transition-cover.active {
          transform: translate(-50%, -50%) scale(50);
          opacity: 1;
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

        .social-links {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 1.2rem;
        }

        .social-icon {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-glass);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
          text-decoration: none;
        }

        .social-icon:hover {
          background: var(--gradient-primary);
          color: #ffffff;
          border-color: transparent;
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(139, 92, 246, 0.35);
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

        .footer-contact-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--text-muted);
          text-decoration: none;
          font-size: 0.9rem;
          transition: var(--transition-fast);
        }

        .footer-contact-item:hover {
          color: var(--accent-cyan);
        }

        .footer-bottom {
          text-align: center;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          color: var(--text-muted);
          font-size: 0.85rem;
        }

        @media (max-width: 900px) {
          .hero-main-title {
            font-size: clamp(2.2rem, 6vw, 3rem);
          }
          .hero-prompt-bar {
            max-width: 90%;
          }
          .features-grid, .showcase-grid, .pricing-grid {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          }
        }

        @media (max-width: 640px) {
          .landing-container {
            padding-top: 0;
          }
          .hero-section {
            padding: 4rem 1rem 3rem;
            min-height: 80vh;
          }
          .hero-main-title {
            font-size: clamp(1.8rem, 8vw, 2.2rem);
            line-height: 1.2;
            margin-bottom: 1rem;
          }
          .hero-main-subtitle {
            font-size: 1rem;
            margin-bottom: 2rem;
            padding: 0 0.5rem;
          }
          .hero-prompt-bar {
            flex-direction: column;
            border-radius: var(--radius-lg);
            padding: 1rem;
            width: 100%;
            max-width: 100%;
          }
          .hero-prompt-input {
            width: 100%;
            text-align: center;
            margin-bottom: 0.8rem;
          }
          .hero-create-btn {
            width: 100%;
            padding: 0.8rem;
          }
          .video-audio-toggle {
            bottom: 15px;
            right: 15px;
            width: 40px;
            height: 40px;
          }
          .section {
            padding: 3.5rem 0;
          }
          .section-header {
            margin-bottom: 2rem;
          }
          .section-header h2 {
            font-size: 1.8rem;
          }
          .section-header p {
            font-size: 0.95rem;
          }
          .features-grid, .showcase-grid, .pricing-grid {
            grid-template-columns: 1fr;
            gap: 1.2rem;
          }
          .feature-card, .pricing-card {
            padding: 1.5rem;
          }
          .price-tag {
            font-size: 2.4rem;
          }
          .footer-section {
            padding: 3rem 0 1.5rem;
            margin-top: 2rem;
          }
          .footer-content {
            flex-direction: column;
            gap: 2rem;
          }
          .footer-links {
            flex-direction: column;
            gap: 1.5rem;
          }
        }

        /* PixVerse Style Research Page Styles */
        .research-page-wrapper {
          position: relative;
        }

        .research-hero-banner {
          position: relative;
          min-height: 480px;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding: 6rem 0 4rem;
          margin-bottom: 2rem;
        }

        .research-video-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
          filter: brightness(0.65) contrast(1.1);
        }

        .research-video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, rgba(8, 9, 13, 0.45) 0%, rgba(8, 9, 13, 0.88) 75%, #08090d 100%),
                      radial-gradient(circle at 30% 50%, rgba(139, 92, 246, 0.25) 0%, transparent 60%);
          z-index: 1;
        }

        .research-hero-content {
          position: relative;
          z-index: 2;
          max-width: 820px;
        }

        .research-hero-content .research-eyebrow {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #c084fc;
          background: rgba(139, 92, 246, 0.25);
          border: 1px solid rgba(168, 85, 247, 0.4);
          padding: 0.35rem 1rem;
          border-radius: 9999px;
          display: inline-block;
          margin-bottom: 1.2rem;
          backdrop-filter: blur(8px);
        }

        .research-hero-content h2 {
          font-size: 3.8rem;
          line-height: 1.08;
          font-weight: 800;
          margin-bottom: 1.2rem;
          color: #ffffff;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
        }

        .research-hero-content p {
          font-size: 1.25rem;
          color: rgba(248, 250, 252, 0.88);
          line-height: 1.7;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
        }

        .research-section {
          padding: 2rem 0 5rem;
          position: relative;
        }

        .research-hero-box {
          margin-bottom: 4rem;
          text-align: left;
          max-width: 800px;
        }

        .research-hero-box .research-eyebrow {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--accent-purple);
          margin-bottom: 0.8rem;
          display: inline-block;
        }

        .research-hero-box h2 {
          font-size: 3.5rem;
          line-height: 1.1;
          font-weight: 800;
          margin-bottom: 1.2rem;
          background: linear-gradient(135deg, #ffffff 0%, #a855f7 50%, #6366f1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .research-hero-box p {
          font-size: 1.2rem;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        .research-articles-header {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 2.5rem;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .research-articles-header h3 {
          font-size: 2rem;
          font-weight: 700;
        }

        .research-articles-list {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .research-article-card {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 2.5rem;
          align-items: center;
          padding: 2.2rem;
          background: rgba(18, 20, 29, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          color: inherit;
        }

        /* Indian Interactive Research Card Styles */
        .indian-interactive-card {
          position: relative;
          background: linear-gradient(135deg, rgba(20, 23, 36, 0.8) 0%, rgba(12, 14, 22, 0.95) 100%);
          border: 1px solid rgba(168, 85, 247, 0.3);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .indian-interactive-card:hover {
          border-color: rgba(245, 158, 11, 0.6);
          box-shadow: 0 16px 40px rgba(245, 158, 11, 0.15), 0 0 25px rgba(168, 85, 247, 0.2);
          transform: translateY(-5px);
        }

        .card-top-badges {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 0.9rem;
          flex-wrap: wrap;
        }

        .trending-badge {
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(234, 88, 12, 0.25) 100%);
          color: #fbbf24;
          border: 1px solid rgba(245, 158, 11, 0.45);
          font-size: 0.78rem;
          font-weight: 700;
          padding: 0.25rem 0.7rem;
          border-radius: 9999px;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }

        .read-time-badge, .views-badge {
          background: rgba(255, 255, 255, 0.06);
          color: #cbd5e1;
          border: 1px solid rgba(255, 255, 255, 0.12);
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.25rem 0.65rem;
          border-radius: 9999px;
        }

        .card-image-overlay {
          position: absolute;
          bottom: 10px;
          right: 10px;
          display: flex;
          gap: 0.5rem;
          z-index: 2;
        }

        .card-action-btn {
          background: rgba(15, 17, 26, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #f1f5f9;
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.35rem 0.75rem;
          border-radius: 9999px;
          cursor: pointer;
          backdrop-filter: blur(8px);
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .card-action-btn:hover {
          background: rgba(168, 85, 247, 0.3);
          border-color: rgba(168, 85, 247, 0.5);
          transform: scale(1.05);
        }

        .card-action-btn.active {
          background: rgba(239, 68, 68, 0.25);
          border-color: rgba(239, 68, 68, 0.5);
          color: #fca5a5;
        }

        .research-article-content h4 {
          font-size: 1.8rem;
          line-height: 1.3;
          margin-bottom: 1rem;
          color: #ffffff;
          transition: color 0.2s ease;
        }

        .research-article-card:hover .research-article-content h4 {
          color: #c084fc;
        }

        .research-article-content p {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .research-article-meta {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .research-tag {
          background: rgba(139, 92, 246, 0.15);
          color: #c084fc;
          border: 1px solid rgba(139, 92, 246, 0.3);
          padding: 0.25rem 0.75rem;
          border-radius: 6px;
          font-weight: 600;
        }

        .research-article-image {
          height: 200px;
          width: 100%;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .research-article-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .research-article-card:hover .research-article-image img {
          transform: scale(1.06);
        }

        /* Research Modal Styles */
        .research-modal-card {
          background: rgba(15, 17, 26, 0.95);
          border: 1px solid rgba(168, 85, 247, 0.3);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(168, 85, 247, 0.2);
          border-radius: 20px;
          width: 100%;
          max-width: 780px;
          max-height: 85vh;
          overflow-y: auto;
          position: relative;
          padding: 2.5rem;
          color: #f1f5f9;
          backdrop-filter: blur(16px);
          z-index: 100001;
          margin: auto;
        }

        .research-modal-card::-webkit-scrollbar {
          width: 6px;
        }

        .research-modal-card::-webkit-scrollbar-track {
          background: transparent;
          margin: 18px 0;
        }

        .research-modal-card::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.4);
          border-radius: 9999px;
        }

        .research-modal-card::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.8);
        }

        .research-modal-close {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #94a3b8;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          font-size: 1.1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .research-modal-close:hover {
          background: rgba(239, 68, 68, 0.2);
          border-color: rgba(239, 68, 68, 0.4);
          color: #f87171;
        }

        .research-modal-header {
          margin-bottom: 1.5rem;
          padding-right: 2.5rem;
        }

        .research-modal-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .research-modal-date {
          color: #94a3b8;
          font-size: 0.9rem;
        }

        .research-modal-header h2 {
          font-size: 1.8rem;
          line-height: 1.3;
          color: #ffffff;
          font-weight: 800;
        }

        .research-modal-image-container {
          width: 100%;
          height: 260px;
          border-radius: 14px;
          overflow: hidden;
          margin-bottom: 1.8rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .research-modal-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .research-modal-body {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          color: #cbd5e1;
          line-height: 1.7;
        }

        .research-modal-lead {
          font-size: 1.1rem;
          font-weight: 500;
          color: #e2e8f0;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .research-modal-section h3 {
          font-size: 1.25rem;
          color: #c084fc;
          font-weight: 700;
          margin-bottom: 0.6rem;
        }

        .research-modal-section ul {
          padding-left: 1.2rem;
          margin-top: 0.5rem;
        }

        .research-modal-section li {
          margin-bottom: 0.4rem;
        }

        .research-modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 2rem;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        @media (max-width: 900px) {
          .research-article-card {
            grid-template-columns: 1fr;
          }
          .research-article-image {
            height: 220px;
            order: -1;
          }
          .research-hero-box h2 {
            font-size: 2.5rem;
          }
          .research-modal-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
