import { Container, Paper, Box } from '@material-ui/core';
import React, { useState } from 'react';

import Search from './Search';
import MovieDetail from './MovieDetails';

const App = () => {
    const [selection, setSelection] = useState('');

    return (
        <div>
            <Container>
                <Paper elevation={1}>
                    <Box p={2} mt={4}>
                        <Search selection={selection} setSelection={setSelection} />
                        {selection ? <MovieDetail movie={selection}/> : null}
                    </Box>
                </Paper>
            </Container>
        </div>
    );
};

export default App;