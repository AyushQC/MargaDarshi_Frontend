import React from 'react';
import { Modal, Button, Badge, ListGroup, Row, Col, Tab, Tabs } from 'react-bootstrap';

const CollegeModal = ({ show, college, onClose }) => {
  if (!college) return null;

  // Get programs from either regular programs or suggested programs
  const getPrograms = () => {
    if (college.suggestedPrograms && college.suggestedPrograms.length > 0) {
      return college.suggestedPrograms; // From suggestions API
    }
    if (college.programs && college.programs.length > 0) {
      return college.programs; // From regular search API
    }
    return [];
  };

  const programs = getPrograms();
  const isFromSuggestions = college.suggestedPrograms && college.suggestedPrograms.length > 0;

  return (
    <Modal show={show} onHide={onClose} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>{college.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={8}>
            {/* College Information */}
            <div className="mb-4">
              <h5>📍 Location & Contact</h5>
              <p className="text-muted mb-2">{college.address}</p>
              <div className="mb-3">
                {college.contact?.phone && (
                  <span className="me-3">📞 {college.contact.phone}</span>
                )}
                {college.contact?.email && (
                  <span className="me-3">✉️ {college.contact.email}</span>
                )}
              </div>
              <div className="d-flex gap-2 mb-4">
                {college.location?.googleMapsLink && (
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    onClick={() => window.open(college.location.googleMapsLink, '_blank')}
                  >
                    🗺️ Open in Google Maps
                  </Button>
                )}
                {college.contact?.website && (
                  <Button 
                    variant="outline-success" 
                    size="sm"
                    onClick={() => window.open(college.contact.website, '_blank')}
                  >
                    🌐 Visit Website
                  </Button>
                )}
              </div>
            </div>

            {/* Programs and Facilities Tabs */}
            <Tabs defaultActiveKey="programs" className="mb-3">
              <Tab eventKey="programs" title={`📚 Programs ${isFromSuggestions ? '(Suggested)' : ''}`}>
                {programs.length > 0 ? (
                  <ListGroup variant="flush">
                    {programs.map((program, index) => (
                      <ListGroup.Item key={index}>
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h6 className="mb-1">
                              {program.name}
                              {isFromSuggestions && (
                                <Badge bg="success" className="ms-2">Suggested</Badge>
                              )}
                            </h6>
                            <small className="text-muted">
                              {program.eligibility && <span>📋 {program.eligibility}</span>}
                              {program.medium && <span className="ms-3">🗣️ {program.medium}</span>}
                              {program.cutoff && <span className="ms-3">🎯 Cutoff: {program.cutoff}%</span>}
                            </small>
                          </div>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <p className="text-muted">No program information available.</p>
                )}
              </Tab>
              <Tab eventKey="facilities" title="🏢 Facilities">
                {college.facilities && college.facilities.length > 0 ? (
                  <div className="d-flex flex-wrap gap-2">
                    {college.facilities.map((facility) => (
                      <Badge pill bg="info" text="dark" className="p-2" key={facility}>
                        {facility}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted">No facility information available.</p>
                )}
              </Tab>
            </Tabs>
          </Col>
          <Col md={4}>
            {/* Google Maps Embed */}
            <div className="mb-3">
              <h6>📍 Location Map</h6>
              {college.location?.mapEmbedUrl ? (
                <div style={{ height: '300px', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
                  <iframe
                    src={college.location.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map of ${college.name}`}
                  ></iframe>
                </div>
              ) : college.location?.googleMapsLink ? (
                <div 
                  className="d-flex align-items-center justify-content-center text-muted"
                  style={{ height: '300px', border: '1px solid #ddd', borderRadius: '8px' }}
                >
                  <div className="text-center">
                    <div className="mb-3">
                      <i className="fas fa-map-marker-alt fa-3x text-primary"></i>
                    </div>
                    <h6>{college.name}</h6>
                    <p className="text-muted small">{college.address}</p>
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={() => window.open(college.location.googleMapsLink, '_blank')}
                    >
                      📍 View on Google Maps
                    </Button>
                  </div>
                </div>
              ) : (
                <div 
                  className="d-flex align-items-center justify-content-center text-muted"
                  style={{ height: '300px', border: '1px solid #ddd', borderRadius: '8px' }}
                >
                  <div className="text-center">
                    <p>🗺️</p>
                    <p>Location information not available</p>
                  </div>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        {college.contact?.website && (
          <Button 
            variant="primary"
            onClick={() => window.open(college.contact.website, '_blank')}
          >
            Visit College Website
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CollegeModal;
