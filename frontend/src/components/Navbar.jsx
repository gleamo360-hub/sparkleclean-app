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
      {/* Mobile Hamburger Toggle Button (Positioned Left) */}
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? '✕' : '☰'}
      </button>

      <div className="logo">
        <Link to="/" onClick={() => setMenuOpen(false)}>✨ SparkleClean</Link>
      </div>

      {/* Nav Links Stacked or Hidden based on menuOpen state */}
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
    </nav>
  );
};

export default Navbar;