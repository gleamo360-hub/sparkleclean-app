import '../App.css';

const About = () => {
  return (
    <div className="premium-container animate-fade-in">
      <div className="detail-hero">
        <span className="badge">Established 2024</span>
        <h2>Elevating the Standard of Clean</h2>
        <p className="text-muted" style={{ maxWidth: '600px', margin: '15px auto' }}>
          SparkleClean was founded on a simple premise: your time is your most valuable asset. We step in to handle the details so you can focus on making memories.
        </p>
      </div>

      {/* Trust Statistics */}
      <div className="gallery-grid" style={{ marginBottom: '40px' }}>
        <div className="detail-card text-center">
          <h2 style={{ color: '#00c6ff', fontSize: '2.5rem', margin: '0' }}>500+</h2>
          <p className="text-muted">Homes Sanitized</p>
        </div>
        <div className="detail-card text-center">
          <h2 style={{ color: '#00c6ff', fontSize: '2.5rem', margin: '0' }}>100%</h2>
          <p className="text-muted">Vetted Professionals</p>
        </div>
        <div className="detail-card text-center">
          <h2 style={{ color: '#00c6ff', fontSize: '2.5rem', margin: '0' }}>4.9★</h2>
          <p className="text-muted">Average Rating</p>
        </div>
      </div>

      <div className="text-center" style={{ marginBottom: '30px' }}>
        <h3 className="section-title" style={{ fontSize: '2rem' }}>Our Core Pillars</h3>
      </div>

      <div className="detail-grid">
        <div className="detail-card">
          <h3 style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '10px' }}>🌱 Eco-Friendly</h3>
          <p>We strictly utilize hospital-grade, environmentally safe solutions that are uncompromising on dirt but gentle on your family and pets.</p>
        </div>
        <div className="detail-card">
          <h3 style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '10px' }}>🛡️ Ironclad Trust</h3>
          <p>Every specialist undergoes rigorous national background checks, intensive interviews, and multi-week detail training.</p>
        </div>
        <div className="detail-card">
          <h3 style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '10px' }}>✨ The Guarantee</h3>
          <p>Perfection is our baseline. If a corner is missed, our team returns within 24 hours to rectify it at zero additional cost.</p>
        </div>
      </div>
    </div>
  );
};

export default About;