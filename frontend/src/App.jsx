import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import BookService from './pages/BookService';
import ServiceDetail from './pages/ServiceDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Blogs from './pages/Blogs';
import Gallery from './pages/Gallery';
import ServicesPage from './pages/ServicesPage';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar /> 
      
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/book/:id" element={<BookService />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;