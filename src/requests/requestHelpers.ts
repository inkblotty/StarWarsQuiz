export const formatPersonWithFilms = (person, films) => {
  return {
    ...person,
    films: person.films.map(film => films.find(x => (x.index).toString() === film.replace(/\D/g, ''))),
  };
}