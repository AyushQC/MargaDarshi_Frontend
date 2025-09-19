import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Spinner, Alert, ProgressBar, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getQuiz, submitQuiz } from '../../services/api';
import './Quiz.css';

const QuizPage = () => {
  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await getQuiz();
        setQuiz(response.data.quiz);
      } catch (err) {
        setError('Failed to load the quiz. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, []);

  const handleOptionSelect = (option) => {
    setAnswers({ ...answers, [currentQuestionIndex]: option });
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    try {
      const answerValues = Object.values(answers);
      const response = await submitQuiz(answerValues);
      const careerTitles = response.data.career_titles;
      setResults(careerTitles);
      // Save results to localStorage to be used on the dashboard
      localStorage.setItem('quizResults', JSON.stringify(careerTitles));
    } catch (err) {
      setError('Failed to submit your answers. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading Quiz...</p>
      </Container>
    );
  }

  if (error) {
    return <Container className="py-5"><Alert variant="danger">{error}</Alert></Container>;
  }

  if (results) {
    return (
      <Container className="py-5 quiz-container">
        <Card className="p-4 shadow-sm">
          <Card.Body>
            <Card.Title as="h2" className="text-center mb-4">Your Recommended Career Paths</Card.Title>
            <p className="text-center text-muted mb-4">Based on your answers, here are a few careers that might be a great fit for you. Click on any of them to see a visual roadmap.</p>
            <ListGroup variant="flush">
              {results.map((career, index) => (
                <ListGroup.Item key={index} action as={Link} to={`/career/${encodeURIComponent(career)}`} className="text-center">
                  {career}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  const currentQuestion = quiz[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.length) * 100;

  return (
    <Container className="py-5 quiz-container">
      <Card className="p-4 shadow-sm">
        <Card.Body>
          <ProgressBar now={progress} label={`${Math.round(progress)}%`} className="mb-4" />
          <Card.Title as="h3" className="mb-4">{currentQuestion.question}</Card.Title>
          <ListGroup>
            {currentQuestion.options.map((option, index) => (
              <ListGroup.Item
                key={index}
                action
                onClick={() => handleOptionSelect(option)}
                active={answers[currentQuestionIndex] === option}
                className="mb-2"
              >
                {option}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <div className="d-flex justify-content-end mt-4">
            {currentQuestionIndex < quiz.length - 1 ? (
              <Button onClick={handleNext} disabled={!answers[currentQuestionIndex]}>
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={!answers[currentQuestionIndex] || submitting}>
                {submitting ? <Spinner as="span" animation="border" size="sm" /> : 'Submit & See Results'}
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default QuizPage;
