type Constants = {
  HASHING_TIMES: number;
  CHANGING_DATE: number;
  RANDOM_REVIEWS: number;
  COOKIE_ACCESS_TOKEN_MAX_AGE: number;
  COOKIE_REFRESH_TOKEN_MAX_AGE: number;
  JWT_ACCESS_TOKEN_EXPIRES: string;
  JWT_REFRESH_TOKEN_EXPIRES: string;
};
const CONSTANTS: Constants = {
  HASHING_TIMES: 10,
  CHANGING_DATE: 7,
  RANDOM_REVIEWS: 4,
  COOKIE_ACCESS_TOKEN_MAX_AGE: 60 * 60 * 1000,
  COOKIE_REFRESH_TOKEN_MAX_AGE: 14 * 24 * 60 * 60 * 1000,
  JWT_ACCESS_TOKEN_EXPIRES: '1h',
  JWT_REFRESH_TOKEN_EXPIRES: '14 days',
};

export { CONSTANTS };
