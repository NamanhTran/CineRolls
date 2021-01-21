import './Search.css';

import React, { useEffect, useState } from 'react';
import { TextField, Grid, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import axios from 'axios';

const Search = () => {
    const [text, setText] = useState('');
    const [dbText, setDbText] = useState(text);
    const [movieData, setMovieData] = useState(null);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDbText(text);
        }, 1000);

        return () => {
            clearTimeout(timeoutId);
        }
    }, [text]);

    useEffect(() => {
        const search = async () => {
            const { data } = await axios.post('http://localhost:3100/search', {"query": dbText});

            setMovieData(data.data);

            const options_titles = [];
            for (var i = 0; i < data.data.length; i++) {
                options_titles.push(data.data[i].title);
            }

            setOptions(options_titles);
        };
        
        if (dbText) {
            search();
        }

    }, [dbText]);

    const onChange = (event) => {
        setText(event.target.value);
    }

    const getImageLink = (title) => {
        for (var i = 0; i < movieData.length; i++) {
            if (movieData[i].title === title) {
                return movieData[i].poster;
            }
        }

        return null
    };

    const renderInput = (params) => {
        return (<TextField {...params} id="standard-basic" label="Enter a Movie to Search" onChange={onChange} centered="true" fullWidth />);
    }

    const renderOption = (option) => {
        return (
            <Grid container spacing={2} alignItems="center" direction="row" className="image-result">
                <Grid item xs={1}>
                    <img src={`${getImageLink(option) !== null ? "https://image.tmdb.org/t/p/w500" + getImageLink(option) : ''}`} alt={option}/>
                </Grid>
                <Grid item xs>
                    <Typography variant="h6">{option}</Typography>
                </Grid>
            </Grid>
          );
    }

    return (
        <Autocomplete  
            value={text}
            options={options}
            renderInput={(params) => renderInput(params)}
            renderOption={renderOption}
            getOptionSelected={() => true}
        />
    );
};

export default Search;