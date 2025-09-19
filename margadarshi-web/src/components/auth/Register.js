import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser, verifyOtp, loginUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Register = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 60;
  const maxYear = currentYear - 15;
  
  // List of all Indian states
  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
    'Uttarakhand', 'West Bengal'
  ];

  const registerSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    dob: Yup.date()
      .required('Date of Birth is required')
      .max(new Date(maxYear, 11, 31), 'You must be at least 15 years old')
      .min(new Date(minYear, 0, 1), 'You cannot be more than 60 years old'),
    qualification: Yup.string().required('Qualification is required').oneOf(['10', '12'], 'Invalid qualification'),
    state: Yup.string().required('State is required').oneOf(['Karnataka'], 'Only Karnataka state is supported currently'),
    district: Yup.string().required('District is required').oneOf(['Kalaburagi', 'Koppal'], 'Invalid district'),
    gender: Yup.string().required('Gender is required').oneOf(['male', 'female', 'other'], 'Invalid gender'),
    specialization: Yup.string().when('qualification', {
      is: '12',
      then: () => Yup.string().required('Specialization is required for 12th qualification'),
      otherwise: () => Yup.string(),
    }),
    academic_interests: Yup.array().min(1, 'Select at least one academic interest'),
    termsAccepted: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
  });

  const otpSchema = Yup.object().shape({
    otp: Yup.string().required('OTP is required').length(6, 'OTP must be 6 digits'),
  });

  const handleRegister = async (values) => {
    try {
      setError('');
      
      // Calculate age from DOB
      const dob = new Date(values.dob);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      
      // Prepare user data
      const userDataToSave = {
        name: values.name,
        email: values.email,
        dob: values.dob,
        qualification: values.qualification,
        state: values.state,
        district: values.district,
        gender: values.gender,
        age: age,
        specialization: values.qualification === '12' ? values.specialization : '',
        academic_interests: values.academic_interests || [],
        phone: values.phone || null,
      };
      
      // The backend should automatically send an OTP upon successful registration
      await registerUser(userDataToSave);
      console.log("User registered successfully");
      
      setUserData(userDataToSave);
      setSuccess('Registration successful! OTP sent to your email for verification');
      setStep(2);
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || 'Failed to register');
    }
  };

  const handleVerifyOtp = async (values) => {
    try {
      setError('');
      
      // Verify OTP. The backend should return user data and a token on success.
      const response = await verifyOtp(userData.email, values.otp);
      
      // Store user data and token in localStorage
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', response.token);
      
      setSuccess('OTP verified successfully! Redirecting to your dashboard...');
      
      // Redirect to profile page after successful verification
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Invalid OTP');
    }
  };

  const academicInterestOptions = [
    'Science', 'Mathematics', 'Engineering', 'Medicine', 'Arts', 
    'Commerce', 'Humanities', 'Computer Science', 'Agriculture'
  ];

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <h2 className="text-center mb-4">Register</h2>
              
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              
              {step === 1 ? (
                <Formik
                  initialValues={{
                    name: '',
                    email: '',
                    dob: '',
                    qualification: '',
                    state: 'Karnataka',
                    district: 'Kalaburagi',
                    gender: '',
                    specialization: '',
                    academic_interests: [],
                    termsAccepted: false
                  }}
                  validationSchema={registerSchema}
                  onSubmit={handleRegister}
                >
                  {({ handleSubmit, handleChange, setFieldValue, values, touched, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="name"
                              value={values.name}
                              onChange={handleChange}
                              isInvalid={touched.name && !!errors.name}
                              placeholder="Enter your full name"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.name}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              value={values.email}
                              onChange={handleChange}
                              isInvalid={touched.email && !!errors.email}
                              placeholder="Enter your email"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.email}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control
                              type="date"
                              name="dob"
                              value={values.dob}
                              onChange={handleChange}
                              isInvalid={touched.dob && !!errors.dob}
                              max={`${maxYear}-12-31`}
                              min={`${minYear}-01-01`}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.dob}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select
                              name="gender"
                              value={values.gender}
                              onChange={handleChange}
                              isInvalid={touched.gender && !!errors.gender}
                            >
                              <option value="">Select Gender</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              {errors.gender}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Qualification</Form.Label>
                            <Form.Select
                              name="qualification"
                              value={values.qualification}
                              onChange={handleChange}
                              isInvalid={touched.qualification && !!errors.qualification}
                            >
                              <option value="">Select Qualification</option>
                              <option value="10">10th Pass</option>
                              <option value="12">12th Pass</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              {errors.qualification}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>State</Form.Label>
                            <Form.Select
                              name="state"
                              value={values.state}
                              onChange={handleChange}
                              isInvalid={touched.state && !!errors.state}
                            >
                              <option value="">Select State</option>
                              {indianStates.map((state) => (
                                <option 
                                  key={state} 
                                  value={state}
                                  disabled={state !== 'Karnataka'}
                                  className={state !== 'Karnataka' ? 'text-muted' : ''}
                                >
                                  {state}
                                </option>
                              ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              {errors.state}
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">
                              Currently, only Karnataka state is supported
                            </Form.Text>
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>District</Form.Label>
                            <Form.Select
                              name="district"
                              value={values.district}
                              onChange={handleChange}
                              isInvalid={touched.district && !!errors.district}
                              disabled={values.state !== 'Karnataka'}
                            >
                              <option value="Kalaburagi">Kalaburagi</option>
                              <option value="Koppal">Koppal</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              {errors.district}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      {values.qualification === '12' && (
                        <Form.Group className="mb-3">
                          <Form.Label>Specialization</Form.Label>
                          <Form.Control
                            type="text"
                            name="specialization"
                            value={values.specialization}
                            onChange={handleChange}
                            isInvalid={touched.specialization && !!errors.specialization}
                            placeholder="Enter your specialization"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.specialization}
                          </Form.Control.Feedback>
                        </Form.Group>
                      )}
                      
                      <Form.Group className="mb-3">
                        <Form.Label>Academic Interests</Form.Label>
                        <div className="d-flex flex-wrap">
                          {academicInterestOptions.map((interest) => (
                            <Form.Check
                              key={interest}
                              type="checkbox"
                              id={`interest-${interest}`}
                              label={interest}
                              name="academic_interests"
                              value={interest}
                              checked={values.academic_interests.includes(interest)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFieldValue('academic_interests', [...values.academic_interests, interest]);
                                } else {
                                  setFieldValue(
                                    'academic_interests',
                                    values.academic_interests.filter((i) => i !== interest)
                                  );
                                }
                              }}
                              className="me-3 mb-2"
                            />
                          ))}
                        </div>
                        {touched.academic_interests && errors.academic_interests && (
                          <div className="text-danger">{errors.academic_interests}</div>
                        )}
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Check
                          type="checkbox"
                          id="termsAccepted"
                          name="termsAccepted"
                          label={
                            <span>
                              I accept the <Link to="/terms">Terms and Conditions</Link>
                            </span>
                          }
                          checked={values.termsAccepted}
                          onChange={handleChange}
                          isInvalid={touched.termsAccepted && !!errors.termsAccepted}
                          feedback={errors.termsAccepted}
                          feedbackType="invalid"
                        />
                      </Form.Group>
                      
                      <Button variant="primary" type="submit" className="w-100 mt-3">
                        Register & Send OTP
                      </Button>
                    </Form>
                  )}
                </Formik>
              ) : (
                <Formik
                  initialValues={{ otp: '' }}
                  validationSchema={otpSchema}
                  onSubmit={handleVerifyOtp}
                >
                  {({ handleSubmit, handleChange, values, touched, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                      <Form.Group className="mb-3">
                        <Form.Label>Enter OTP</Form.Label>
                        <Form.Control
                          type="text"
                          name="otp"
                          value={values.otp}
                          onChange={handleChange}
                          isInvalid={touched.otp && !!errors.otp}
                          placeholder="Enter 6-digit OTP"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.otp}
                        </Form.Control.Feedback>
                      </Form.Group>
                      
                      <Button variant="primary" type="submit" className="w-100 mt-3">
                        Verify OTP & Complete Registration
                      </Button>
                      
                      <div className="text-center mt-3">
                        <Button 
                          variant="link" 
                          onClick={() => {
                            setStep(1);
                            setSuccess('');
                          }}
                        >
                          Back to Registration
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              )}
              
              <div className="text-center mt-3">
                <p>Already have an account? <Link to="/login">Login here</Link></p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;