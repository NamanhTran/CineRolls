const axios = require('axios');
const config = require('config');

// Instance for TheMovieDB includes the AuthKey in the headers
const TheMovieDBInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        Authorization: config.get('TheMovieDbAuthKey')
    }
});

// Searches movies in the TheMovieDB API given the query 
exports.searchMovie = async (query) => {
    if (query === '' || typeof query !== 'string') {
        throw new Error('Invalid string provided');
    }

    const response = await TheMovieDBInstance('/search/movie', {
        params: {
            language: 'en-US',
            query: query,
            include_adult: 'false'
        }
    });

    return response;
}