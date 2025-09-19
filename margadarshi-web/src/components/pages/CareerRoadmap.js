import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Spinner, Alert, ListGroup, Row, Col } from 'react-bootstrap';
import { getCareerDetails } from '../../services/api';
import Mermaid from '../common/Mermaid';
import './CareerRoadmap.css';

const CareerRoadmapPage = () => {
  const { careerTitle } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const decodedTitle = decodeURIComponent(careerTitle);
        const response = await getCareerDetails(decodedTitle);
        setDetails(response.data.career_details);
      } catch (err) {
        setError('Failed to load career details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [careerTitle]);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading Career Roadmap...</p>
      </Container>
    );
  }

  if (error) {
    return <Container className="py-5"><Alert variant="danger">{error}</Alert></Container>;
  }

  if (!details) {
    return <Container className="py-5"><Alert variant="warning">No details found for this career.</Alert></Container>;
  }

  return (
    <Container className="py-5 roadmap-container">
      <h1 className="text-center mb-4">{decodeURIComponent(careerTitle)}</h1>
      
      <Row>
        {/* Left Column: Description and Lists */}
        <Col md={5}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title as="h4">Description</Card.Title>
              <Card.Text>{details.description}</Card.Text>
            </Card.Body>
          </Card>

          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title as="h4">Relevant Degree Programs</Card.Title>
              <ListGroup variant="flush">
                {details.degree_programs.map((program, index) => (
                  <ListGroup.Item key={index}>{program}</ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>

          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title as="h4">Key Courses & Skills</Card.Title>
              <ListGroup variant="flush">
                {details.course_to_career_mapping.map((course, index) => (
                  <ListGroup.Item key={index}>{course}</ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Column: Visual Roadmap */}
        <Col md={7}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title as="h4" className="text-center">Visual Career Roadmap</Card.Title>
              <div className="mermaid-chart-container">
                <Mermaid chart={details.mermaid_code} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CareerRoadmapPage;
