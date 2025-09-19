import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

const CollegeSearch = ({ onSearch, initialDistrict = '' }) => {
  const [district, setDistrict] = useState(initialDistrict);
  const [program, setProgram] = useState('');

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

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ district, program });
  };

  return (
    <Form onSubmit={handleSearch} className="mb-5 p-4 bg-light rounded shadow-sm">
      <Row className="align-items-end">
        <Col md={5}>
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
        <Col md={5}>
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
      </Row>
    </Form>
  );
};

export default CollegeSearch;
