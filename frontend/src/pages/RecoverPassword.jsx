import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const RecoverPassword = () => {
    const [formData, setFormData] = useState({ email: '', securityAnswer: '', newPassword: '' });
    const [message, setMessage] = useState({ text: '', type: '' }); // 'success' or 'error'
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRecover = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: '', type: '' });

        try {
            const res = await axios.post('https://sparkleclean-backend.onrender.com/api/auth/recover-password', formData);
            
            // Show success message inside the page
            setMessage({ text: res.data.message, type: 'success' });
            
            // Redirect after 2 seconds
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setMessage({ 
                text: err.response?.data?.message || "Recovery failed. Please check your details.", 
                type: 'error' 
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container animate-fade-in" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="auth-card" style={{ maxWidth: '450px', width: '100%', padding: '40px', borderRadius: '24px', background: 'white', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}>
                
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a' }}>Recover Password 🔐</h2>
                    <p style={{ color: '#64748b' }}>Answer your security question to reset your password.</p>
                </div>

                {/* Status Message Display */}
                {message.text && (
                    <div style={{ 
                        padding: '12px', 
                        borderRadius: '8px', 
                        marginBottom: '20px', 
                        fontSize: '0.9rem',
                        textAlign: 'center',
                        background: message.type === 'success' ? '#f0fdf4' : '#fef2f2',
                        color: message.type === 'success' ? '#22c55e' : '#ef4444',
                        border: message.type === 'success' ? '1px solid #bbf7d0' : '1px solid #fecaca'
                    }}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleRecover} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div className="form-group">
                        <label style={{ fontWeight: '600' }}>Email Address</label>
                        <input type="email" name="email" onChange={handleChange} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                    </div>
                    <div className="form-group">
                        <label style={{ fontWeight: '600' }}>Security Answer</label>
                        <input type="text" name="securityAnswer" onChange={handleChange} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                    </div>
                    <div className="form-group">
                        <label style={{ fontWeight: '600' }}>New Password</label>
                        <input type="password" name="newPassword" onChange={handleChange} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                    </div>
                    
                    <button type="submit" disabled={loading} style={{ background: '#00c6ff', color: 'white', padding: '14px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}>
                        {loading ? 'Updating...' : 'Update Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RecoverPassword;