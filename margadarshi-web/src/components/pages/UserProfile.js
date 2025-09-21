import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Image, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { updateProfile, uploadProfilePhoto, getProfilePhoto } from '../../services/api';
import './UserProfile.css'; // We'll create this for custom styles

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
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
        setProfilePhotoUrl(parsedUser.profilePhotoUrl || '');
        
        // Load profile photo
        loadProfilePhoto();
      } catch (e) {
        localStorage.removeItem('user');
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const loadProfilePhoto = async () => {
    try {
      const photoUrl = await getProfilePhoto();
      setPreviewImage(photoUrl);
    } catch (err) {
      // No photo available or error loading, use default
      console.log('No profile photo available');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file (JPG, PNG, etc.)');
        return;
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }
      
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
      setError('');
    }
  };

  const handleUploadPhoto = async () => {
    if (!selectedFile) return;
    
    setUploadingPhoto(true);
    setError('');
    
    try {
      await uploadProfilePhoto(selectedFile);
      setSuccess('Profile photo uploaded successfully!');
      setSelectedFile(null);
      // Reload the photo to get the updated version
      loadProfilePhoto();
    } catch (err) {
      setError(err.message || 'Failed to upload photo');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setProfilePhotoUrl(url);
    setFormData(prev => ({ ...prev, profilePhotoUrl: url }));
    if (url) {
      setPreviewImage(url);
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
                      src={previewImage || 'https://placehold.co/150x150?text=No+Image'}
                      roundedCircle
                      className="profile-picture"
                      style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                    {isEditing && (
                      <div className="mt-3">
                        <Form.Group controlId="formFile">
                          <Form.Label>Upload Profile Photo</Form.Label>
                          <Form.Control 
                            type="file" 
                            onChange={handleFileChange} 
                            accept="image/*"
                            size="sm" 
                          />
                          <Form.Text className="text-muted">
                            Max 5MB. JPG, PNG supported.
                          </Form.Text>
                        </Form.Group>
                        
                        {selectedFile && (
                          <Button 
                            variant="primary" 
                            size="sm" 
                            className="mt-2"
                            onClick={handleUploadPhoto}
                            disabled={uploadingPhoto}
                          >
                            {uploadingPhoto ? (
                              <>
                                <Spinner size="sm" className="me-2" />
                                Uploading...
                              </>
                            ) : (
                              'Upload Photo'
                            )}
                          </Button>
                        )}
                        
                        <hr className="my-3" />
                        
                        <Form.Group controlId="profilePhotoUrl">
                          <Form.Label>Or use Image URL</Form.Label>
                          <Form.Control 
                            type="url" 
                            value={profilePhotoUrl}
                            onChange={handleUrlChange}
                            placeholder="Enter image URL"
                            size="sm"
                          />
                          <Form.Text className="text-muted">
                            Alternative to file upload
                          </Form.Text>
                        </Form.Group>
                      </div>
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
