import { useState } from 'react';
import '../App.css';

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // NEW: State to track which FAQ accordion is currently open
  const [openFAQ, setOpenFAQ] = useState(null); 
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '', 
    message: ''
  });

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY, 
          name: formData.name,
          email: formData.email,
          Phone: formData.phone,
          message: formData.message,
          subject: "New SparkleClean Website Inquiry!"
        }),
      });

      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // NEW: Function to toggle the FAQ accordion
  const toggleFAQ = (index) => {
    // If the clicked FAQ is already open, close it (set to null). Otherwise, open it.
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // NEW: Expanded Indian-context FAQ list
  const faqs = [
    {
      question: "Do I need to be home during the clean?",
      answer: "No, you can authorize entry with your society security guard or leave a key. Most clients prefer to step out and return to a pristine home!"
    },
    {
      question: "Do you bring your own supplies?",
      answer: "Yes, our teams arrive fully equipped with premium, eco-friendly cleaning agents, microfiber cloths, and industrial-grade vacuums."
    },
    {
      question: "Are your cleaning professionals verified?",
      answer: "Absolutely. Every SparkleClean professional undergoes a strict Aadhaar-based background check and police verification before joining our team."
    },
    {
      question: "What if I am not satisfied with the service?",
      answer: "We offer a 100% satisfaction guarantee. If a spot is missed, let us know within 24 hours, and we will return to fix it at zero extra cost."
    },
    {
      question: "How do I cancel or reschedule?",
      answer: "You can easily reschedule or cancel your booking directly from your customer dashboard up to 24 hours before your scheduled slot without any penalty."
    }
  ];

  return (
    <div className="premium-container animate-fade-in">
      <div className="text-center">
        <h2 className="section-title">Get In Touch</h2>
        <p className="subtitle">Our support team is ready to assist you anywhere in India.</p>
      </div>

      <div className="detail-grid">
        {/* Contact Info & FAQ */}
        <div className="detail-card">
          <h3>Contact Information</h3>
          <ul className="premium-checklist" style={{ marginTop: '20px' }}>
            <li>📍 <strong>HQ:</strong> 45 Sparkle Heights, MG Road, Bengaluru, Karnataka 560001</li>
            <li>📞 <strong>Phone:</strong> +91 98765 43210</li>
            <li>✉️ <strong>Email:</strong> support@sparkleclean.in</li>
          </ul>

          <h3 style={{ marginTop: '40px', borderTop: '1px solid var(--glass-border)', paddingTop: '20px', marginBottom: '15px' }}>Frequently Asked Questions</h3>
          
          {/* NEW: Interactive Accordion UI */}
          <div className="faq-container">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                style={{ 
                  marginBottom: '10px', 
                  border: '1px solid var(--glass-border)', 
                  borderRadius: '8px', 
                  overflow: 'hidden',
                  background: 'var(--bg-color)',
                  transition: 'all 0.3s ease'
                }}
              >
                <button 
                  onClick={() => toggleFAQ(index)}
                  style={{ 
                    width: '100%', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '15px', 
                    background: 'transparent', 
                    border: 'none', 
                    cursor: 'pointer',
                    color: 'var(--text-main)',
                    fontWeight: '600',
                    fontSize: '1rem',
                    textAlign: 'left'
                  }}
                >
                  {faq.question}
                  <span style={{ fontSize: '1.2rem', color: 'var(--primary-accent)' }}>
                    {openFAQ === index ? '−' : '+'}
                  </span>
                </button>
                
                {/* Conditionally render the answer if this specific FAQ is open */}
                {openFAQ === index && (
                  <div style={{ padding: '0 15px 15px 15px', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Message Form */}
        <div className="detail-card">
          <h3>Send us a Message</h3>
          
          {isSubmitted ? (
            <div style={{ background: 'rgba(37, 211, 102, 0.1)', border: '1px solid #25d366', padding: '20px', borderRadius: '12px', marginTop: '20px', textAlign: 'center' }}>
              <h3 style={{ color: '#25d366', margin: '0 0 10px 0' }}>✓ Message Sent!</h3>
              <p className="text-muted">Thank you for reaching out. A SparkleClean manager will reply to your inquiry within 2 hours.</p>
              <button onClick={() => setIsSubmitted(false)} className="cta-btn-premium" style={{ marginTop: '15px', padding: '10px 20px' }}>Send Another</button>
            </div>
          ) : (
            <form onSubmit={handleSendMessage} style={{ marginTop: '20px' }}>
              <div className="form-group">
                <label>Your Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Rahul Sharma" 
                  required 
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-color)', color: 'var(--text-main)', marginTop: '5px' }} 
                />
              </div>
              
              <div className="form-group" style={{ marginTop: '20px' }}>
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="rahul.sharma@example.in" 
                  required 
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-color)', color: 'var(--text-main)', marginTop: '5px' }} 
                />
              </div>

              <div className="form-group" style={{ marginTop: '20px' }}>
                <label>Phone Number (Optional)</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210" 
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-color)', color: 'var(--text-main)', marginTop: '5px' }} 
                />
              </div>

              <div className="form-group" style={{ marginTop: '20px' }}>
                <label>How can we help?</label>
                <textarea 
                  rows="5" 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your inquiry here..." 
                  required 
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-color)', color: 'var(--text-main)', marginTop: '5px', resize: 'vertical' }}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="cta-btn-premium" 
                disabled={isSubmitting}
                style={{ marginTop: '25px', width: '100%', fontSize: '1.1rem', opacity: isSubmitting ? 0.7 : 1 }}
              >
                {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;