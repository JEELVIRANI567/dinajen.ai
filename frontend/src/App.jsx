import { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    // Simulated API call - In a real app, this would hit the backend
    setTimeout(() => {
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(''), 3000);
    }, 1500);
  };

  return (
    <>
      <nav className={scrolled ? 'scrolled' : ''}>
        <div className="container nav-content">
          <a href="#" className="logo text-gradient">JD.</a>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-blob"></div>
        <div className="container">
          <div className="hero-content animate-fade-in">
            <h1>Hi, I'm <span className="text-gradient">John Doe</span></h1>
            <p>A passionate Full Stack Developer building beautiful, interactive, and modern web applications.</p>
            <div className="hero-btns">
              <a href="#projects" className="btn btn-primary">View My Work</a>
              <a href="#contact" className="btn btn-outline">Get In Touch</a>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section container">
        <div className="glass" style={{ padding: '4rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>About <span className="text-gradient">Me</span></h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto' }}>
            I specialize in the MERN stack and have a keen eye for design. 
            I love creating fluid user experiences and robust backend architectures. 
            When I'm not coding, you can find me exploring new technologies or contributing to open source.
          </p>
        </div>
      </section>

      <section id="projects" className="section container">
        <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '1rem' }}>Featured <span className="text-gradient">Projects</span></h2>
        <div className="projects-grid">
          <div className="project-card glass">
            <h3>E-Commerce Platform</h3>
            <p>A full-featured online store built with React, Node.js, and MongoDB. Features secure payments and inventory management.</p>
            <a href="#" className="text-gradient" style={{ textDecoration: 'none', fontWeight: '600' }}>View Details &rarr;</a>
          </div>
          <div className="project-card glass">
            <h3>Social Dashboard</h3>
            <p>A real-time analytics dashboard providing insights into social media metrics using dynamic charts and WebSockets.</p>
            <a href="#" className="text-gradient" style={{ textDecoration: 'none', fontWeight: '600' }}>View Details &rarr;</a>
          </div>
          <div className="project-card glass">
            <h3>Task Manager AI</h3>
            <p>An intelligent productivity app that uses machine learning to prioritize tasks and optimize your daily workflow.</p>
            <a href="#" className="text-gradient" style={{ textDecoration: 'none', fontWeight: '600' }}>View Details &rarr;</a>
          </div>
        </div>
      </section>

      <section id="contact" className="section container">
        <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '1rem' }}>Get in <span className="text-gradient">Touch</span></h2>
        <div className="glass contact-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" className="form-control" value={formData.message} onChange={handleChange} required></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
            {status && <p style={{ marginTop: '1rem', textAlign: 'center', color: 'var(--color-secondary)' }}>{status}</p>}
          </form>
        </div>
      </section>

      <footer>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} John Doe. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
