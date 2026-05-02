export const BASE_URL = 'http://localhost:8000';
export const RATING_OPTIONS: number[] = [1, 2, 3, 4, 5];
export const RATING_FIELDS = [
  { name: 'ratingFood', label: 'Food' },
  { name: 'ratingService', label: 'Service' },
  { name: 'ratingInterior', label: 'Interior' },
] as const;