import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Alert, Spinner, Pagination } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getColleges, getCollegeSuggestions } from '../../services/api';
import CollegeSearch from '../colleges/CollegeSearch';
import CollegeCard from '../colleges/CollegeCard';
import CollegeModal from '../colleges/CollegeModal';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [collegesPerPage] = useState(6); // Display 6 colleges per page
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isShowingSuggestions, setIsShowingSuggestions] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser && loggedInUser !== 'undefined') {
      try {
        const parsedUser = JSON.parse(loggedInUser);
        setUser(parsedUser);
      } catch (e) {
        console.error("Error parsing user from localStorage", e);
      }
    }
  }, []);

  // Separate useEffect to handle initial college loading after user is set
  useEffect(() => {
    if (user) {
      // Automatically fetch colleges for the user's district on load
      handleSearch({ district: user.district || '', program: '' }, true);
    }
  }, [user]); // This will run when user state changes

  const handleSearch = async (searchParams, isInitialLoad = false) => {
    if (!user) {
      // On initial load for a logged-in user, we don't want to redirect.
      // But if a non-logged-in user tries to search, redirect them.
      if (!isInitialLoad) {
        navigate('/login');
      }
      return;
    }

    setLoading(true);
    setError('');
    setColleges([]);
    setCurrentPage(1); // Reset to the first page on every new search
    setIsShowingSuggestions(false);
    try {
      // Filter out empty params so we don't send `program=` if it's empty
      const filteredParams = Object.fromEntries(
        Object.entries(searchParams).filter(([_, v]) => v != null && v !== '')
      );
      
      const response = await getColleges(filteredParams);
      setColleges(response.data); // Correctly set the data from the response
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Could not fetch colleges.');
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestions = async (suggestionParams) => {
    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);
    setError('');
    setColleges([]);
    setCurrentPage(1);
    setIsShowingSuggestions(true);
    try {
      const response = await getCollegeSuggestions(suggestionParams);
      let suggestedColleges = response.data.colleges || [];
      
      // For 10th grade students, prioritize PUC programs over engineering/degree programs
      if (user.qualification === '10') {
        suggestedColleges = suggestedColleges.sort((a, b) => {
          const aPucCount = a.suggestedPrograms?.filter(p => 
            p.name.toLowerCase().includes('puc') || 
            p.name.toLowerCase().includes('pre-university') ||
            p.eligibility === '10th'
          ).length || 0;
          
          const bPucCount = b.suggestedPrograms?.filter(p => 
            p.name.toLowerCase().includes('puc') || 
            p.name.toLowerCase().includes('pre-university') ||
            p.eligibility === '10th'
          ).length || 0;
          
          // Colleges with more PUC programs should come first
          return bPucCount - aPucCount;
        });
      }
      
      setColleges(suggestedColleges);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Could not fetch college suggestions.');
    } finally {
      setLoading(false);
    }
  };

  const handleCollegeClick = (college) => {
    setSelectedCollege(college);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCollege(null);
  };

  const handleQuizClick = () => {
    if (user) {
      navigate('/career-quiz');
    } else {
      navigate('/login');
    }
  };

  // Pagination Logic
  const indexOfLastCollege = currentPage * collegesPerPage;
  const indexOfFirstCollege = indexOfLastCollege - collegesPerPage;
  const currentColleges = colleges.slice(indexOfFirstCollege, indexOfLastCollege);
  const totalPages = Math.ceil(colleges.length / collegesPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section bg-primary text-white py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="display-4 fw-bold">Welcome to Margadarshi</h1>
              {user ? (
                <>
                  <p className="lead">You are logged in. Explore your opportunities.</p>
                  <div className="mt-4">
                    <Link to="/dashboard">
                      <Button variant="light" size="lg">Go to Dashboard</Button>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <p className="lead">Your guide to educational and career opportunities in Karnataka</p>
                  <div className="mt-4">
                    <Link to="/register">
                      <Button variant="light" size="lg" className="me-3 get-started-btn">Get Started</Button>
                    </Link>
                    <Link to="/login">
                      <Button variant="outline-light" size="lg">Login</Button>
                    </Link>
                  </div>
                </>
              )}
            </Col>
            <Col md={6} className="text-center">
              <img 
                src="/learning.png" 
                alt="Distance learning illustration" 
                className="rounded-lg shadow-lg w-full h-auto" 
              />
            </Col>
          </Row>
        </Container>
      </div>

  {/* Career Quiz Section */}
  <Container className="py-5 text-center bg-light">
        <Row>
          <Col>
            <h2 className="fw-bold">Unsure About Your Path?</h2>
            <p className="lead text-muted">
              Take our quick career quiz to get personalized recommendations and discover the perfect career roadmap for you.
            </p>
            <Button variant="success" size="lg" onClick={handleQuizClick}>Start the Career Quiz</Button>
          </Col>
        </Row>
  </Container>

      {/* College Search Section */}
      <Container className="py-5">
        <h2 className="text-center mb-4">
          {isShowingSuggestions ? '💡 Personalized College Suggestions' : 'Find Your College'}
        </h2>
        <CollegeSearch 
          onSearch={handleSearch} 
          onSuggest={handleSuggestions}
          initialDistrict={user?.district}
          user={user}
        />

        {loading && (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
            <p>Loading colleges...</p>
          </div>
        )}

        {error && <Alert variant="danger">{error}</Alert>}

        {!loading && colleges.length > 0 && (
          <>
            <Row xs={1} md={2} lg={3} className="g-4">
              {currentColleges.map((college) => (
                <Col key={college._id || college.id}>
                  <CollegeCard college={college} onCollegeClick={handleCollegeClick} user={user} />
                </Col>
              ))}
            </Row>
            
            {totalPages > 1 && (
              <Pagination className="justify-content-center mt-5">
                <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
                {/* We can add page numbers here if needed, but for simplicity, using Prev/Next is clean */}
                <Pagination.Item active>{`Page ${currentPage} of ${totalPages}`}</Pagination.Item>
                <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
              </Pagination>
            )}
          </>
        )}

        {!loading && !error && colleges.length === 0 && user && (
          <div className="text-center text-muted mt-5">
            <p>
              {isShowingSuggestions 
                ? 'No personalized suggestions found. Try adjusting your preferences or search manually.' 
                : 'No colleges found for your search criteria. Try adjusting your filters or clearing them to see all colleges.'}
            </p>
          </div>
        )}
      </Container>

      {/* College Detail Modal */}
      <CollegeModal 
        show={showModal}
        college={selectedCollege}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Home;
