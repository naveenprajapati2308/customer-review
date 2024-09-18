
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Completion from './Completion'; 
import './Survey.css'; 

const Survey = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [sessionId, setSessionId] = useState(Date.now());
  const [isCompleted, setIsCompleted] = useState(false); 

  useEffect(() => {
    axios.get('http://localhost:5000/api/questions')
      .then(response => setQuestions(response.data))
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleAnswerChange = (id, answer) => {
    setAnswers({ ...answers, [id]: answer });
  };

  const handleSubmit = async () => {
    const surveyData = {
      sessionId,
      answers,
      status: 'COMPLETED',
    };

    try {
      const response = await axios.post('http://localhost:5000/api/survey', surveyData);
      alert(response.data.message);
      setIsCompleted(true); 
    } catch (error) {
      console.error('Error submitting survey:', error);
      alert('Failed to submit survey. Please try again.');
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setSessionId(Date.now());
    setIsCompleted(false); // Reset completion status
  };

  return (
    <div className="survey-container">
      {isCompleted ? (
        <Completion onRestart={handleRestart} />
      ) : (
        <>
          <h2>Customer Survey</h2>
          <div className="question-count">{`${currentQuestion + 1} / ${questions.length}`}</div>
          {questions.length > 0 && (
            <div className="question-section">
              <p className="question-text">{questions[currentQuestion].text}</p>
              <div className="answer-options">
                {questions[currentQuestion].type === 'rating' && (
                  <div className={`rating-options ${questions[currentQuestion].max > 5 ? 'wide' : ''}`}>
                    {[...Array(questions[currentQuestion].max)].map((_, index) => (
                      <button
                        key={index}
                        className={`rating-button ${answers[questions[currentQuestion].id] === index + 1 ? 'selected' : ''}`}
                        onClick={() => handleAnswerChange(questions[currentQuestion].id, index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                )}
                {questions[currentQuestion].type === 'text' && (
                  <input
                    type="text"
                    className="text-input"
                    value={answers[questions[currentQuestion].id] || ''}
                    onChange={(e) => handleAnswerChange(questions[currentQuestion].id, e.target.value)}
                  />
                )}
              </div>
            </div>
          )}
          <div className="navigation-buttons">
            <button className="nav-button prev" onClick={handlePrevious} disabled={currentQuestion === 0}>
              Prev
            </button>
            {currentQuestion === questions.length - 1 ? (
              <button className="nav-button next" onClick={handleSubmit}>Submit review</button>
            ) : (
              <button className="nav-button next" onClick={handleNext}>
                Next
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Survey;
