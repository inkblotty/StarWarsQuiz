import { getAllPeople, AllPeople, getAllFilmsWithUrl } from '../lib/swapi';
import { formatPersonWithFilms, turnPersonIntoQuestion } from '../lib/requestHelpers';
import { SwapiPerson, SwapiPersonWithURLFilms } from '../types';

const makeRandomNum = (upperLimit : number) => Math.floor(Math.random() * upperLimit);

const generateQuiz = async (numQuestions = 10) => {
  // console.log('\ngenerating quiz');

  try {
    // find all people, filter by id below
    const { totalPeople, people } : AllPeople = await getAllPeople();

    // console.log('\ntotalPeople: ', totalPeople);

    // grab all films
    const films = await getAllFilmsWithUrl();

    // console.log('\nall films: ', films);

    // grab numQuestions people, random indices
    const startingIndices = Array.from({ length: numQuestions })
      .map(() => makeRandomNum(totalPeople));

    // console.log('\nstartingIndices: ', startingIndices);

    const finalIndices = startingIndices.reduce((a, b) => {
      if (!a.includes(b)) {
        return [...a, b];
      }
      const newRandom = (() => {
        let temp = makeRandomNum(totalPeople);
        while (a.includes(temp)) {
          temp = makeRandomNum(totalPeople);
        }
        return temp;
      })();
      return [...a, newRandom];
    }, []);

    // console.log('\nfinalIndices (no duplicates): ', finalIndices);

    // format each person as a question
    const questions = people
      .filter((_person, i) => finalIndices.includes(i))
      .map((person : SwapiPersonWithURLFilms) => formatPersonWithFilms(person, films))
      .map((person : SwapiPerson) => turnPersonIntoQuestion(person, films));

    console.log('\nquestions length: ', questions.length);

    return {
      films,
      questions,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default generateQuiz;
