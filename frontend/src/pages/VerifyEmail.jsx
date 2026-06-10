import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const VerifyEmail = () => {
    // Grabs the token from the URL (e.g., /verify-email/123456)
    const { token } = useParams();
    const [message, setMessage] = useState('Verifying your email...');
    const [status, setStatus] = useState('loading'); // 'loading', 'success', or 'error'

    useEffect(() => {
        const verifyAccount = async () => {
            try {
                // Ping the backend verification route
                const res = await axios.get(`https://sparkleclean-backend.onrender.com/api/auth/verify/${token}`);
                setMessage(res.data.message);
                setStatus('success');
            } catch (err) {
                setMessage(err.response?.data?.message || 'Verification failed. The link may be invalid or expired.');
                setStatus('error');
            }
        };

        verifyAccount();
    }, [token]);

    return (
        <div className="premium-container animate-fade-in text-center" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="detail-card" style={{ maxWidth: '500px', margin: '0 auto' }}>
                
                {status === 'loading' && <h2 style={{ color: '#0f172a' }}>⏳ {message}</h2>}
                
                {status === 'success' && (
                    <>
                        <h1 style={{ color: '#22c55e', fontSize: '3rem', margin: '0 0 10px 0' }}>✅</h1>
                        <h2 style={{ color: '#0f172a', marginBottom: '20px' }}>Account Verified!</h2>
                        <p className="text-muted" style={{ marginBottom: '30px' }}>{message}</p>
                        <Link to="/login" className="cta-btn-premium">Proceed to Login</Link>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <h1 style={{ color: '#ef4444', fontSize: '3rem', margin: '0 0 10px 0' }}>❌</h1>
                        <h2 style={{ color: '#0f172a', marginBottom: '20px' }}>Verification Failed</h2>
                        <p className="error-msg">{message}</p>
                        <Link to="/login" style={{ color: '#00c6ff', fontWeight: 'bold', textDecoration: 'none' }}>Return to Login</Link>
                    </>
                )}
                
            </div>
        </div>
    );
};

export default VerifyEmail;