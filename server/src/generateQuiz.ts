import { getAllFilmsWithId, getAllPeople, AllPeople } from './swapi';
import { formatPersonWithFilms, turnPersonIntoQuestion } from './requestHelpers';
import { SwapiPerson, SwapiPersonWithURLFilms } from './types';

const makeRandomNum = (upperLimit : number) => Math.floor(Math.random() * upperLimit);

const generateQuiz = async (numQuestions = 10) => {
  console.log('\ngenerating quiz');

  try {
    // find all people, filter by id below
    const { totalPeople, people } : AllPeople = await getAllPeople();

    console.log('\n totalPeople: ', totalPeople);

    // grab all films
    const films = await getAllFilmsWithId();

    console.log('\n total films: ', films.length);

    // grab numQuestions people, random indices
    const startingIndices = Array.from({ length: numQuestions })
      .map(() => makeRandomNum(totalPeople));

    console.log('\nstartingIndices: ', startingIndices);

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

    console.log('\nfinalIndices: ', finalIndices);

    // format each person as a question
    const questions = people
      .filter((_person, i) => finalIndices.includes(i))
      .map((person : SwapiPersonWithURLFilms) => formatPersonWithFilms(person, films))
      .map((person : SwapiPerson) => turnPersonIntoQuestion(person, films));

    console.log('questions length: ', questions.length);

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
