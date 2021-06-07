const chai = require('chai');
const { searchMovie } = require('../../api/TheMovieDB');
const { createMovieSearchResultJson } = require('../../controllers/searchController');

const assert = chai.assert;

const searchTests = () => {
    describe('Movie Search Endpoint:', () => {
        describe('Query TheMovieDB API with a valid string', () => {
            it('Should have a data property', async () => {
                assert.property(await searchMovie('Spiderman'), 'data');
            });
        });

        describe('Should raise an error', () => {
            it('Query TheMovieDB API with an empty string', async () => {
                try {
                    await searchMovie('');
                } catch (error) {
                    assert.strictEqual(error.message, 'Invalid string provided');
                }
            });

            it('Query TheMovieDB API with type that is not a string', async () => {
                try {
                    await searchMovie(25);
                } catch (error) {
                    assert.strictEqual(error.message, 'Invalid string provided');
                }
            });
        });
    });

    describe('Movie Search Data Processing:', () => {
        describe('Passing a correct result array ensure that all properties exists after processing', async () => {
            it('Should have title, description, releaseDate, background, poster, voteAverage, and voteCount properties', async () => {
                let { data } = await searchMovie('Spiderman');

                let resultArray = data.results;

                let resultJson = createMovieSearchResultJson(resultArray);

                for (let i = 0; i < resultJson.length; i++) {
                    assert.propertyVal(resultJson[i], 'title', resultArray[i].original_title);
                    assert.propertyVal(resultJson[i], 'description', resultArray[i].overview);
                    assert.propertyVal(resultJson[i], 'releaseDate', resultArray[i].release_date);
                    assert.propertyVal(resultJson[i], 'background', resultArray[i].backdrop_path);
                    assert.propertyVal(resultJson[i], 'poster', resultArray[i].poster_path);
                    assert.propertyVal(resultJson[i], 'voteAverage', resultArray[i].vote_average);
                    assert.propertyVal(resultJson[i], 'voteCount', resultArray[i].vote_count);
                }
            });
        });

        describe('Should raise an error', () => {
            it('Passing an array with incorrect properties', () => {
                let testArray = [{'test': 'testing'}];
                assert.throws(() => {createMovieSearchResultJson(testArray); }, Error, "The result is missing nesscessary properties");
            });
    
            it('Passing an empty array', () => {
                assert.throws(() => { createMovieSearchResultJson([]); }, Error, "The array is empty");
            });
    
            it('Passing a incorrect type (not an array)', () => {
                assert.throws(() => { createMovieSearchResultJson(100); }, Error, "An array was not passed");
                assert.throws(() => { createMovieSearchResultJson({'test': 10}); }, Error, "An array was not passed");
            });
        });
    });

}

exports.searchUnitTests = searchTests;