import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      
      {/* 1. LOGO (Always on the Left) */}
      <div className="logo">
        <Link to="/" onClick={() => setMenuOpen(false)}>✨ SparkleClean</Link>
      </div>

      {/* 2. NAVIGATION LINKS (Center/Left Dropdown) */}
      <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link></li>
        <li><Link to="/services" onClick={() => setMenuOpen(false)}>Our Services</Link></li>
        <li><Link to="/blogs" onClick={() => setMenuOpen(false)}>Blogs</Link></li>
        <li><Link to="/gallery" onClick={() => setMenuOpen(false)}>Gallery</Link></li>
        <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link></li>

        {token ? (
          <>
            <li><Link to="/admin" onClick={() => setMenuOpen(false)} style={{ color: '#00c6ff', fontWeight: 'bold' }}>⚡ Admin Panel</Link></li>
            <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
          </>
        ) : (
          <li>
            <Link to="/login" className="login-btn" onClick={() => setMenuOpen(false)}>Login</Link>
          </li>
        )}
      </ul>

      {/* 3. GLAMOROUS ACTIONS & MENU (Always on the Right) */}
      <div className="nav-actions">
        
        {/* Chat Button */}
        <a href="https://wa.me/9341619722" target="_blank" rel="noreferrer" className="action-btn chat-btn">
          <span className="icon">💬</span> 
          <span className="action-text">Chat With Us</span>
        </a>

        {/* Call Button */}
        <a href="tel:+91 9341619722" className="action-btn call-btn">
          <span className="icon">📞</span> 
          <span className="action-text">Call Us</span>
        </a>
        
        {/* Mobile Hamburger Toggle Button */}
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>

      </div>
    </nav>
  );
};

export default Navbar;