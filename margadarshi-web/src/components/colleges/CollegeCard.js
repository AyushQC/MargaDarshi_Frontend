import React from 'react';
import { Card, Badge, ListGroup, Button } from 'react-bootstrap';
import './CollegeCard.css';

const CollegeCard = ({ college, onCollegeClick, user }) => {
  const handleCardClick = () => {
    if (onCollegeClick) {
      onCollegeClick(college);
    }
  };

  const handleWebsiteClick = (e) => {
    e.stopPropagation(); // Prevent card click when clicking website button
    if (college.contact?.website) {
      window.open(college.contact.website, '_blank');
    }
  };

  const handleLocationClick = (e) => {
    e.stopPropagation(); // Prevent card click when clicking location button
    if (college.location?.googleMapsLink) {
      window.open(college.location.googleMapsLink, '_blank');
    }
  };

  // Handle both regular programs and suggested programs from different API endpoints
  const getProgramCount = () => {
    if (college.totalSuggestedPrograms) {
      return college.totalSuggestedPrograms; // From suggestions API
    }
    if (college.suggestedPrograms?.length) {
      return college.suggestedPrograms.length; // From suggestions API
    }
    if (college.programs?.length) {
      return college.programs.length; // From regular search API
    }
    return 0;
  };

  const programCount = getProgramCount();

  // For 10th grade students, highlight PUC programs
  const getRelevantPrograms = () => {
    const programs = college.suggestedPrograms || college.programs || [];
    if (user?.qualification === '10') {
      return programs.filter(p => 
        p.name.toLowerCase().includes('puc') || 
        p.name.toLowerCase().includes('pre-university') ||
        p.eligibility === '10th'
      );
    }
    return programs;
  };

  const relevantPrograms = getRelevantPrograms();

  return (
    <Card className="h-100 shadow-sm college-card" style={{ cursor: 'pointer' }} onClick={handleCardClick}>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="mb-2">{college.name}</Card.Title>
        <Card.Subtitle className="mb-3 text-muted">{college.address}</Card.Subtitle>
        
        {user?.qualification === '10' && relevantPrograms.length > 0 && (
          <div className="mb-2">
            <Badge bg="success" className="mb-2">
              ⭐ {relevantPrograms.length} PUC Program{relevantPrograms.length > 1 ? 's' : ''} Available
            </Badge>
          </div>
        )}
        
        <div className="mt-auto">
          <ListGroup variant="flush" className="mb-3">
            <ListGroup.Item>
              <strong>Contact:</strong> {college.contact?.phone} 
              {college.contact?.email && <span> | {college.contact.email}</span>}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Programs Offered:</strong> {programCount}
              {college.totalSuggestedPrograms && (
                <small className="text-success ms-2">(Suggested for you)</small>
              )}
              {user?.qualification === '10' && relevantPrograms.length > 0 && (
                <small className="text-success ms-2">
                  - {relevantPrograms.length} suitable for 10th students
                </small>
              )}
            </ListGroup.Item>
          </ListGroup>

          {college.facilities && college.facilities.length > 0 && (
            <div className="facilities-pills mb-3">
              <strong>Facilities:</strong>
              <div className="d-flex flex-wrap mt-2">
                {college.facilities.map((facility) => (
                  <Badge pill bg="info" text="dark" className="me-2 mb-2" key={facility}>
                    {facility}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="d-flex gap-2 mt-3">
            {college.location?.googleMapsLink && (
              <Button 
                variant="outline-primary" 
                size="sm"
                onClick={handleLocationClick}
                className="flex-fill"
              >
                📍 Location
              </Button>
            )}
            {college.contact?.website && (
              <Button 
                variant="outline-success" 
                size="sm"
                onClick={handleWebsiteClick}
                className="flex-fill"
              >
                🌐 Website
              </Button>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CollegeCard;
