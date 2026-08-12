import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { navigateToLanding } from '../utils/subdomainRouter';

export function AdminPanel() {
  const {
    articles,
    heroConfig,
    updateArticle,
    addArticle,
    deleteArticle,
    updateHeroConfig,
    resetToDefaults
  } = useContent();

  const [activeTab, setActiveTab] = useState('articles'); // 'articles' | 'hero'
  const [editingArticleId, setEditingArticleId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Local draft state for editing an article
  const [articleDraft, setArticleDraft] = useState(null);

  // Local state for adding a new article
  const [isAddingArticle, setIsAddingArticle] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: '',
    tag: 'Vernacular Graphic AI',
    summary: '',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
    trendingBadge: '#1 Trending in India',
    readTime: ' 4 Min Read',
    views: ' 10K Creators',
    ctaText: 'Read Deep Dive ↗'
  });

  // Local draft state for hero config
  const [heroDraft, setHeroDraft] = useState({ ...heroConfig });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleEditClick = (article) => {
    setEditingArticleId(article.id);
    setArticleDraft({ ...article });
  };

  const handleSaveArticle = () => {
    if (!articleDraft) return;
    updateArticle(articleDraft.id, articleDraft);
    setEditingArticleId(null);
    setArticleDraft(null);
    showToast('✨ Article updated successfully! Live on main site.');
  };

  const handleAddNewArticleSubmit = (e) => {
    e.preventDefault();
    if (!newArticle.title || !newArticle.summary) {
      showToast('⚠️ Please enter title and summary!');
      return;
    }
    addArticle(newArticle);
    setIsAddingArticle(false);
    setNewArticle({
      title: '',
      tag: 'Vernacular Graphic AI',
      summary: '',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
      trendingBadge: '#1 Trending in India',
      readTime: '🔥 4 Min Read',
      views: '👁️ 10K Creators',
      ctaText: 'Read Deep Dive ↗'
    });
    showToast('🚀 New article created! Live on main site.');
  };

  const handleDeleteArticleClick = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteArticle(id);
      showToast('🗑️ Article deleted.');
    }
  };

  const handleSaveHeroConfig = (e) => {
    e.preventDefault();
    updateHeroConfig(heroDraft);
    showToast('🎨 Hero & Site Branding updated! Live on main site.');
  };

  const handleResetAll = () => {
    if (window.confirm('Reset all site content back to initial defaults?')) {
      resetToDefaults();
      setHeroDraft({ ...heroConfig });
      showToast('🔄 Content reset to default initial state.');
    }
  };

  return (
    <div className="admin-standalone-container">
      {/* Standalone Admin Top Navigation Bar */}
      <nav className="admin-standalone-navbar">
        <div className="admin-nav-brand" onClick={navigateToLanding} style={{ cursor: 'pointer' }}>
          <span className="brand-logo-text">Dizi<span className="logo-accent">Pix</span></span>
          <span className="admin-portal-tag">ADMIN PANEL</span>
        </div>

        <div className="admin-standalone-nav-actions">
          <span className="admin-url-badge">http://localhost:5173/admin</span>
          <button className="admin-btn secondary-btn" onClick={navigateToLanding}>
            🌐 Launch Main Site
          </button>
          <button className="admin-btn danger-btn" onClick={handleResetAll}>
            🔄 Reset Defaults
          </button>
        </div>
      </nav>

      {/* Toast Banner */}
      {toastMessage && (
        <div className="admin-toast animate-slide-up">
          {toastMessage}
        </div>
      )}

      {/* Hero Header */}
      <header className="admin-header glass-card">
        <div className="admin-header-left">
          <div className="admin-badge">⚡ Real-Time Content Engine</div>
          <h2>DiziPix Site Administration</h2>
          <p>Make changes here to immediately update content live on the main website</p>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="admin-nav-tabs">
        <button
          className={`admin-tab-btn ${activeTab === 'articles' ? 'active' : ''}`}
          onClick={() => setActiveTab('articles')}
        >
          📰 Research Articles ({articles.length})
        </button>
        <button
          className={`admin-tab-btn ${activeTab === 'hero' ? 'active' : ''}`}
          onClick={() => setActiveTab('hero')}
        >
          🚀 Hero & Site Branding
        </button>
      </nav>

      {/* Tab Content: Articles */}
      {activeTab === 'articles' && (
        <div className="admin-section animate-fade-in">
          <div className="admin-section-bar">
            <h3>Manage Research Articles</h3>
            <button
              className="admin-btn primary-btn"
              onClick={() => setIsAddingArticle(!isAddingArticle)}
            >
              {isAddingArticle ? '✕ Cancel' : '+ Add New Article'}
            </button>
          </div>

          {/* Add Article Form */}
          {isAddingArticle && (
            <form className="admin-card-form glass-card animate-slide-down" onSubmit={handleAddNewArticleSubmit}>
              <h4>Create New Research Article</h4>

              <div className="form-grid">
                <div className="form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    value={newArticle.title}
                    onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                    placeholder="Enter article title"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Tag / Category</label>
                  <input
                    type="text"
                    value={newArticle.tag}
                    onChange={(e) => setNewArticle({ ...newArticle, tag: e.target.value })}
                    placeholder="e.g. Indian Film & Media AI"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Summary / Excerpt *</label>
                  <textarea
                    value={newArticle.summary}
                    onChange={(e) => setNewArticle({ ...newArticle, summary: e.target.value })}
                    rows="3"
                    placeholder="Brief description displayed on the card..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Image URL</label>
                  <input
                    type="text"
                    value={newArticle.image}
                    onChange={(e) => setNewArticle({ ...newArticle, image: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>CTA Button Text</label>
                  <input
                    type="text"
                    value={newArticle.ctaText}
                    onChange={(e) => setNewArticle({ ...newArticle, ctaText: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="admin-btn primary-btn">
                  Publish to Main Site 🚀
                </button>
              </div>
            </form>
          )}

          {/* Articles Table/List */}
          <div className="admin-articles-grid">
            {articles.map((article) => (
              <div key={article.id} className="admin-article-item glass-card">
                {editingArticleId === article.id ? (
                  /* Edit Article Form */
                  <div className="admin-edit-card">
                    <h4>Editing Article: {article.title}</h4>

                    <div className="form-grid">
                      <div className="form-group full-width">
                        <label>Title</label>
                        <input
                          type="text"
                          value={articleDraft.title}
                          onChange={(e) => setArticleDraft({ ...articleDraft, title: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label>Tag</label>
                        <input
                          type="text"
                          value={articleDraft.tag}
                          onChange={(e) => setArticleDraft({ ...articleDraft, tag: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label>Date</label>
                        <input
                          type="text"
                          value={articleDraft.date}
                          onChange={(e) => setArticleDraft({ ...articleDraft, date: e.target.value })}
                        />
                      </div>

                      <div className="form-group full-width">
                        <label>Summary</label>
                        <textarea
                          value={articleDraft.summary}
                          onChange={(e) => setArticleDraft({ ...articleDraft, summary: e.target.value })}
                          rows="3"
                        />
                      </div>

                      <div className="form-group">
                        <label>Image URL</label>
                        <input
                          type="text"
                          value={articleDraft.image}
                          onChange={(e) => setArticleDraft({ ...articleDraft, image: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label>CTA Button Text</label>
                        <input
                          type="text"
                          value={articleDraft.ctaText}
                          onChange={(e) => setArticleDraft({ ...articleDraft, ctaText: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-actions">
                      <button className="admin-btn primary-btn" onClick={handleSaveArticle}>
                        Save Changes 💾
                      </button>
                      <button className="admin-btn secondary-btn" onClick={() => setEditingArticleId(null)}>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Read Only Item View */
                  <div className="admin-article-preview">
                    <img src={article.image} alt={article.title} className="admin-article-thumb" />
                    <div className="admin-article-info">
                      <div className="admin-article-badges">
                        <span className="admin-tag-pill">{article.tag}</span>
                        <span className="admin-date-pill">{article.date}</span>
                      </div>
                      <h4>{article.title}</h4>
                      <p>{article.summary}</p>
                    </div>

                    <div className="admin-article-actions">
                      <button
                        className="admin-btn action-btn edit"
                        onClick={() => handleEditClick(article)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="admin-btn action-btn delete"
                        onClick={() => handleDeleteArticleClick(article.id, article.title)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Hero Config */}
      {activeTab === 'hero' && (
        <div className="admin-section animate-fade-in">
          <form className="admin-card-form glass-card" onSubmit={handleSaveHeroConfig}>
            <h3>Hero Section & Site Branding Config</h3>
            <p className="subtitle">Changes saved here directly update the Landing Page hero header</p>

            <div className="form-grid">
              <div className="form-group full-width">
                <label>Top Announcement Pill Text</label>
                <input
                  type="text"
                  value={heroDraft.badgeText}
                  onChange={(e) => setHeroDraft({ ...heroDraft, badgeText: e.target.value })}
                />
              </div>

              <div className="form-group full-width">
                <label>Main Headline</label>
                <input
                  type="text"
                  value={heroDraft.mainHeadline}
                  onChange={(e) => setHeroDraft({ ...heroDraft, mainHeadline: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Gradient Highlighted Text</label>
                <input
                  type="text"
                  value={heroDraft.highlightText}
                  onChange={(e) => setHeroDraft({ ...heroDraft, highlightText: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Primary Button Label</label>
                <input
                  type="text"
                  value={heroDraft.primaryCtaText}
                  onChange={(e) => setHeroDraft({ ...heroDraft, primaryCtaText: e.target.value })}
                />
              </div>

              <div className="form-group full-width">
                <label>Subtitle / Description</label>
                <textarea
                  value={heroDraft.subtitle}
                  onChange={(e) => setHeroDraft({ ...heroDraft, subtitle: e.target.value })}
                  rows="3"
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="admin-btn primary-btn">
                Save Hero Branding 🎨
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
