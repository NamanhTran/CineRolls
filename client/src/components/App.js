import { Container } from '@material-ui/core';
import React, { useState } from 'react';

import Search from './Search';
import MovieDetail from './MovieDetails';

const App = () => {
    const [selection, setSelection] = useState('');

    return (
        <Container > 
            <Search selection={selection} setSelection={setSelection} />
            <MovieDetail movie={selection}/>
        </Container>
    );
};

export default App;