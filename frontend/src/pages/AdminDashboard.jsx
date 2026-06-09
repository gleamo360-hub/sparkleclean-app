import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllBookings = async () => {
      const token = localStorage.getItem('token');
      
      // If there is no token, kick them to login
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        // Fetch from the secure ADMIN ONLY route
        const response = await axios.get('http://localhost:5000/api/bookings/all', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(response.data);
        setLoading(false);
      } catch {
        // If the backend kicks them out (403 Forbidden), they are not an admin!
        setError('ACCESS DENIED: You do not have Admin privileges to view this page.');
        setLoading(false);
      }
    };

    fetchAllBookings();
  }, [navigate]);

  if (loading) return <div className="text-center" style={{ padding: '100px' }}><h3>Loading Command Center...</h3></div>;
  
  // If a regular user tries to access this, show the giant red error
  if (error) return (
    <div className="premium-container animate-fade-in text-center">
      <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', padding: '40px', borderRadius: '20px' }}>
        <h1 style={{ color: '#ef4444', fontSize: '3rem', margin: 0 }}>🚨</h1>
        <h2 style={{ color: '#ef4444' }}>{error}</h2>
        <p className="text-muted">This activity has been logged.</p>
      </div>
    </div>
  );

  return (
    <div className="premium-container animate-fade-in" style={{ maxWidth: '1400px' }}>
      <div className="detail-hero" style={{ padding: '40px', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderColor: '#00c6ff' }}>
        <span className="badge" style={{ background: '#00c6ff', color: '#0f172a' }}>Admin Privilege Active</span>
        <h1 style={{ color: 'white', margin: '15px 0 0 0' }}>Mission Control</h1>
        <p className="text-muted">Real-time overview of all customer bookings.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '25px', marginTop: '40px' }}>
        {bookings.length === 0 ? (
          <h3 className="text-muted text-center" style={{ gridColumn: '1 / -1' }}>No bookings found in the database.</h3>
        ) : (
          bookings.map((booking) => (
            <div key={booking._id} className="detail-card" style={{ borderTop: '4px solid #00c6ff', position: 'relative' }}>
              
              {/* Badge for Status */}
              <span style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255, 255, 255, 0.1)', padding: '5px 12px', borderRadius: '50px', fontSize: '0.8rem', color: '#00c6ff', fontWeight: 'bold' }}>
                {booking.status || 'Pending'}
              </span>

              {/* Service Details */}
              <h3 style={{ color: '#00c6ff', fontSize: '1.4rem', marginBottom: '5px' }}>
                {booking.serviceId?.serviceName || "Deleted Service"}
              </h3>
              <p style={{ margin: '0 0 20px 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <strong>Booked On:</strong> {new Date(booking.createdAt).toLocaleDateString()}
              </p>

              <div style={{ background: 'var(--bg-color)', padding: '15px', borderRadius: '12px', marginBottom: '15px' }}>
                <p style={{ margin: '0 0 10px 0', fontSize: '0.95rem' }}>📅 <strong>Service Needed For:</strong><br/> <span style={{ color: 'white' }}>{new Date(booking.date).toLocaleDateString()}</span></p>
                <p style={{ margin: '0 0 10px 0', fontSize: '0.95rem' }}>📍 <strong>Address:</strong><br/> <span style={{ color: 'white' }}>{booking.address}</span></p>
              </div>

              {/* Customer Details */}
              <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '15px' }}>
                <h4 style={{ margin: '0 0 10px 0', color: 'var(--text-muted)' }}>Customer Info</h4>
                <p style={{ margin: '5px 0', fontSize: '0.95rem' }}>👤 {booking.customerId?.name || "Deleted User"}</p>
                <p style={{ margin: '5px 0', fontSize: '0.95rem' }}>📧 {booking.customerId?.email || "N/A"}</p>
                <p style={{ margin: '5px 0', fontSize: '0.95rem' }}>📞 {booking.phone}</p>
              </div>

              {/* Optional Message */}
              {booking.optionalMessage && (
                <div style={{ background: 'rgba(0, 198, 255, 0.05)', borderLeft: '3px solid #00c6ff', padding: '10px 15px', marginTop: '15px', borderRadius: '0 8px 8px 0' }}>
                  <p style={{ margin: 0, fontSize: '0.9rem', fontStyle: 'italic', color: '#94a3b8' }}>
                    " {booking.optionalMessage} "
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;