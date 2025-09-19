import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import After10th from './After10th';
import After12th from './After12th';
import { Spinner } from 'react-bootstrap';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser && loggedInUser !== 'undefined') {
            try {
                const parsedUser = JSON.parse(loggedInUser);
                setUser(parsedUser);
            } catch (error) {
                console.error("Failed to parse user data from localStorage", error);
                localStorage.clear();
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
        setLoading(false);
    }, [navigate]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner animation="border" />
            </div>
        );
    }

    if (!user) {
        return null; // Or a fallback message, but useEffect should redirect
    }

    // Conditionally render the component based on the user's qualification
    if (user.qualification === '10') {
        return <After10th />;
    } else if (user.qualification === '12') {
        return <After12th />;
    } else {
        // Fallback for users who might not have a qualification set
        return (
            <div className="container py-5 text-center">
                <h2>Welcome, {user.name}</h2>
                <p>Your profile is incomplete. Please update your qualification to see your personalized dashboard.</p>
            </div>
        );
    }
};

export default Dashboard;