import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const ServiceDetail = () => {
  const { id } = useParams(); // Gets the service ID from the URL
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        // Fetch all services, then find the specific one the user clicked
        const response = await axios.get('https://sparkleclean-backend.onrender.com/api/services');
        const foundService = response.data.find(s => s._id === id);
        setService(foundService);
        setLoading(false);
      } catch {
        console.error("Failed to fetch service details");
        setLoading(false);
      }
    };
    fetchServiceDetails();
  }, [id]);

  // A smart function that generates rich content based on the service name!
  const getRichContent = (name) => {
    const lowerName = name?.toLowerCase() || '';
    
    if (lowerName.includes('deep')) {
      return {
        tagline: "Our most comprehensive, top-to-bottom detail.",
        icon: "✨",
        checklist: [
          "Complete dust elimination (ceilings, fans, baseboards)",
          "Inside window tracks and interior glass polishing",
          "Heavy scrubbing of bathroom grout and shower glass",
          "Inside and out of all kitchen appliances (oven, fridge)",
          "Under-furniture vacuuming and hard floor rejuvenation"
        ]
      };
    } else if (lowerName.includes('move') || lowerName.includes('empty')) {
      return {
        tagline: "Secure your deposit or step into a flawless new home.",
        icon: "📦",
        checklist: [
          "Sanitization inside all empty cabinets and drawers",
          "Deep interior appliance detailing",
          "Wall spot-cleaning and cobweb removal",
          "Intensive floor polishing and carpet vacuuming",
          "Bathroom mold treatment and fixture shining"
        ]
      };
    } else if (lowerName.includes('window')) {
      return {
        tagline: "Crystal clear views, guaranteed streak-free.",
        icon: "🪟",
        checklist: [
          "Interior and exterior glass washing (reachable areas)",
          "Window track detailing to remove dead bugs and dirt",
          "Screen dusting and wipe-down",
          "Window sill and frame sanitization"
        ]
      };
    } else {
      // Default for Standard / Maintenance Cleaning
      return {
        tagline: "Consistent, pristine maintenance for your living space.",
        icon: "🧹",
        checklist: [
          "General dusting and wiping of all accessible surfaces",
          "Floor vacuuming and mopping throughout",
          "Standard bathroom sanitization (mirrors, sinks, toilets)",
          "Kitchen counter and appliance exterior wipe-down",
          "Trash removal and bag replacement"
        ]
      };
    }
  };

  if (loading) return <div className="text-center" style={{ padding: '100px' }}><h3>Loading premium details...</h3></div>;
  if (!service) return <div className="text-center" style={{ padding: '100px' }}><h3>Service not found.</h3></div>;

  const richContent = getRichContent(service.serviceName);

  return (
    <div className="premium-container animate-fade-in">
      
      {/* 1. Premium Hero Banner */}
      <div className="detail-hero" style={{ padding: '80px 20px', background: 'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(0,198,255,0.1))', border: '1px solid #00c6ff' }}>
        <span style={{ fontSize: '4rem', display: 'block', marginBottom: '15px' }}>{richContent.icon}</span>
        <h1 style={{ fontSize: '3rem', margin: '0 0 15px 0', color: 'white' }}>{service.serviceName}</h1>
        <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>
          {richContent.tagline}
        </p>
      </div>

      <div className="detail-grid" style={{ marginTop: '40px' }}>
        
        {/* 2. Main Details & Checklist */}
        <div className="detail-card" style={{ gridColumn: 'span 2' }}>
          <h3 style={{ fontSize: '1.8rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '15px' }}>
            Service Overview
          </h3>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-muted)', marginTop: '20px' }}>
            {service.description}
          </p>

          <h3 style={{ fontSize: '1.5rem', marginTop: '40px', marginBottom: '20px' }}>What's Included:</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {richContent.checklist.map((item, index) => (
              <li key={index} style={{ fontSize: '1.1rem', marginBottom: '15px', display: 'flex', alignItems: 'flex-start' }}>
                <span style={{ color: '#00c6ff', marginRight: '15px', fontSize: '1.2rem' }}>✓</span>
                <span style={{ color: 'var(--text-main)' }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Sticky Booking Sidebar */}
        <div style={{ position: 'sticky', top: '120px', height: 'fit-content' }}>
          <div className="detail-card text-center" style={{ background: 'var(--dark-bg)', borderColor: '#00c6ff', boxShadow: '0 10px 30px rgba(0,198,255,0.1)' }}>
            <h3 style={{ margin: 0, color: 'white' }}>Investment</h3>
            <p style={{ fontSize: '3rem', fontWeight: '800', color: '#00c6ff', margin: '15px 0' }}>
              ₹{service.basePrice}
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '30px' }}>
              *Base price. Final cost may vary based on property size.
            </p>
            
            <Link 
              to={`/book/${service._id}`} 
              className="cta-btn-premium" 
              style={{ display: 'block', width: '100%', padding: '16px 0', fontSize: '1.2rem' }}
            >
              Secure This Service
            </Link>

            <ul style={{ marginTop: '25px', textAlign: 'left', listStyle: 'none', padding: 0, fontSize: '0.9rem', color: '#94a3b8' }}>
              <li style={{ marginBottom: '10px' }}>🛡️ 100% Satisfaction Guarantee</li>
              <li style={{ marginBottom: '10px' }}>✔️ Fully Vetted Professionals</li>
              <li style={{ marginBottom: '10px' }}>🌿 Eco-Friendly Products</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ServiceDetail;