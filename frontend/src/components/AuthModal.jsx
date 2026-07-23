import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { navigateToApp } from '../utils/subdomainRouter';

export function AuthModal() {
  const { isAuthModalOpen, setAuthModalOpen, login } = useAuth();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    login(email, name || (isSignUp ? 'Dhruvil Nakrani' : 'Member'));
    navigateToApp('create');
  };

  const handleGoogleLogin = () => {
    login('dhruvil@dizipix.ai', 'Dhruvil Nakrani');
    navigateToApp('create');
  };

  return (
    <div className="modal-overlay" onClick={() => setAuthModalOpen(false)}>
      <div className="modal-card animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={() => setAuthModalOpen(false)}>✕</button>
        
        <div className="modal-header">
          <div className="modal-logo">✦ DiziPix.ai</div>
          <h2>{isSignUp ? 'Create your DiziPix account' : 'Welcome back'}</h2>
          <p>Get <span className="highlight-text">50 Free AI Credits</span> instantly upon joining!</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {isSignUp && (
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Dhruvil Nakrani"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            {isSignUp ? 'Sign Up & Claim 50 Free Credits ✨' : 'Sign In to App'}
          </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <button className="google-btn" onClick={handleGoogleLogin}>
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="modal-footer">
          {isSignUp ? (
            <p>Already have an account? <button type="button" onClick={() => setIsSignUp(false)}>Sign In</button></p>
          ) : (
            <p>New to DiziPix? <button type="button" onClick={() => setIsSignUp(true)}>Create Account</button></p>
          )}
        </div>
      </div>

      <style>{`
        .modal-card {
          background: #0f111a;
          border: 1px solid var(--border-glass-hover);
          border-radius: var(--radius-lg);
          padding: 2.2rem;
          width: 100%;
          max-width: 440px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(139, 92, 246, 0.2);
        }

        @media (max-width: 480px) {
          .modal-card {
            padding: 1.5rem 1.25rem;
          }
          .modal-header h2 {
            font-size: 1.3rem;
          }
        }

        .close-btn {
          position: absolute;
          top: 1.2rem;
          right: 1.2rem;
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 1.2rem;
          cursor: pointer;
        }

        .close-btn:hover {
          color: #fff;
        }

        .modal-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .modal-logo {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.2rem;
          color: var(--accent-purple);
          margin-bottom: 0.5rem;
        }

        .modal-header h2 {
          font-size: 1.5rem;
          margin-bottom: 0.4rem;
        }

        .modal-header p {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .highlight-text {
          color: var(--accent-pink);
          font-weight: 700;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .input-group label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .input-group input {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-glass);
          border-radius: var(--radius-sm);
          padding: 0.75rem 1rem;
          color: #fff;
          font-size: 0.95rem;
          outline: none;
          transition: var(--transition-fast);
        }

        .input-group input:focus {
          border-color: var(--accent-purple);
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.3);
        }

        .btn-block {
          width: 100%;
          margin-top: 0.5rem;
          padding: 0.85rem;
        }

        .divider {
          display: flex;
          align-items: center;
          margin: 1.2rem 0;
          color: var(--text-muted);
          font-size: 0.75rem;
        }

        .divider::before, .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--border-glass);
        }

        .divider span {
          padding: 0 0.8rem;
        }

        .google-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--border-glass);
          color: #fff;
          padding: 0.75rem;
          border-radius: var(--radius-full);
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .google-btn:hover {
          background: rgba(255, 255, 255, 0.12);
        }

        .modal-footer {
          text-align: center;
          margin-top: 1.2rem;
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .modal-footer button {
          background: none;
          border: none;
          color: var(--accent-purple);
          font-weight: 600;
          cursor: pointer;
          margin-left: 0.3rem;
        }
      `}</style>
    </div>
  );
}
