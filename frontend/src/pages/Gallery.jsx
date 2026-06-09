import { useState } from 'react';
import '../App.css';

const Gallery = () => {
  const [filter, setFilter] = useState('All');

  const portfolio = [
    { id: 1, type: 'Bathrooms', title: 'Master Bathroom Detail', icon: '🛁', desc: 'Hard water stain removal.' },
    { id: 2, type: 'Kitchens', title: 'Chef\'s Kitchen Polish', icon: '🍳', desc: 'Stainless steel rejuvenation.' },
    { id: 3, type: 'Living Spaces', title: 'Living Space Optimization', icon: '🛋️', desc: 'Complete floor polishing.' },
    { id: 4, type: 'Living Spaces', title: 'Crystal Clear Windows', icon: '🪟', desc: 'Streak-free glass.' },
    { id: 5, type: 'Kitchens', title: 'Oven Deep Clean', icon: '🔥', desc: 'Burned carbon extraction.' },
    { id: 6, type: 'Bathrooms', title: 'Grout Restoration', icon: '🚿', desc: 'Tile whitening treatment.' },
  ];

  const filteredPortfolio = filter === 'All' ? portfolio : portfolio.filter(item => item.type === filter);

  return (
    <div className="premium-container animate-fade-in text-center">
      <h2 className="section-title">Our Transformations</h2>
      <p className="subtitle">Proof of our absolute dedication to pristine standards.</p>
      
      {/* Filter Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
        {['All', 'Kitchens', 'Bathrooms', 'Living Spaces'].map(category => (
          <button 
            key={category}
            onClick={() => setFilter(category)}
            className={filter === category ? 'cta-btn-premium' : 'logout-btn'}
            style={{ padding: '8px 16px', borderRadius: '20px' }}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="gallery-grid">
        {filteredPortfolio.map(item => (
          <div key={item.id} className="gallery-card">
            <div className="placeholder-image-box" style={{ background: 'linear-gradient(45deg, #1e293b, #334155)', height: '250px' }}>
              <span style={{ fontSize: '4rem' }}>{item.icon}</span>
            </div>
            <h4 style={{ marginTop: '15px' }}>{item.title}</h4>
            <p className="text-muted" style={{ fontSize: '0.9rem' }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;