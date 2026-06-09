import { useState } from 'react';
import '../App.css';

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock Blog Data
  const articles = [
    { id: 1, category: 'DIY Cleaning', title: '5 Ways to Remove Red Wine Stains', read: '4 min read', preview: 'Spilled your favorite Pinot Noir on the white rug? Here is the chemical-free mixture we use to lift stains instantly.' },
    { id: 2, category: 'Organization', title: 'The 15-Minute Daily Tidy Routine', read: '6 min read', preview: 'Learn the exact 15-minute nightly routine that will transform your mornings and keep clutter at bay permanently.' },
    { id: 3, category: 'Health', title: 'Why Dust is Making You Tired', read: '5 min read', preview: 'Discover how hidden dust mites and poor indoor air quality are draining your energy, and how to evict them.' },
    { id: 4, category: 'Tools', title: 'The Only 3 Cleaning Tools You Actually Need', read: '3 min read', preview: 'Stop buying single-use plastic bottles. These three reusable tools will handle 95% of your household chores.' }
  ];

  // Dynamic search filter logic
  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    article.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="premium-container animate-fade-in">
      <div className="text-center">
        <h2 className="section-title">The Clean Living Journal</h2>
        <p className="subtitle">Expert tips, tricks, and guides to maintaining a beautiful home.</p>
        
        {/* Search Bar */}
        <input 
          type="text" 
          placeholder="Search articles, categories, or tips..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', maxWidth: '500px', padding: '12px 20px', borderRadius: '50px', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'white', marginBottom: '40px', fontSize: '1rem' }}
        />
      </div>

      <div className="gallery-grid">
        {filteredArticles.length > 0 ? (
          filteredArticles.map(article => (
            <div key={article.id} className="detail-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge">{article.category}</span>
                <span className="text-muted" style={{ fontSize: '0.8rem' }}>⏱️ {article.read}</span>
              </div>
              <h3 style={{ marginTop: '15px' }}>{article.title}</h3>
              <p className="text-muted">{article.preview}</p>
              <button className="logout-btn" style={{ marginTop: '15px', border: 'none', padding: '0', color: '#00c6ff', fontWeight: 'bold' }}>Read Full Article →</button>
            </div>
          ))
        ) : (
          <p className="text-center text-muted" style={{ gridColumn: '1 / -1' }}>No articles found matching "{searchTerm}".</p>
        )}
      </div>
    </div>
  );
};

export default Blogs;