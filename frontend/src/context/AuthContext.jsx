import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const MOCK_INITIAL_CREATIONS = [
  {
    id: 'demo-1',
    type: 'poster',
    title: 'Neon Cyberpunk Music Festival 2026',
    prompt: 'Futuristic neon cyberpunk poster for electric sound festival, high resolution 8k, vivid purple and cyan lighting',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
    likes: 124,
    creator: 'Dhruvil N.',
    createdAt: '2 hours ago'
  },
  {
    id: 'demo-2',
    type: 'video',
    title: 'Cinematic Ocean Waves Motion',
    prompt: 'Ultra slow-motion cinematic drone view of glowing turquoise ocean waves at sunset, 60fps photorealistic',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4',
    likes: 310,
    creator: 'Jeel V.',
    createdAt: '5 hours ago'
  },
  {
    id: 'demo-3',
    type: 'logo',
    title: 'Apex Dynamics Tech Emblem',
    prompt: 'Minimalist geometric 3D logo emblem for AI tech startup, gradient purple & gold, vector style',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    likes: 89,
    creator: 'DiziStudio',
    createdAt: '1 day ago'
  },
  {
    id: 'demo-4',
    type: 'flyer',
    title: 'Modern Coffee Shop Opening',
    prompt: 'Elegant rustic coffee shop grand opening flyer, warm earthy tones, coffee bean graphics',
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80',
    likes: 67,
    creator: 'Sarah K.',
    createdAt: '2 days ago'
  }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('dizipix_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [credits, setCredits] = useState(() => {
    const saved = localStorage.getItem('dizipix_credits');
    return saved ? parseInt(saved, 10) : 50;
  });

  const [userCreations, setUserCreations] = useState(() => {
    const saved = localStorage.getItem('dizipix_user_creations');
    return saved ? JSON.parse(saved) : [];
  });

  const [communityFeed, setCommunityFeed] = useState(MOCK_INITIAL_CREATIONS);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('dizipix_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('dizipix_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('dizipix_credits', credits.toString());
  }, [credits]);

  useEffect(() => {
    localStorage.setItem('dizipix_user_creations', JSON.stringify(userCreations));
  }, [userCreations]);

  const login = (email, name = 'Dhruvil Nakrani') => {
    const newUser = {
      name,
      email,
      plan: 'Free Trial',
      joinedAt: new Date().toISOString()
    };
    setUser(newUser);
    // Give 50 free credits if user didn't have any
    if (credits <= 0) setCredits(50);
    setAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  const deductCredits = (amount) => {
    if (credits >= amount) {
      setCredits((prev) => prev - amount);
      return true;
    }
    return false;
  };

  const addCredits = (amount) => {
    setCredits((prev) => prev + amount);
  };

  const addCreation = (creation) => {
    const newCreation = {
      id: `creation-${Date.now()}`,
      createdAt: 'Just now',
      creator: user ? user.name : 'Guest User',
      likes: 1,
      ...creation
    };

    setUserCreations((prev) => [newCreation, ...prev]);
    setCommunityFeed((prev) => [newCreation, ...prev]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        credits,
        userCreations,
        communityFeed,
        isAuthModalOpen,
        setAuthModalOpen,
        login,
        logout,
        deductCredits,
        addCredits,
        addCreation
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
