import { Link } from 'react-router-dom';
import '../App.css';

const ServiceCard = ({ service }) => {
  return (
    <div className="service-card">
      {/* Uses the database image, or a gray placeholder if none exists */}
      <img
        src={service.imageUrl || "https://via.placeholder.com/300x200?text=Cleaning+Service"}
        alt={service.serviceName}
        className="service-image"
      />
      <div className="service-details">
        <h3>{service.serviceName}</h3>
        <p>{service.description}</p>
        <p className="price">Starting at ₹{service.basePrice}</p>

        <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
          <Link to={`/services/${service._id}`} className="logout-btn" style={{ textDecoration: 'none', flex: 1, textAlign: 'center' }}>
            Read Details
          </Link>
          <Link to={`/book/${service._id}`} className="cta-btn-premium" style={{ textDecoration: 'none', flex: 1, textAlign: 'center' }}>
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;