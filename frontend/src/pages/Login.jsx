import { useState } from 'react';
import axios from 'axios';
import '../App.css';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
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
            if (isLogin) {
                const res = await axios.post('https://sparkleclean-backend.onrender.com/api/auth/login', formData);
                localStorage.setItem('token', res.data.token);
                window.location.href = '/'; 
            } else {
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
                        {isLogin ? 'Welcome Back ✨' : 'Create Account ✨'}
                    </h2>
                </div>

                {error && <div className="error-msg">{error}</div>}
                {success && <div className="success-msg">{success}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {!isLogin && (
                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                    )}
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>

                    <button type="submit" disabled={loading} className="btn-submit">
                        {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button type="button" onClick={() => { setIsLogin(!isLogin); setError(''); setSuccess(''); }} style={{ background: 'none', border: 'none', color: '#00c6ff', fontWeight: '700', cursor: 'pointer' }}>
                        {isLogin ? 'Sign up' : 'Log in'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;