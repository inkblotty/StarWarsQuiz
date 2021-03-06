import axios from 'axios';
import { SwapiFilm, SwapiPersonWithURLFilms, SwapiPeopleResponse } from '../types';

const API_BASE = 'https://swapi.co/api';

// optimization: save people & films to a db and
// only re-query when total people doens't match result in db
// or possibly when films list has changed,
// as that would change the data relevant to our quiz.

export interface AllPeople {
  totalPeople: number;
  people: SwapiPersonWithURLFilms[];
}
// hot reloading on client shouldn't make swapi sad
let allPeople : AllPeople = null;
export const getAllPeople = async () : Promise<AllPeople> => {
  try {
    const people : SwapiPersonWithURLFilms[] = [];
    const { data } : { data: SwapiPeopleResponse } = await axios.get(`${API_BASE}/people`);
    const totalPages = Math.ceil(data.count / data.results.length);

    if (allPeople && allPeople.totalPeople === data.count) { // replace with db query here
      return allPeople;
    }

    people.push.apply(people, data.results);
    const promArray = Array.from({ length: totalPages }).map(async (_, i) => {
      const { data: newData } : { data: SwapiPeopleResponse } = await axios.get(`${API_BASE}/people/?page=${i+1}`);
      people.push.apply(people, newData.results);
      return true;
    });
    return Promise.all(promArray).then(() => {
      const all = {
        totalPeople: data.count,
        people,
      };
      allPeople = all;
      return all;
    });
  } catch (err) {
    throw err;
  }
}

export const getAllFilmsWithUrl = async () : Promise<SwapiFilm[]> => {
  try {
    const { data: films } : { data: { results: SwapiFilm[] } } = await axios.get(`${API_BASE}/films`);
    return films.results.map(film => ({ title: film.title, url: film.url }));
  } catch (err) {
    throw err;
  }
}
