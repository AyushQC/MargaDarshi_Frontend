import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser, getProfilePhoto } from '../../services/api';

const NavigationBar = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    if (user) {
      loadProfilePhoto();
    }
  }, [user]);

  const loadProfilePhoto = async () => {
    try {
      const photoUrl = await getProfilePhoto();
      setProfilePhoto(photoUrl);
    } catch (err) {
      // No photo available, use default
      setProfilePhoto(null);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser(); // Call the logout API
    } catch (error) {
      console.error("Logout failed", error);
      // Still clear local storage even if API fails, to avoid being stuck
    } finally {
      // Cleanup profile photo URL if it exists
      if (profilePhoto) {
        URL.revokeObjectURL(profilePhoto);
      }
      setProfilePhoto(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Margadarshi</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {user ? (
              <>
                <Nav.Link as={Link} to="/profile">
                  {profilePhoto ? (
                    <div className="d-flex align-items-center">
                      <Image 
                        src={profilePhoto} 
                        roundedCircle 
                        width="30" 
                        height="30" 
                        className="me-2"
                        style={{ objectFit: 'cover' }}
                      />
                      Profile
                    </div>
                  ) : (
                    'Profile'
                  )}
                </Nav.Link>
                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;