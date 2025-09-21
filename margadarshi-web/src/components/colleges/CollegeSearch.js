import React, { useState } from 'react';
import { Form, Row, Col, Button, Alert } from 'react-bootstrap';

const CollegeSearch = ({ onSearch, onSuggest, initialDistrict = '', user = null }) => {
  const [district, setDistrict] = useState(initialDistrict);
  const [program, setProgram] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [showSpecialization, setShowSpecialization] = useState(false);

  const districts = ['Kalaburagi', 'Koppal'];
  const programs = [
    // General & PUC
    'PUC Science',
    'PUC Commerce',
    'PUC Arts',
    'ITI',
    'Diploma',
    // Degrees
    'B.A.',
    'B.Com',
    'B.Sc',
    'BSc (Hons) Agriculture',
    'BSc Nursing',
    'BBA',
    'BMS',
    'BCA',
    'B.Tech',
    'BVSc',
    'MBBS',
    'BDS',
    // Engineering
    'Computer Science & Engineering',
    'Civil Engineering',
    'Mechanical Engineering',
    'Electrical & Electronics Engineering',
    'Electronics & Communication Engineering',
    // Specific Diplomas
    'Diploma in Civil Engineering',
    'Diploma in Mechanical Engineering',
    'Diploma in Electrical Engineering',
    'Diploma in Medical Laboratory Technology (DMLT)',
    'Diploma in Medical Imaging Technology (DMIT)',
    'Diploma in Health Inspector (DHI)',
  ];

  const specializationOptions = [
    { value: 'engineering', label: 'Engineering & Technology' },
    { value: 'medical', label: 'Medical & Healthcare' },
    { value: 'commerce', label: 'Commerce & Business' },
    { value: 'arts', label: 'Arts & Humanities' },
    { value: 'science', label: 'Pure Sciences' },
    { value: 'computer', label: 'Computer & IT' },
    { value: 'management', label: 'Management & MBA' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ district, program });
  };

  const handleSuggestClick = () => {
    if (user && user.qualification === '12' && !showSpecialization) {
      setShowSpecialization(true);
    } else {
      const params = {
        qualification: user?.qualification === '10' ? '10th' : '12th',
      };
      
      if (user?.qualification === '12' && specialization) {
        params.specialization = specialization;
      }
      
      onSuggest(params);
      setShowSpecialization(false);
    }
  };

  const canShowSuggestions = user && (user.qualification === '10' || user.qualification === '12');

  return (
    <div className="mb-5">
      <Form onSubmit={handleSearch} className="p-4 bg-light rounded shadow-sm">
        <Row className="align-items-end">
          <Col md={4}>
            <Form.Group controlId="districtSelect">
              <Form.Label>District</Form.Label>
              <Form.Select value={district} onChange={(e) => setDistrict(e.target.value)}>
                <option value="">All Districts</option>
                {districts.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="programSelect">
              <Form.Label>Program/Course</Form.Label>
              <Form.Select value={program} onChange={(e) => setProgram(e.target.value)}>
                  <option value="">All Programs</option>
                  {programs.map((p) => (
                      <option key={p} value={p}>{p}</option>
                  ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={2} className="d-grid">
            <Button variant="primary" type="submit">
              Search
            </Button>
          </Col>
          <Col md={2} className="d-grid">
            {canShowSuggestions && onSuggest && (
              <Button 
                variant="success" 
                type="button"
                onClick={handleSuggestClick}
              >
                💡 Suggestions
              </Button>
            )}
          </Col>
        </Row>
      </Form>

      {/* Specialization Selection Modal */}
      {showSpecialization && (
        <div className="mt-3 p-3 bg-info bg-opacity-10 rounded">
          <h6>Select your area of interest for personalized suggestions:</h6>
          <Row className="mt-2">
            <Col md={8}>
              <Form.Select 
                value={specialization} 
                onChange={(e) => setSpecialization(e.target.value)}
              >
                <option value="">Choose your interest area...</option>
                {specializationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md={2}>
              <Button 
                variant="success" 
                disabled={!specialization}
                onClick={handleSuggestClick}
              >
                Get Suggestions
              </Button>
            </Col>
            <Col md={2}>
              <Button 
                variant="outline-secondary"
                onClick={() => {
                  setShowSpecialization(false);
                  setSpecialization('');
                }}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </div>
      )}

      {!canShowSuggestions && (
        <Alert variant="info" className="mt-3">
          <small>💡 Login and complete your profile to get personalized college suggestions!</small>
        </Alert>
      )}
    </div>
  );
};

export default CollegeSearch;
