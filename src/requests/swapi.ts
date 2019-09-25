import axios from 'axios';

const API_BASE = 'https://swapi.co/api';

export const getTotalPeople = async () : Promise<number> => {
  try {
    const people : { count: number } = await axios.get(`${API_BASE}/people`);
    return people.count;
  } catch (err) {
    throw err;
  }
}

export interface SwapiFilm {
  title: string;
  index: number;
}
export const getAllFilmsWithId = async () : Promise<SwapiFilm[]> => {
  try {
    const films : { results: SwapiFilm[] } = await axios.get(`${API_BASE}/films`);
    return films.results.map((film, index) => ({ title: film.title, index }));
  } catch (err) {
    throw err;
  }
}

export interface SwapiPerson {
  name: string; 
  height: string;
  mass: string; 
  'hair_color': string;
  'skin_color': string;
  'eye_color': string;
  'birth_year': string;
  gender: 'male' | 'female' | 'string';
  homeworld: string, 
  films: string[];
  species: string[];
  vehicles?: string[];
  starships?: string[];
  created: string;
  edited: string;
  url: string;
}
export const getPerson = async (id: number) : Promise<SwapiPerson> => {
  if (!id) {
    throw new Error('Must provide ID to get person.');
  }
  try {
    const person : SwapiPerson = await axios.get(`${API_BASE}/people/${id}`);
    return person;
  } catch (err) {
    throw err;
  }
}