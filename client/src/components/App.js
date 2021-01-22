import { Container, Paper, Box } from '@material-ui/core';
import React, { useState } from 'react';

import Search from './Search';
import MovieDetail from './MovieDetails';

const App = () => {
    const [selection, setSelection] = useState('');

    const theme = {
        spacing: 8,
    };

    return (
        <div style={{backgroundImage: `url(${selection && selection !== null ? "https://image.tmdb.org/t/p/original" + selection.background : ""})`, backgroundRepeat:"no-repeat", backgroundSize: "cover", height: "98vh", width: "100%", backgroundPosition: "center", margin: "0" }}>
            <Container>
                <Paper elevation={1}>
                    <Box p={2} mt={4}>
                        <Paper elevation={2}>
                            <Box >
                                <Search selection={selection} setSelection={setSelection} />
                            </Box>
                        </Paper>
                        <Paper elevation={2}>
                            <Box p={2} mt={3}>
                                <MovieDetail movie={selection}/>
                            </Box>
                        </Paper>
                    </Box>
                </Paper>
            </Container>
        </div>
    );
};

export default App;