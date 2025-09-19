import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Image, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../services/api';
import './UserProfile.css'; // We'll create this for custom styles

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser && loggedInUser !== 'undefined') {
      try {
        const parsedUser = JSON.parse(loggedInUser);
        setUser(parsedUser);
        setFormData({
          ...parsedUser,
          dob: parsedUser.dob ? new Date(parsedUser.dob).toISOString().split('T')[0] : '',
        });
      } catch (e) {
        localStorage.removeItem('user');
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      // Note: We are not setting the file in formData as the backend doesn't support file uploads yet.
      // This is for UI demonstration purposes.
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Exclude fields that shouldn't be sent or are managed by the backend
    const { _id, __v, isLoggedIn, ...updateData } = formData;

    try {
      const response = await updateProfile(updateData);
      // Update user state and localStorage with the new user data from the backend
      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      setError(err.message || 'Failed to update profile.');
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={8} md={10}>
          <Card className="shadow-sm">
            <Card.Header className="p-4 bg-primary text-white">
              <h3 className="mb-0">My Profile</h3>
            </Card.Header>
            <Card.Body className="p-4">
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={4} className="text-center mb-4 mb-md-0">
                    <Image
                      src={previewImage || user.profilePicture || 'https://placehold.co/150x150?text=No+Image'}
                      roundedCircle
                      className="profile-picture"
                    />
                    {isEditing && (
                      <Form.Group controlId="formFile" className="mt-3">
                        <Form.Control type="file" onChange={handleFileChange} size="sm" />
                        <Form.Text className="text-muted">
                          Profile photo upload is for demonstration.
                        </Form.Text>
                      </Form.Group>
                    )}
                  </Col>
                  <Col md={8}>
                    {!isEditing ? (
                      <>
                        <h4>{user.name}</h4>
                        <p className="text-muted">{user.email}</p>
                        <hr />
                        <Row>
                          <Col sm={6}><strong>Qualification:</strong> {user.qualification === '10' ? '10th Pass' : '12th Pass'}</Col>
                          <Col sm={6}><strong>DOB:</strong> {new Date(user.dob).toLocaleDateString()}</Col>
                          <Col sm={6}><strong>Gender:</strong> {user.gender}</Col>
                          <Col sm={6}><strong>District:</strong> {user.district}</Col>
                          <Col sm={12}><strong>Interests:</strong> {user.academic_interests.join(', ')}</Col>
                        </Row>
                      </>
                    ) : (
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control type="date" name="dob" value={formData.dob} onChange={handleChange} />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select name="gender" value={formData.gender} onChange={handleChange}>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Qualification</Form.Label>
                            <Form.Select name="qualification" value={formData.qualification} onChange={handleChange}>
                              <option value="10">10th Pass</option>
                              <option value="12">12th Pass</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                    )}
                  </Col>
                </Row>
                <hr />
                <div className="text-end">
                  {isEditing ? (
                    <>
                      <Button variant="secondary" className="me-2" onClick={() => setIsEditing(false)}>Cancel</Button>
                      <Button variant="primary" type="submit">Save Changes</Button>
                    </>
                  ) : (
                    <Button variant="primary" onClick={() => setIsEditing(true)}>Edit Profile</Button>
                  )}
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
