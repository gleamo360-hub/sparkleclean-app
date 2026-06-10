import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import '../App.css';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate(); // 2. Initialize navigate
    
    // 3. Update formData state to include security fields
    const [formData, setFormData] = useState({ 
        name: '', email: '', password: '', 
        securityQuestion: '', securityAnswer: '' 
    });
    
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
                setFormData({ name: '', email: '', password: '', securityQuestion: '', securityAnswer: '' }); 
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
                        <>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            {/* 4. Registration Security Fields */}
                            <div className="form-group">
                                <label>Security Question (e.g., Pet's name?)</label>
                                <input type="text" name="securityQuestion" value={formData.securityQuestion} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Answer</label>
                                <input type="text" name="securityAnswer" value={formData.securityAnswer} onChange={handleChange} required />
                            </div>
                        </>
                    )}
                    
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>

                    {/* 5. Forgot Password Button */}
                    {isLogin && (
                        <button type="button" onClick={() => navigate('/recover-password')} style={{ background: 'none', border: 'none', color: '#00c6ff', cursor: 'pointer', fontSize: '0.85rem', textAlign: 'right' }}>
                            Forgot Password?
                        </button>
                    )}

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