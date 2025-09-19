import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { verifyOtp, loginUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const emailSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  const otpSchema = Yup.object().shape({
    otp: Yup.string().required('OTP is required').length(6, 'OTP must be 6 digits'),
  });

  const handleSendOtp = async (values) => {
    try {
      setError('');
      await loginUser(values.email); // This will trigger the OTP send
      setEmail(values.email);
      setSuccess('OTP sent successfully to your email');
      setStep(2);
    } catch (err) {
      setError(err.message || 'Failed to send OTP');
    }
  };

  const handleVerifyOtp = async (values) => {
    try {
      setError('');
      const response = await verifyOtp(email, values.otp);
      
      // The backend should return user data and a token upon successful OTP verification
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', response.token);
      
      setSuccess('Login successful!');
      
      // Redirect to dashboard after successful login
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      setError(err.message || 'Invalid OTP');
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <h2 className="text-center mb-4">Login</h2>
              
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              
              {step === 1 ? (
                <Formik
                  initialValues={{ email: '' }}
                  validationSchema={emailSchema}
                  onSubmit={handleSendOtp}
                >
                  {({ handleSubmit, handleChange, values, touched, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
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
                      
                      <Button variant="primary" type="submit" className="w-100 mt-3">
                        Send OTP
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
                        Verify OTP
                      </Button>
                      
                      <div className="text-center mt-3">
                        <Button 
                          variant="link" 
                          onClick={() => {
                            setStep(1);
                            setSuccess('');
                          }}
                        >
                          Change Email
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              )}
              
              <div className="text-center mt-3">
                <p>Don't have an account? <a href="/register">Register here</a></p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;