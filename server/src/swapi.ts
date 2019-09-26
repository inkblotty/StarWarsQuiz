import axios from 'axios';
import { SwapiFilm, SwapiPersonWithURLFilms } from './types';

const API_BASE = 'https://swapi.co/api';

export const getTotalPeople = async () : Promise<number> => {
  try {
    const { data: people } : { data: { count: number } } = await axios.get(`${API_BASE}/people`);
    console.log(`total people: ${people.count}`)
    return people.count;
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

export const getPerson = async (id: number) : Promise<SwapiPersonWithURLFilms> => {
  if (!id) {
    throw new Error('Must provide ID to get person.');
  }
  try {
    const { data: person } : { data: SwapiPersonWithURLFilms } = await axios.get(`${API_BASE}/people/${id}`);
    console.log(`grabbed person: ${person.name}`);
    return person;
  } catch (err) {
    throw err;
  }
}