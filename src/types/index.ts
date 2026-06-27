// Shared domain types for the Rick & Morty API
// Docs: https://rickandmortyapi.com/documentation

export interface ApiInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface ApiResponse<T> {
  info: ApiInfo;
  results: T[];
}

export type CharacterStatus = 'Alive' | 'Dead' | 'unknown';
export type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown';

export interface ResourceRef {
  name: string;
  url: string;
}

export interface Character {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: ResourceRef;
  location: ResourceRef;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string; // e.g. "S01E01"
  characters: string[];
  url: string;
  created: string;
}

// Query params accepted by the /character endpoint
export interface CharacterFilters {
  page?: number;
  name?: string;
  status?: '' | CharacterStatus;
  gender?: '' | CharacterGender;
}
