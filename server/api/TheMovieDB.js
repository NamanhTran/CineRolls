const axios = require('axios');
const config = require('config');

module.exports = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        Authorization: config.get('TheMovieDbAuthKey')
    }
});