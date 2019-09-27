import { getAllFilmsWithId, getAllPeople, AllPeople } from './swapi';
import { formatPersonWithFilms, turnPersonIntoQuestion } from './requestHelpers';
import { SwapiPerson, SwapiPersonWithURLFilms } from './types';

const makeRandomNum = (upperLimit : number) => Math.floor(Math.random() * upperLimit);

const generateQuiz = async (numQuestions = 10) => {
  try {
    // find all people, filter by id below
    const { totalPeople, people } : AllPeople = await getAllPeople();

    // grab all films
    const films = await getAllFilmsWithId();

    // grab numQuestions people, random indices
    const startingIndices = Array.from({ length: numQuestions })
      .map(() => makeRandomNum(totalPeople));
    while (startingIndices.length !== new Set(startingIndices).size) {
      startingIndices.push(makeRandomNum(totalPeople))
    }

    const finalIndices = startingIndices.reduce((a, b) => {
      if (!a.includes(b)) {
        return [...a, b];
      }
      return a;
    }, []);

    // format each person as a question
    const questions = people
      .filter((_person, i) => finalIndices.includes(i))
      .map((person : SwapiPersonWithURLFilms) => formatPersonWithFilms(person, films))
      .map((person : SwapiPerson) => turnPersonIntoQuestion(person, films));

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
