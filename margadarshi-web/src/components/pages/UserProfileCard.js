import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserProfileCard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser && loggedInUser !== 'undefined') {
            try {
                setUser(JSON.parse(loggedInUser));
            } catch (error) {
                console.error("Failed to parse user data from localStorage", error);
            }
        }
    }, []);

    if (!user) {
        return null;
    }

    return (
        <Card className="shadow-sm">
            <Card.Body>
                <Card.Title>Your Profile</Card.Title>
                <Card.Text as="div">
                    <strong>Name:</strong> {user.name}<br />
                    <strong>Email:</strong> {user.email}<br />
                    <strong>District:</strong> {user.district}<br />
                    <strong>Qualification:</strong> {user.qualification === '10' ? '10th Pass' : '12th Pass'}<br />
                </Card.Text>
                <Link to="/profile">
                    <Button variant="outline-primary" className="mt-3">Edit Profile</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default UserProfileCard;
