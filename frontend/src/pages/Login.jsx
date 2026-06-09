import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Login = () => {
  // Toggles between Login and Register modes
  const [isLogin, setIsLogin] = useState(true);
  
  // Stores what the user types into the input boxes
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  
  // Handles success and error messages
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  // Used to redirect the user to a different page after they log in
  const navigate = useNavigate();

  // Updates the state whenever the user types
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      if (isLogin) {
        // --- LOGIN LOGIC ---
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          email: formData.email,
          password: formData.password
        });
        
        // Save the digital ticket (JWT) to the browser's local storage!
        localStorage.setItem('token', response.data.token);
        
        setMessage('Login successful! Redirecting to home...');
        
        // Wait 1.5 seconds, then send them to the Home Page
        setTimeout(() => navigate('/'), 1500); 
      } else {
        // --- REGISTER LOGIC ---
        await axios.post('http://localhost:5000/api/auth/register', {
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
        
        setMessage('Registration successful! You can now log in.');
        setIsLogin(true); // Automatically switch the view back to Login
      }
    } catch (err) {
      // Show the exact error message your backend sends (e.g., "User not found")
      setError(err.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? 'Welcome Back' : 'Create an Account'}</h2>
        
        {/* Display Error or Success Messages */}
        {error && <p className="error-msg">{error}</p>}
        {message && <p className="success-msg">{message}</p>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          {/* Only show the Name field if they are registering */}
          {!isLogin && (
            <div className="form-group">
              <label>Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required={!isLogin} />
            </div>
          )}
          
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          
          <button type="submit" className="btn-submit">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        
        {/* Toggle Button */}
        <p className="auth-toggle">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign up here' : 'Log in here'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;