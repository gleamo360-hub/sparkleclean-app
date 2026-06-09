import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const BookService = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const [service, setService] = useState(null);
  
  // NEW: Added state for address and phone
  const [date, setDate] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [optionalMessage, setOptionalMessage] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/services');
        const foundService = response.data.find(s => s._id === id);
        setService(foundService);
      } catch {
        setError("Failed to load service details.");
      }
    };
    fetchService();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to book a service!');
      setTimeout(() => navigate('/login'), 2500);
      return;
    }

    try {
      // NEW: We are now sending the address and phone to the backend!
      await axios.post('http://localhost:5000/api/bookings', 
        {
          serviceId: id,
          date: date,
          address: address,
          phone: phone,
          optionalMessage: optionalMessage
        }, 
        {
          headers: { Authorization: `Bearer ${token}` } 
        }
      );
      
      setMessage('Booking successful! We will see you soon.');
      setTimeout(() => navigate('/'), 2500);
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed.');
    }
  };

  if (!service) return <h2 className="text-center mt-2">Loading booking details...</h2>;

  return (
    <div className="book-container">
      <div className="book-card">
        <h2>Book Your Appointment</h2>
        <h3>{service.serviceName}</h3>
        <p className="book-price">Price: ${service.basePrice}</p>

        {error && <p className="error-msg">{error}</p>}
        {message && <p className="success-msg">{message}</p>}

        <form onSubmit={handleBooking} className="book-form">
          <div className="form-group">
            <label>Select Date</label>
            <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              required 
            />
          </div>
          
          {/* NEW: Address Input */}
          <div className="form-group">
            <label>Service Address</label>
            <input 
              type="text" 
              placeholder="123 Main St, City, Zip"
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
              required 
            />
          </div>

          {/* NEW: Phone Input */}
         <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" placeholder="(555) 555-5555" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>

          {/* NEW: Optional Message Field */}
          <div className="form-group">
            <label>Message (Optional)</label>
            <textarea 
              rows="3" 
              placeholder="Any special instructions for the cleaner?"
              value={optionalMessage} 
              onChange={(e) => setOptionalMessage(e.target.value)} 
            />
          </div>

          <button type="submit" className="btn-submit">Confirm Booking</button>
        </form>
      </div>
    </div>
  );
};

export default BookService;