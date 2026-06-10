import { useState } from 'react';
import axios from 'axios';
import '../App.css';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isForgotPassword, setIsForgotPassword] = useState(false); // NEW STATE
    
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            // FORGOT PASSWORD FLOW
            if (isForgotPassword) {
                const res = await axios.post('https://sparkleclean-backend.onrender.com/api/auth/forgot-password', { email: formData.email });
                setSuccess(res.data.message);
                setFormData({ ...formData, email: '' }); // Clear email input
            } 
            // LOGIN FLOW
            else if (isLogin) {
                const res = await axios.post('https://sparkleclean-backend.onrender.com/api/auth/login', formData);
                localStorage.setItem('token', res.data.token);
                window.location.href = '/'; 
            } 
            // REGISTER FLOW
            else {
                const res = await axios.post('https://sparkleclean-backend.onrender.com/api/auth/register', formData);
                setSuccess(res.data.message); 
                setFormData({ name: '', email: '', password: '' }); 
            }
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container animate-fade-in" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="auth-card" style={{ maxWidth: '450px', width: '100%', padding: '40px', borderRadius: '24px', background: 'white', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}>
                
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', marginBottom: '10px' }}>
                        {isForgotPassword ? 'Reset Password 🔐' : (isLogin ? 'Welcome Back ✨' : 'Create Account ✨')}
                    </h2>
                    <p style={{ color: '#64748b' }}>
                        {isForgotPassword 
                            ? 'Enter your email and we will send you a reset link.' 
                            : (isLogin ? 'Enter your details to access your account.' : 'Join us for premium cleaning services.')}
                    </p>
                </div>

                {error && <div className="error-msg" style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem' }}>{error}</div>}
                {success && <div className="success-msg" style={{ background: '#f0fdf4', color: '#22c55e', border: '1px solid #bbf7d0', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem' }}>{success}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    
                    {!isLogin && !isForgotPassword && (
                        <div className="form-group">
                            <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#334155', marginBottom: '5px' }}>Full Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ padding: '12px 15px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} />
                        </div>
                    )}

                    <div className="form-group">
                        <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#334155', marginBottom: '5px' }}>Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ padding: '12px 15px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} />
                    </div>

                    {/* Hide password field if they are just requesting a password reset link */}
                    {!isForgotPassword && (
                        <div className="form-group">
                            <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#334155', marginBottom: '5px' }}>Password</label>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} required style={{ padding: '12px 15px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} />
                        </div>
                    )}

                    {isLogin && !isForgotPassword && (
                        <div style={{ textAlign: 'right', marginTop: '-10px' }}>
                            <button type="button" onClick={() => { setIsForgotPassword(true); setError(''); setSuccess(''); }} style={{ background: 'none', border: 'none', fontSize: '0.85rem', color: '#00c6ff', textDecoration: 'none', fontWeight: '600', cursor: 'pointer', padding: 0 }}>
                                Forgot password?
                            </button>
                        </div>
                    )}

                    <button type="submit" disabled={loading} style={{ background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)', color: 'white', padding: '14px', borderRadius: '50px', fontWeight: '700', fontSize: '1rem', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '10px', boxShadow: '0 10px 20px rgba(15, 23, 42, 0.15)' }}>
                        {loading ? 'Processing...' : (isForgotPassword ? 'Send Reset Link' : (isLogin ? 'Sign In' : 'Create Account'))}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '30px', fontSize: '0.95rem', color: '#64748b' }}>
                    {isForgotPassword ? (
                        <button type="button" onClick={() => { setIsForgotPassword(false); setError(''); setSuccess(''); }} style={{ background: 'none', border: 'none', color: '#00c6ff', fontWeight: '700', cursor: 'pointer', padding: 0 }}>
                            ← Back to Login
                        </button>
                    ) : (
                        <>
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button type="button" onClick={() => { setIsLogin(!isLogin); setError(''); setSuccess(''); }} style={{ background: 'none', border: 'none', color: '#00c6ff', fontWeight: '700', cursor: 'pointer', padding: 0 }}>
                                {isLogin ? 'Sign up' : 'Log in'}
                            </button>
                        </>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Login;