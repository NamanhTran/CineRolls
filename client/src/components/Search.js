import './Search.css';

import React, { useEffect, useState } from 'react';
import { TextField, CircularProgress, Paper, Box } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import axios from 'axios';

import MovieResult from './MovieResult';

const Search = ({ selection, setSelection }) => {
    const [text, setText] = useState('');
    const [dbText, setDbText] = useState(text);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        const timeoutId = setTimeout(() => {
            setDbText(text);
            setLoading(false);
        }, 1000);

        return () => {
            clearTimeout(timeoutId);
        }
    }, [text]);

    useEffect(() => {
        const search = async () => {
            const { data } = await axios.post('http://localhost:3100/search', {"query": dbText});
           setOptions(data.data);
           console.log(data.data);
        };
        
        if (dbText) {
            search();
        }

        else {
            setOptions([]);
        }

    }, [dbText]);

    const onInputChange = (event, input) => {
        setText(input);
        console.log(input);
    }

    const onSelection = (event, value) => {
        setSelection(value);
        console.log(value);
    };

    const renderInput = (params) => {
        return (
        <TextField 
            {...params} 
            id="outlined-basic" 
            label="Enter a Movie to Search" 
            centered="true"
            variant="outlined" 
            fullWidth 
            InputProps={{
                ...params.InputProps,
                endAdornment: (
                <React.Fragment>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                </React.Fragment>
                ),
            }}
        />);
    }

    const renderOption = (option) => {
        return (<MovieResult poster={option.poster} title={option.title}/>);
    }

    return (
        <Paper elevation={2}>
            <Box>
                <Autocomplete
                    inputValue={text}
                    options={options}
                    value={selection}
                    getOptionLabel={(option => option.title ? option.title : "")}
                    getOptionSelected={(option, value) => option.title === value.title}
                    renderInput={(params) => renderInput(params)}
                    renderOption={renderOption}
                    onInputChange={onInputChange}
                    onChange={onSelection}
                    freeSolo={true}
                />
            </Box>
        </Paper>
    );
};

export default Search;