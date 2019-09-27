import axios from 'axios';
import { SwapiFilm, SwapiPersonWithURLFilms, SwapiPeopleResponse } from './types';

const API_BASE = 'https://swapi.co/api';

export interface AllPeople {
  totalPeople: number;
  people: SwapiPersonWithURLFilms[];
}
export const getAllPeople = async () : Promise<AllPeople> => {
  try {
    const people : SwapiPersonWithURLFilms[] = [];
    let next;
    const { data } : { data: SwapiPeopleResponse } = await axios.get(`${API_BASE}/people`);
    next = data.next;
    people.push.apply(people, data.results);
    while (next) {
      const { data: moreData } : { data: SwapiPeopleResponse } = await axios.get(next);
      next = moreData.next;
      people.push.apply(people, moreData.results);
    }
    return {
      totalPeople: data.count,
      people,
    };
  } catch (err) {
    throw err;
  }
}

export const getAllFilmsWithId = async () : Promise<SwapiFilm[]> => {
  try {
    const { data: films } : { data: { results: SwapiFilm[] } } = await axios.get(`${API_BASE}/films`);
    console.log(`total films: ${films.results.length}`);
    return films.results.map((film, index) => ({ title: film.title, id: index + 1 }));
  } catch (err) {
    throw err;
  }
}
