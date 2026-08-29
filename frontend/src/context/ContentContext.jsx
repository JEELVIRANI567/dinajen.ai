import React, { createContext, useContext, useState, useEffect } from 'react';

export const INITIAL_RESEARCH_ARTICLES = [
  {
    id: 'bharat-cinema-engine',
    title: 'Dizi-Bharat Cinema Engine: AI Video & Scene Synthesis for Indian Filmmakers',
    date: 'Aug 02, 2026',
    tag: 'Indian Film & Media AI',
    readTime: '4 Min Read',
    views: '28.5K Indian Creators',
    likes: 2840,
    trendingBadge: '#1 Trending in India',
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
    readTime: '3 Min Read',
    views: '34.2K Indian Designers',
    likes: 3190,
    trendingBadge: 'Festival Special',
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
    readTime: '5 Min Read',
    views: '42.9K Sports Fans',
    likes: 4520,
    trendingBadge: 'IPL & Matchday Visuals',
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
    readTime: '4 Min Read',
    views: '31.7K Brand Marketers',
    likes: 3810,
    trendingBadge: 'Royal Ethnic Fashion',
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

export const INITIAL_BLOG_ARTICLES = [
  {
    id: 'mastering-ai-poster-design',
    isBlog: true,
    title: 'Mastering AI Poster Design: Advanced Composition & Vernacular Lighting Prompts',
    date: 'Aug 10, 2026',
    tag: 'Poster Design & Prompts',
    readTime: '⚡ 4 Min Read',
    views: '👁️ 19.4K Designers',
    likes: 1840,
    trendingBadge: '🔥 Design Guide 2026',
    ctaText: 'Read Full Article ↗',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
    summary: 'A practical engineering guide on structuring multi-layered visual prompts, controlling camera lens focal lengths, and rendering cinematic typography for Indian film and commercial posters.',
    sections: [
      {
        heading: '1. The Rule of Visual Depth in Generative Posters',
        content: 'To achieve cinematic depth in AI poster generation, prompts should separate background atmosphere from main subject key lighting. Specify volumetric fog, anamorphic lens flare, and rim lighting to elevate 2D artwork into 3D cinema standard.'
      },
      {
        heading: '2. Structuring Multi-Tier Vernacular Prompts',
        content: 'Combine specific lighting terms like "golden hour diya backlight" or "monsoon street reflections" with character descriptors for crisp visual fidelity.'
      },
      {
        heading: 'Key Poster Prompt Formula',
        bullets: [
          'Subject: Hero character in traditional period armor with dramatic side-lighting',
          'Atmosphere: Golden hour dust motes, volumetric fog, cinema anamorphic bokeh',
          'Color Palette: Crimson red and warm amber brass highlights'
        ]
      }
    ]
  },
  {
    id: 'vector-logos-vs-pixel-ai',
    isBlog: true,
    title: 'Vector SVG Logos vs Pixel AI Marks: Building Clean Scalable Corporate Identities',
    date: 'Aug 05, 2026',
    tag: 'Branding & Vector AI',
    readTime: '⏱️ 3 Min Read',
    views: '👁️ 24.1K Brand Strategists',
    likes: 2410,
    trendingBadge: '✨ Vector Breakthrough',
    ctaText: 'Explore Vector Strategy ↗',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=80',
    summary: 'Why scalable vector paths matter for commercial printing and brand merchandise, and how DiziPix generates crisp SVG curves directly from text prompts.',
    sections: [
      {
        heading: '1. The Vector SVG Advantage',
        content: 'Unlike raster PNG pixel outputs, SVG vector paths scale infinitely without pixelation. DiziPix 2.5 extracts parametric Bezier curves directly from neural tensor representations.'
      },
      {
        heading: '2. Seamless Export to Adobe Illustrator & Figma',
        content: 'Designers can export generated emblems directly into vector edit suites to tweak color swatches, strokes, and typographic alignments instantly.'
      }
    ]
  },
  {
    id: 'dizipix-d1-neural-architecture',
    isBlog: true,
    title: 'Inside DiziPix D1: High-Fidelity Regional Graphic & Image Synthesis Engine',
    date: 'Jul 29, 2026',
    tag: 'AI Graphic Engineering',
    readTime: '5 Min Read',
    views: '38.6K Creators',
    likes: 3720,
    trendingBadge: 'D1 Visual Engine',
    ctaText: 'Read Deep Dive ↗',
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&auto=format&fit=crop&q=80',
    summary: 'An inside look at our spatial attention mechanisms, regional typographic alignment, and sub-second generation passes powering DiziPix D1.',
    sections: [
      {
        heading: '1. Neural Layering & Visual Cohesion',
        content: 'DiziPix D1 ensures high dynamic range, crisp typography boundaries, and accurate ethnic color palettes for posters and brand assets.'
      },
      {
        heading: '2. Multi-Resolution Rasterization',
        content: 'Creators can render pristine 4K print-ready assets with balanced grain, crisp edges, and commercial-grade vector curve compatibility.'
      }
    ]
  }
];

export const INITIAL_HERO_CONFIG = {
  badgeText: 'Next-Generation Generative AI Visual Platform',
  mainHeadline: 'Create High-Resolution AI Posters, Logos & Graphics',
  highlightText: 'In Seconds',
  subtitle: 'Engineered for creators, graphic designers, studios, and brand marketers. High-resolution Vernacular AI art with Devanagari support, festive presets, and studio lighting.',
  primaryCtaText: 'Start Creating Free',
  secondaryCtaText: 'Explore AI Tools ↗'
};

const STORAGE_KEY = 'dizipix_dynamic_content_v1';

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [articles, setArticles] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_articles`);
      return saved ? JSON.parse(saved) : INITIAL_RESEARCH_ARTICLES;
    } catch {
      return INITIAL_RESEARCH_ARTICLES;
    }
  });

  const [blogArticles, setBlogArticles] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_blogs`);
      return saved ? JSON.parse(saved) : INITIAL_BLOG_ARTICLES;
    } catch {
      return INITIAL_BLOG_ARTICLES;
    }
  });

  const [heroConfig, setHeroConfig] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_hero`);
      return saved ? JSON.parse(saved) : INITIAL_HERO_CONFIG;
    } catch {
      return INITIAL_HERO_CONFIG;
    }
  });

  // Save to localStorage when state changes
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_articles`, JSON.stringify(articles));
    } catch (e) {
      console.error('Failed to save articles to localStorage', e);
    }
  }, [articles]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_blogs`, JSON.stringify(blogArticles));
    } catch (e) {
      console.error('Failed to save blog articles to localStorage', e);
    }
  }, [blogArticles]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_hero`, JSON.stringify(heroConfig));
    } catch (e) {
      console.error('Failed to save hero config to localStorage', e);
    }
  }, [heroConfig]);

  const updateArticle = (articleId, updatedFields) => {
    setArticles(prev =>
      prev.map(art => (art.id === articleId ? { ...art, ...updatedFields } : art))
    );
  };

  const addArticle = (newArticle) => {
    const articleToAdd = {
      id: `article-${Date.now()}`,
      likes: 0,
      trendingBadge: '#1 Trending in India',
      readTime: '4 Min Read',
      views: '1K Creators',
      sections: [
        {
          heading: 'Overview',
          content: newArticle.summary || 'Article content details.'
        }
      ],
      ...newArticle
    };
    setArticles(prev => [articleToAdd, ...prev]);
  };

  const deleteArticle = (articleId) => {
    setArticles(prev => prev.filter(art => art.id !== articleId));
  };

  const updateBlogArticle = (blogId, updatedFields) => {
    setBlogArticles(prev =>
      prev.map(art => (art.id === blogId ? { ...art, ...updatedFields } : art))
    );
  };

  const addBlogArticle = (newBlog) => {
    const blogToAdd = {
      id: `blog-${Date.now()}`,
      isBlog: true,
      likes: 0,
      readTime: newBlog.readTime || '⚡ 4 Min Read',
      views: '👁️ 1K Readers',
      ctaText: newBlog.ctaText || 'Read Full Article ↗',
      sections: [
        {
          heading: 'Article Guide',
          content: newBlog.summary || 'Blog content overview.'
        }
      ],
      ...newBlog
    };
    setBlogArticles(prev => [blogToAdd, ...prev]);
  };

  const deleteBlogArticle = (blogId) => {
    setBlogArticles(prev => prev.filter(art => art.id !== blogId));
  };

  const updateHeroConfig = (newConfig) => {
    setHeroConfig(prev => ({ ...prev, ...newConfig }));
  };

  const resetToDefaults = () => {
    setArticles(INITIAL_RESEARCH_ARTICLES);
    setBlogArticles(INITIAL_BLOG_ARTICLES);
    setHeroConfig(INITIAL_HERO_CONFIG);
    try {
      localStorage.removeItem(`${STORAGE_KEY}_articles`);
      localStorage.removeItem(`${STORAGE_KEY}_blogs`);
      localStorage.removeItem(`${STORAGE_KEY}_hero`);
    } catch (e) {
      console.error('Failed to clear localStorage', e);
    }
  };

  return (
    <ContentContext.Provider
      value={{
        articles,
        blogArticles,
        heroConfig,
        updateArticle,
        addArticle,
        deleteArticle,
        updateBlogArticle,
        addBlogArticle,
        deleteBlogArticle,
        updateHeroConfig,
        resetToDefaults
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return ctx;
}
