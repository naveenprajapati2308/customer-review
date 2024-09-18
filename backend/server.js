// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Hardcoded questions for demo purposes
let surveyQuestions = [
  { id: 1, text: 'How satisfied are you with our products?', type: 'rating', max: 5 },
  { id: 2, text: 'How fair are the prices compared to similar retailers?', type: 'rating', max: 5 },
  { id: 3, text: 'How satisfied are you with the value for money of your purchase?', type: 'rating', max: 5 },
  { id: 4, text: 'On a scale of 1-10 how would you recommend us to your friends and family?', type: 'rating', max: 10 },
  { id: 5, text: 'What could we do to improve our service?', type: 'text' }
];

// API endpoint to get questions
app.get('/api/questions', (req, res) => {
  res.json(surveyQuestions);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
