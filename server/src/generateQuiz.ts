import { getAllFilmsWithId, getTotalPeople, getPerson } from './swapi';
import { formatPersonWithFilms, turnPersonIntoQuestion } from './requestHelpers';
import { SwapiPerson } from './types';

const makeRandomNum = (upperLimit : number) => Math.ceil(Math.random() * upperLimit);

const generateQuiz = async (numQuestions = 10) => {
  try {
    // find total number of people, so random below has limits
    const totalPeople = await getTotalPeople();

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

    const people : any = await Promise.all(
      finalIndices.map(async (i : number) : Promise<SwapiPerson> => {
        // let's space out our request so swapi knows we're nice
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(
              getPerson(i)
                .then(person => formatPersonWithFilms(person, films))
            );
          }, 1);
        });
      }));

    // format each person as a question
    const questions = people.map((person : any) => turnPersonIntoQuestion(person, films));

    console.log(questions);

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
