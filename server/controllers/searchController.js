const TheMovieDB = require('../api/TheMovieDB');
const { validationResult } = require('express-validator');

// Turns movie search results into JSON format
const createMovieSearchResultJson = (resultArray) => {
    if (resultArray.length === undefined) {
        throw new Error("An array was not passed");
    }

    if (resultArray.length <= 0) {
        throw new Error("The array is empty");
    }
    // Create an empty JSON object
    const resultsJson = new Object();
    resultsJson.data = [];

    // Store all movie data into the JSON for each movie result
    for (var i = 0; i < resultArray.length; i++) {
        if ( !resultArray[i].hasOwnProperty('original_title') 
            || !resultArray[i].hasOwnProperty('overview') 
            || !resultArray[i].hasOwnProperty('release_date') 
            || !resultArray[i].hasOwnProperty('backdrop_path')
            || !resultArray[i].hasOwnProperty('poster_path')
            || !resultArray[i].hasOwnProperty('vote_average')
            || !resultArray[i].hasOwnProperty('vote_count')) {
                throw new Error("The result is missing nesscessary properties");
            }
        resultsJson.data.push({
            'title': resultArray[i].original_title,
            'description': resultArray[i].overview,
            'releaseDate': resultArray[i].release_date,
            'background': resultArray[i].backdrop_path,
            'poster': resultArray[i].poster_path,
            'voteAverage': resultArray[i].vote_average,
            'voteCount': resultArray[i].vote_count
        });
    }

    return resultsJson;
};

exports.postSearchMovie = async (req, res, next) => {
    // Check for errors in the express-validators
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });

    } else {
        try {
            // Call the MovieDB API to perform a movie search
            const { data } = await TheMovieDB.searchMovie(req.body['query']);

            // Get the results from the response
            const resultArray = data.results;

            // Creates JSON from the results
            const resultsJson = createMovieSearchResultJson(resultArray);

            // Return the JSON
            return res.status(200).json(resultsJson);

        } catch(error) {
            // Return 500 if there was an error in calling the API
            console.log(error);
            return res.status(500).json({msg: 'Error in postSearchMovie API'});
        }
    }
};

exports.createMovieSearchResultJson = createMovieSearchResultJson;