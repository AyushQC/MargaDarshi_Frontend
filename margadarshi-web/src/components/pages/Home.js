import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Alert, Spinner, Pagination } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getColleges } from '../../services/api';
import CollegeSearch from '../colleges/CollegeSearch';
import CollegeCard from '../colleges/CollegeCard';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [collegesPerPage] = useState(6); // Display 6 colleges per page

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser && loggedInUser !== 'undefined') {
      try {
        const parsedUser = JSON.parse(loggedInUser);
        setUser(parsedUser);
        // Automatically fetch colleges for the user's district on load
        handleSearch({ district: parsedUser.district || '', program: '' }, true);
      } catch (e) {
        console.error("Error parsing user from localStorage", e);
        // Don't fetch colleges if user data is corrupt
      }
    }
    // If no user is logged in, do nothing. The page will just render the default state.
  }, []);

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
                      <Button variant="light" size="lg" className="me-3">Get Started</Button>
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
                src="https://placehold.co/500x300?text=Margadarshi" 
                alt="Margadarshi" 
                className="img-fluid rounded shadow"
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
        <h2 className="text-center mb-4">Find Your College</h2>
        <CollegeSearch onSearch={handleSearch} initialDistrict={user?.district} />

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
                <Col key={college._id}>
                  <CollegeCard college={college} />
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
            <p>No colleges found for your district. Try adjusting your search or clearing the filters to see all colleges.</p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Home;
