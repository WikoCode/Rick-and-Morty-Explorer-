import axios from 'axios';
import type {
  ApiResponse,
  Character,
  CharacterFilters,
  Episode,
} from '../types';

// A single configured Axios instance reused across the app.
const api = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
  timeout: 10000,
});

/** Fetch a paginated, filtered list of characters. */
export const getCharacters = async (
  filters: CharacterFilters = {}
): Promise<ApiResponse<Character>> => {
  const { data } = await api.get<ApiResponse<Character>>('/character', {
    params: {
      page: filters.page ?? 1,
      name: filters.name || undefined,
      status: filters.status || undefined,
      gender: filters.gender || undefined,
    },
  });
  return data;
};

/** Fetch a single character by id. */
export const getCharacter = async (id: number | string): Promise<Character> => {
  const { data } = await api.get<Character>(`/character/${id}`);
  return data;
};

/** Fetch a paginated list of episodes. */
export const getEpisodes = async (
  page = 1
): Promise<ApiResponse<Episode>> => {
  const { data } = await api.get<ApiResponse<Episode>>('/episode', {
    params: { page },
  });
  return data;
};

/** Extract the trailing numeric id from a full resource URL. */
const idsFromUrls = (urls: string[], limit: number): string[] =>
  urls
    .slice(0, limit)
    .map((url) => url.split('/').pop())
    .filter((id): id is string => Boolean(id));

/**
 * Fetch multiple characters at once from a list of full URLs
 * (used to resolve the cast of an episode). Returns at most `limit` items.
 */
export const getCharactersByUrls = async (
  urls: string[],
  limit = 6
): Promise<Character[]> => {
  const ids = idsFromUrls(urls, limit);
  if (ids.length === 0) return [];

  const { data } = await api.get<Character | Character[]>(
    `/character/${ids.join(',')}`
  );
  // The API returns a single object when only one id is requested.
  return Array.isArray(data) ? data : [data];
};

/**
 * Fetch multiple episodes at once from a list of full URLs
 * (used to resolve the episodes a character appears in).
 */
export const getEpisodesByUrls = async (
  urls: string[],
  limit = 8
): Promise<Episode[]> => {
  const ids = idsFromUrls(urls, limit);
  if (ids.length === 0) return [];

  const { data } = await api.get<Episode | Episode[]>(
    `/episode/${ids.join(',')}`
  );
  return Array.isArray(data) ? data : [data];
};

export default api;
