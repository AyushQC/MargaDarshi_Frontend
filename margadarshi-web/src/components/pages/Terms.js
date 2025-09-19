import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <h2 className="text-center mb-4">Terms and Conditions</h2>
              
              <div className="terms-content">
                <h4>1. Introduction</h4>
                <p>
                  Welcome to Margadarshi. These Terms and Conditions govern your use of our website and services. 
                  By accessing or using our platform, you agree to be bound by these Terms.
                </p>
                
                <h4>2. User Registration</h4>
                <p>
                  When you register for an account on Margadarshi, you agree to provide accurate, current, and complete information.
                  You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                </p>
                
                <h4>3. Privacy Policy</h4>
                <p>
                  Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information.
                  By using our services, you consent to our collection and use of your data as described in our Privacy Policy.
                </p>
                
                <h4>4. User Data</h4>
                <p>
                  We collect personal information including name, date of birth, qualification, district, specialization, age, gender, 
                  academic interests, and email address. This information is used to provide personalized guidance and services.
                </p>
                
                <h4>5. Data Security</h4>
                <p>
                  We implement appropriate security measures to protect your personal information against unauthorized access, 
                  alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
                </p>
                
                <h4>6. User Responsibilities</h4>
                <p>
                  You agree not to:
                </p>
                <ul>
                  <li>Provide false or misleading information</li>
                  <li>Use the service for any illegal purpose</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with the proper working of the service</li>
                </ul>
                
                <h4>7. Modifications to Terms</h4>
                <p>
                  We reserve the right to modify these Terms at any time. We will notify users of any significant changes.
                  Your continued use of the service after such modifications constitutes your acceptance of the updated Terms.
                </p>
                
                <h4>8. Termination</h4>
                <p>
                  We may terminate or suspend your account and access to our services at our sole discretion, without prior notice,
                  for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
                </p>
                
                <h4>9. Limitation of Liability</h4>
                <p>
                  To the maximum extent permitted by law, Margadarshi shall not be liable for any indirect, incidental, special, 
                  consequential, or punitive damages, or any loss of profits or revenues.
                </p>
                
                <h4>10. Contact Information</h4>
                <p>
                  If you have any questions about these Terms, please contact us at support@margadarshi.com.
                </p>
              </div>
              
              <div className="text-center mt-4">
                <Link to="/register">
                  <Button variant="primary">Back to Registration</Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Terms;