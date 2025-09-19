import React from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RecommendedCareers = () => {
    const [quizResults, setQuizResults] = React.useState([]);

    React.useEffect(() => {
        const savedResults = localStorage.getItem('quizResults');
        if (savedResults) {
            setQuizResults(JSON.parse(savedResults));
        }
    }, []);

    return (
        <Card className="mb-4 shadow-sm">
            <Card.Body>
                <Card.Title>Your Recommended Careers</Card.Title>
                {quizResults.length > 0 ? (
                    <ListGroup variant="flush">
                        {quizResults.map((career, index) => (
                            <ListGroup.Item key={index} action as={Link} to={`/career/${encodeURIComponent(career)}`}>
                                {career}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                ) : (
                    <>
                        <Card.Text>
                            Take the career quiz to get personalized recommendations!
                        </Card.Text>
                        <Link to="/career-quiz">
                            <Button variant="success">Take the Quiz</Button>
                        </Link>
                    </>
                )}
            </Card.Body>
        </Card>
    );
};

export default RecommendedCareers;
