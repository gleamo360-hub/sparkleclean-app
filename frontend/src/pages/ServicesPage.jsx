import { Link } from 'react-router-dom';
import '../App.css';

const ServicesPage = () => {
  return (
    <div className="premium-container animate-fade-in">
      <div className="text-center">
        <h2 className="section-title">Our Cleaning Tiers</h2>
        <p className="subtitle">Transparent pricing. Uncompromising quality.</p>
      </div>

      <div className="detail-grid">
        <div className="detail-card">
          <h3>Standard Maintenance</h3>
          <p className="price-tag" style={{ fontSize: '1.5rem' }}>From $99</p>
          <p className="text-muted">Perfect for keeping your home consistently pristine week after week.</p>
          <ul className="premium-checklist" style={{ marginTop: '20px' }}>
            <li>✨ All surfaces dusted & wiped</li>
            <li>✨ Floor vacuuming & mopping</li>
            <li>✨ Bathroom sanitization</li>
            <li>✨ Kitchen exterior wipe-down</li>
          </ul>
        </div>

        <div className="detail-card" style={{ transform: 'scale(1.05)', borderColor: '#00c6ff', boxShadow: '0 10px 30px rgba(0, 198, 255, 0.15)' }}>
          <span className="badge" style={{ background: '#00c6ff', color: '#0f172a' }}>Most Popular</span>
          <h3 style={{ marginTop: '15px' }}>Luxury Deep Detail</h3>
          <p className="price-tag" style={{ fontSize: '1.5rem' }}>From $199</p>
          <p className="text-muted">Our comprehensive top-to-bottom scrub, ideal for seasonal refreshing.</p>
          <ul className="premium-checklist" style={{ marginTop: '20px' }}>
            <li>✨ Baseboard & door frame detailing</li>
            <li>✨ Inside window track cleaning</li>
            <li>✨ Heavy bathroom grout scrubbing</li>
            <li>✨ Under-furniture dust elimination</li>
          </ul>
        </div>

        <div className="detail-card">
          <h3>Move-In / Move-Out</h3>
          <p className="price-tag" style={{ fontSize: '1.5rem' }}>From $249</p>
          <p className="text-muted">Ensure you get your deposit back or step into a flawless new home.</p>
          <ul className="premium-checklist" style={{ marginTop: '20px' }}>
            <li>✨ Inside all empty cabinets</li>
            <li>✨ Deep appliance interior cleaning</li>
            <li>✨ Wall spot & cobweb removal</li>
            <li>✨ Complete floor rejuvenation</li>
          </ul>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="detail-hero" style={{ marginTop: '40px', background: 'transparent' }}>
        <h3>How It Works</h3>
        <div className="gallery-grid" style={{ marginTop: '20px' }}>
          <div>
            <span className="badge">Step 1</span>
            <h4>Book Online</h4>
            <p className="text-muted">Select your service and choose a date in seconds.</p>
          </div>
          <div>
            <span className="badge">Step 2</span>
            <h4>We Clean</h4>
            <p className="text-muted">Our vetted professionals arrive fully equipped.</p>
          </div>
          <div>
            <span className="badge">Step 3</span>
            <h4>You Relax</h4>
            <p className="text-muted">Enjoy your pristine space and your reclaimed free time.</p>
          </div>
        </div>
        <Link to="/" className="cta-btn-premium" style={{ display: 'inline-block', marginTop: '30px' }}>Go to Booking Dashboard</Link>
      </div>
    </div>
  );
};

export default ServicesPage;