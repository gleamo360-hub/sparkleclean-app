import { useState, useEffect } from 'react';
import axios from 'axios';
import ServiceCard from '../components/ServiceCard';
import '../App.css';
import Reviews from '../components/Reviews';

const Home = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // This runs automatically as soon as the Home page loads
  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Asks your backend for the database list!
        const response = await axios.get('http://localhost:5000/api/services');
        setServices(response.data);
        setLoading(false);
      } catch {
        setError("Failed to fetch services. Is your backend server running?");
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <h2>Loading services...</h2>;
  if (error) return <h2 className="error">{error}</h2>;

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to ✨ SparkleClean</h1>
        <p>Professional cleaning services tailored to your exact needs.</p>
      </header>

      <section className="services-section">
        <h2>Our Cleaning Options</h2>
        <div className="services-grid">
          {/* Loops through every service in your database and creates a card */}
          {services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      </section>
      <Reviews />
    </div>
  );
};

export default Home;