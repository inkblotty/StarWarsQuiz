import express from 'express';
import generateQuiz from './generateQuiz';
const app = express()
const port = 8080;

const apiStructure = {
  apiRoutes: {
    '/newQuiz': 'returns type { films: Film[]; questions: { [questionName: string]: QuizQuestion } }',
  },
  responseTypes: {
    Film: {
      id: 'number',
      title: 'string',
    },
    QuizQuestion: {
      correctAnswer: 'string',
      label: 'string',
      name: 'string',
      options: 'Array of { label: string, value: string }',
    }
  }
};

// allow cors for toy app
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/newQuiz', async (req, res) => {
  try {
    const quiz = await generateQuiz();
    console.log('end quiz: ', quiz.films, quiz.questions.length);
    res.json(quiz);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});
app.get('*', (_req, res) => res.json(JSON.parse(JSON.stringify(apiStructure))));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});