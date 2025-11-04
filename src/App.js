import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EmailScanner from './components/EmailScanner';
import Home from './pages/Home';
import Learn from './pages/Learn';
import Protect from './pages/Protect';
import Community from './pages/Community';
import Report from './pages/Report';
import Signup from './pages/Signup';
import Login from './Login';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/protect" element={
              <div className="py-12 bg-gray-50">
                <EmailScanner />
              </div>
            } />
            <Route path="/community" element={<Community />} />
            <Route path="/report" element={<Report />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
