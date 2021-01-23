import React from 'react';
import { Paper, Grid, Box, Typography } from '@material-ui/core';

const MovieDetails = ({ movie }) => {
    return (
        <Paper elevation={2}>
            <Box p={2} mt={3}>
                <Grid container direction="column">
                    <Grid item>
                        <Typography variant="h3">
                            {movie.title}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <img alt={movie.title} src={`${movie.poster ? "https://image.tmdb.org/t/p/w500" + movie.poster : 'http://media1.myfolio.com/users/getrnd/images/thumbs/mkay4a6gy1_poster.jpg'}`}/>
                    </Grid>
                    <Grid item>
                        <Typography >
                            {movie.description}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography display="inline">
                            Release Date:&nbsp;
                        </Typography>
                        <Typography display="inline">
                            {movie.releaseDate}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography display="inline">
                            Rating:&nbsp;
                        </Typography>
                        <Typography display="inline">
                            {movie.voteAverage}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default MovieDetails;