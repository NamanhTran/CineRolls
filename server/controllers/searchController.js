const TheMovieDB = require('../api/TheMovieDB');

exports.getSearchMovie = (req, res, next) => {
    return "hello";
};

exports.postSearchMovie = async (req, res, next) => {
    if (req.body['query'] === undefined) {
        return res.status(400).send('No "query" parameter provided.');
    }

    console.log(req.body);

    try {
        const response = await TheMovieDB('/search/movie', {
            params: {
                language: 'en-US',
                query: req.body['query'],
                include_adult: 'false'
            }
        });

        const resultArray = response.data.results;

        const searchJSON = new Object();
        searchJSON.data = [];

        for (var i = 0; i < resultArray.length; i++) {
            searchJSON.data.push({
                'title': resultArray[i].original_title,
                'description': resultArray[i].overview,
                'releaseDate': resultArray[i].release_date,
                'background': resultArray[i].backdrop_path,
                'poster': resultArray[i].poster_path,
                'voteAverage': resultArray[i].vote_average,
                'voteCount': resultArray[i].vote_count
            });
        }

        return res.json(searchJSON);

    } catch(error) {
        console.log(error);
        return res.status(500).send('Error in postSearchMovie API');
    }
};