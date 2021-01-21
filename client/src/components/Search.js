import './Search.css';

import React, { useEffect, useState } from 'react';
import { TextField, Grid, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import axios from 'axios';

const Search = () => {
    const [text, setText] = useState('');
    const [dbText, setDbText] = useState(text);
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
           setOptions(data.data);
        };
        
        if (dbText) {
            search();
        }

        else {
            setOptions([]);
        }

    }, [dbText]);

    const onChange = (event, input) => {
        setText(input);
        console.log(input);
    }

    const renderInput = (params) => {
        return (<TextField {...params} id="standard-basic" label="Enter a Movie to Search" centered="true" fullWidth />);
    }

    const renderOption = (option) => {
        return (
            <Grid container spacing={2} alignItems="center" direction="row" className="image-result">
                <Grid item xs={1}>
                    <img src={`${option.poster ? "https://image.tmdb.org/t/p/w500" + option.poster : 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-19/s150x150/119710013_177484657221030_7662811337725111718_n.jpg?_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_ohc=aiWg0C1jny0AX_UZYIC&tp=1&oh=116956072e4d080ea7c3664a0261e7bc&oe=60327946'}`} alt={option}/>
                </Grid>
                <Grid item xs>
                    <Typography variant="h6">{option.title}</Typography>
                </Grid>
            </Grid>
          );
    }

    return (
        <Autocomplete
            inputValue={text}
            options={options}
            getOptionLabel={(option => option.title)}
            getOptionSelected={(option, value) => option.title === value.title}
            renderInput={(params) => renderInput(params)}
            renderOption={renderOption}
            onInputChange={onChange}
            freeSolo={true}
        />
    );
};

export default Search;