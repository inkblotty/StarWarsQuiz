import { SwapiFilm, SwapiPerson, SwapiPersonWithURLFilms } from './types';

export const formatPersonWithFilms = (person : any, films : SwapiFilm[]) : SwapiPerson => {
  if (person.films) {
    const newFilms = person.films.map((film : string) =>
      films.find(x => {
        if (typeof film === 'string') {
          return (x.id).toString() === film.replace(/\D/g, '')
        }
        return false;
      })
    );
    return {
      ...person,
      films: newFilms,
    };
  }
  return person;
}

export const turnPersonIntoQuestion = (person : SwapiPerson, films: SwapiFilm[]) => {
  const negativeFilms = films.filter(film => !person.films.find(x => x.title === film.title));
  const options = [];
  let correctAnswer;
  const label = (() => {
    if (!negativeFilms.length) {
      person.films.slice(0, 3).forEach(film => options.push({ label: film.title, value: `film-${film.id }` }));
      options.push({ label: 'All of the above', value: 'all' });
      correctAnswer = 'all';
      return `Which film did ${person.name} appear in?`;
    }
    if (negativeFilms.length < 2) {
      options.push({ label: negativeFilms[0].title, value: `film-${negativeFilms[0].id }` });
      options.push({ label: person.films[0].title, value: `film-${person.films[0].id }` });
      options.push({ label: person.films[1].title, value: `film-${person.films[1].id }` });
      correctAnswer = `film-${negativeFilms[0].id}`;
      return `Which film did ${person.name} NOT appear in?`;
    }
    options.push({ label: person.films[0].title, value: `film-${person.films[0].id }` });
    negativeFilms.slice(0, 3).forEach(film => options.push({ label: film.title, value: `film-${film.id }` }));
    correctAnswer = `film-${person.films[0].id}`;
    return `Which of these films did ${person.name} appear in?`;
  })();
  return {
    correctAnswer,
    label,
    name: `${person.name}-question`,
    options,
  }
}