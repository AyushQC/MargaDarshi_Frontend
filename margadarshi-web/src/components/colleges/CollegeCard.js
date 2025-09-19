import React from 'react';
import { Card, Badge, ListGroup } from 'react-bootstrap';
import './CollegeCard.css';

const CollegeCard = ({ college }) => {
  return (
    <Card className="h-100 shadow-sm college-card">
      <Card.Body className="d-flex flex-column">
        <Card.Title className="mb-2">{college.name}</Card.Title>
        <Card.Subtitle className="mb-3 text-muted">{college.address}</Card.Subtitle>
        
        <div className="mt-auto">
          <ListGroup variant="flush" className="mb-3">
            <ListGroup.Item>
              <strong>Contact:</strong> {college.contact.phone} | {college.contact.email}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Programs Offered:</strong> {college.programs.length}
            </ListGroup.Item>
          </ListGroup>

          <div className="facilities-pills">
            <strong>Facilities:</strong>
            <div className="d-flex flex-wrap mt-2">
              {college.facilities.map((facility) => (
                <Badge pill bg="info" text="dark" className="me-2 mb-2" key={facility}>
                  {facility}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CollegeCard;
