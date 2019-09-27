export interface SwapiFilm {
  title: string;
  id: number;
}

interface OriginSwapiPerson {
  name: string; 
  height: string;
  mass: string; 
  'hair_color': string;
  'skin_color': string;
  'eye_color': string;
  'birth_year': string;
  gender: 'male' | 'female' | 'string';
  homeworld: string,
  species: string[];
  vehicles?: string[];
  starships?: string[];
  created: string;
  edited: string;
  url: string;
}

export interface SwapiPersonWithURLFilms extends OriginSwapiPerson {
  films: string[];
}

export interface SwapiPerson extends OriginSwapiPerson {
  films: SwapiFilm[];
}

export interface SwapiPeopleResponse {
  count: number;
  next?: string;
  results: SwapiPersonWithURLFilms[];
}
