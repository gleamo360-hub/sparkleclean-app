import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const RecoverPassword = () => {
    const [formData, setFormData] = useState({ 
        email: '', 
        securityAnswer: '', 
        newPassword: '' 
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRecover = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://sparkleclean-backend.onrender.com/api/auth/recover-password', formData);
            alert("Password updated successfully! Please login.");
            navigate('/login');
        } catch (err) {
            alert(err.response?.data?.message || "Recovery failed.");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Recover Password 🔐</h2>
                <form onSubmit={handleRecover} className="auth-form">
                    <input name="email" placeholder="Email" onChange={handleChange} required />
                    <input name="securityAnswer" placeholder="Your Security Answer" onChange={handleChange} required />
                    <input type="password" name="newPassword" placeholder="New Password" onChange={handleChange} required />
                    <button type="submit" className="btn-submit">Update Password</button>
                </form>
            </div>
        </div>
    );
};

export default RecoverPassword;