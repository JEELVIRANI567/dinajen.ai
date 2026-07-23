import React, { useState, useEffect, useRef } from 'react';
import { navigateToApp } from '../utils/subdomainRouter';
import { useAuth } from '../context/AuthContext';

export function LandingPage() {
  const { setAuthModalOpen } = useAuth();
  const [activeCategory, setActiveCategory] = useState('all');
  const [isMuted, setIsMuted] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRef = useRef(null);

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

      {/* Hero Section with Looping Background Video */}
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
            Where Your Imagination Becomes Reality          </h1>

          <p className="hero-main-subtitle">
            Create breathtaking AI images and cinematic videos in seconds—no limits, just your creativity.          </p>

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
                // Strip the pipe cursor if it somehow gets caught in the value
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

      {/* Research Section */}
      <section id="research" className="section container">
        <div className="section-header">
          <span className="badge badge-purple">AI Research & Innovation</span>
          <h2>Next-Gen Neural Generation Engine</h2>
          <p>Our proprietary deep-learning research powering ultra-fast visual & video synthesis</p>
        </div>

        <div className="features-grid">
          <div className="feature-card glass-card">
            <div className="card-icon">🧬</div>
            <h3>Dizi-Diffusion 2.5</h3>
            <p>Custom latent diffusion model fine-tuned for high-fidelity typography, sharp poster contrast, and zero artifact rendering.</p>
          </div>

          <div className="feature-card glass-card">
            <div className="card-icon">⚡</div>
            <h3>Sub-Second Inference</h3>
            <p>Hardware-accelerated GPU clusters delivering real-time preview renders under 800ms per generation.</p>
          </div>

          <div className="feature-card glass-card">
            <div className="card-icon">🎬</div>
            <h3>Temporal Video Motion</h3>
            <p>Motion-aware frame interpolation ensuring smooth, jitter-free 60fps cinematic video clips from text prompts.</p>
          </div>

          <div className="feature-card glass-card">
            <div className="card-icon">📐</div>
            <h3>Vector Mesh Synthesis</h3>
            <p>Direct vector curve output allowing infinite SVG scaling for brand logos and corporate emblems.</p>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
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

      {/* Blog & Articles Section */}
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

      {/* Community Showcase Gallery */}
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

      {/* Contact Section */}
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
              <a href="#research">Research</a>
              <a href="#tools">Tools</a>
              <a href="#blog">Blog</a>
              <a href="#community">Community</a>
              <a href="#contact">Contact</a>
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
          object-fit: cover;
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
          .hero-title {
            font-size: 3rem;
          }
          .prompt-sandbox {
            padding: 1.5rem;
          }
          .pricing-grid {
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          }
        }

        @media (max-width: 640px) {
          .landing-container {
            padding-top: 1rem;
          }
          .hero-section {
            padding: 2.5rem 0 4rem;
          }
          .hero-title {
            font-size: 2.1rem;
            line-height: 1.2;
          }
          .hero-subtitle {
            font-size: 1rem;
            margin-bottom: 1.8rem;
          }
          .hero-cta-group {
            flex-direction: column;
            width: 100%;
            gap: 0.8rem;
          }
          .hero-cta-group .btn {
            width: 100%;
          }
          .subdomain-badge-bar {
            margin-bottom: 2rem;
            font-size: 0.8rem;
          }
          .prompt-sandbox {
            padding: 1.25rem;
          }
          .sandbox-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.3rem;
          }
          .prompt-input-wrapper {
            flex-direction: column;
            gap: 0.6rem;
          }
          .sandbox-submit {
            width: 100%;
            padding: 0.85rem;
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
      `}</style>
    </div>
  );
}
