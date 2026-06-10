import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const ResetPassword = () => {
    const { token } = useParams(); // Grabs the security token from the URL
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            const res = await axios.put(`https://sparkleclean-backend.onrender.com/api/auth/reset-password/${token}`, { password });
            setMessage(res.data.message);
            setSuccess(true);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to reset password. The link may have expired.');
        }
    };

    return (
        <div className="premium-container animate-fade-in text-center" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="detail-card" style={{ maxWidth: '400px', margin: '0 auto', width: '100%' }}>
                
                <h2 style={{ color: '#0f172a', marginBottom: '20px' }}>Enter New Password</h2>
                
                {error && <p className="error-msg">{error}</p>}
                {message && <p className="success-msg">{message}</p>}

                {!success ? (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div className="form-group" style={{ textAlign: 'left' }}>
                            <input 
                                type="password" 
                                placeholder="Enter a secure new password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                                style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', width: '100%' }}
                            />
                        </div>
                        <button type="submit" className="cta-btn-premium">Update Password</button>
                    </form>
                ) : (
                    <Link to="/login" className="cta-btn-premium" style={{ marginTop: '20px' }}>Go to Login</Link>
                )}
                
            </div>
        </div>
    );
};

export default ResetPassword;