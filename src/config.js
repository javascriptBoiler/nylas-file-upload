export default {
  TOKEN: process.env.REACT_APP_TOKEN
    ? process.env.REACT_APP_TOKEN
    : // eslint-disable-next-line
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJjZWUxM2VhMzE3Njg3NjFhMzU5YzVlOGYiLCJlbWFpbCI6ImFkbWluQHZpcnR1YWxjYXBpdGFsLmNvLm56IiwiaWF0IjoxNTg0NTY3MzcwLCJleHAiOjE2MTYxMDMzNzB9.1gho5B2jWsNGFBAtilaQdR15idgSpG79ayHaql8EF7g',
  API_URL: process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : '',
};
