import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Components
import NavigationBar from './components/common/Navbar';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Terms from './components/pages/Terms';
import Dashboard from './components/pages/Dashboard';
import UserProfile from './components/pages/UserProfile';
import QuizPage from './components/pages/Quiz';
import CareerRoadmapPage from './components/pages/CareerRoadmap';

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/career-quiz" element={<QuizPage />} />
            <Route path="/career/:careerTitle" element={<CareerRoadmapPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
