import { SwapiFilm, SwapiPerson } from "./swapi";

export const formatPersonWithFilms = (person : SwapiPerson, films : SwapiFilm[]) => {
  return {
    ...person,
    films: person.films.map(film => films.find(x => (x.index).toString() === film.replace(/\D/g, ''))),
  };
}