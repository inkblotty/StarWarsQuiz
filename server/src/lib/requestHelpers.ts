import { SwapiFilm, SwapiPerson, SwapiPersonWithURLFilms } from '../types';

function filmIdFromUrl(url : string) {
  return url.replace(/\D/g, '');
}
function shuffleArray(array : any[]) {
  let temp = [...array];
  for (let i = temp.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [temp[i], temp[j]] = [temp[j], temp[i]];
  }
  return temp;
}
export const formatPersonWithFilms = (person : SwapiPersonWithURLFilms, films : SwapiFilm[]) : SwapiPerson => {
  if (person.films) {
    const newFilms = person.films.map((film : string) =>
      films.find(x => {
        if (typeof film === 'string') {
          return (x.url).toString() === film
        }
        return false;
      })
    );
    return {
      ...person,
      films: newFilms,
    };
  } else {
    return {
      ...person,
      films: [],
    };
  }
}

export const turnPersonIntoQuestion = (person : SwapiPerson, films: SwapiFilm[]) => {
  const negativeFilms = films.filter(film => !person.films.find(x => x.title === film.title));
  const options = [];
  let correctAnswer;
  const label = (() => {
    if (!negativeFilms.length) {
      person.films.slice(0, 3).forEach(film => options.push({ label: film.title, value: `film-${filmIdFromUrl(film.url)}` }));
      options.push({ label: 'All of the above', value: 'all' });
      correctAnswer = 'all';
      return `Which film did ${person.name} appear in?`;
    }
    if (negativeFilms.length < 2) {
      options.push({ label: negativeFilms[0].title, value: `film-${filmIdFromUrl(negativeFilms[0].url)}` });
      options.push({ label: person.films[0].title, value: `film-${filmIdFromUrl(person.films[0].url)}` });
      options.push({ label: person.films[1].title, value: `film-${filmIdFromUrl(person.films[1].url)}` });
      correctAnswer = `film-${filmIdFromUrl(negativeFilms[0].url)}`;
      return `Which film did ${person.name} NOT appear in?`;
    }
    options.push({ label: person.films[0].title, value: `film-${filmIdFromUrl(person.films[0].url)}` });
    negativeFilms.slice(0, 3).forEach(film => options.push({ label: film.title, value: `film-${filmIdFromUrl(film.url)}` }));
    correctAnswer = `film-${filmIdFromUrl(person.films[0].url)}`;
    return `Which of these films did ${person.name} appear in?`;
  })();

  // randomize options in return
  return {
    correctAnswer,
    label,
    name: `${person.name}-question`,
    options: shuffleArray(options),
  }
}