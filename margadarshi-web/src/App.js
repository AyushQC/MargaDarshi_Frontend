import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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

// Chatbot component
function ChatbotWidget() {
  useEffect(() => {
    // dynamically create the df-messenger element
    const dfMessenger = document.createElement("df-messenger");
    dfMessenger.setAttribute("intent", "WELCOME");
    dfMessenger.setAttribute("chat-title", "CareerBot");
    dfMessenger.setAttribute("agent-id", "c2a769cf-aa9d-4f58-8c8b-e390515d1091"); // replace with your agent id
    dfMessenger.setAttribute("language-code", "en");
    document.body.appendChild(dfMessenger);

    return () => {
      document.body.removeChild(dfMessenger); // cleanup on unmount
    };
  }, []);

  return null;
}

function AppContent() {
  const location = useLocation();
  const hideChatbot = ["/login", "/register"].includes(location.pathname);

  return (
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
      {!hideChatbot && <ChatbotWidget />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;





