import { useState } from 'react';
import { Grid, Box, Typography, CircularProgress } from '@material-ui/core';

const MovieResult = ({ poster, title }) => {
    const [imageLoad, setImageLoad] = useState(false);

    const onLoad = () => {
        setImageLoad(true);
    };

    return (
    <Grid container spacing={2} alignItems="center" direction="row" className="image-result">
        <Grid item xs={1}>
            <Box display={imageLoad ? "block" : "none"}>
                <img 
                    alt={title}
                    src={`${poster ? "https://image.tmdb.org/t/p/w154" + poster : 'http://media1.myfolio.com/users/getrnd/images/thumbs/mkay4a6gy1_poster.jpg'}`}
                    onLoad={onLoad}
                />
            </Box>
            {!imageLoad ? <CircularProgress /> : null}
        </Grid>
        <Grid item xs>
            <Typography variant="h6">{title}</Typography>
        </Grid>
    </Grid>);
};

export default MovieResult;