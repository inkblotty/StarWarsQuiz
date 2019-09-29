import express from 'express';
import generateQuiz from './routes/generateQuiz';
import { APIStructure } from './types';
const app = express()
const port = 8080;

// allow cors for toy app
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/newQuiz', async (req, res) => {
  try {
    const quiz = await generateQuiz();
    res.json(quiz);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});
app.get('*', (_req, res) => res.json(JSON.parse(JSON.stringify(APIStructure))));

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
