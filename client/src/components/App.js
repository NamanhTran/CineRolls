import React, { useState } from 'react';
import Cookie from 'js-cookie';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import NavBar from './NavBar';
import Home from './Home';
import BoxBackground from './BoxBackground';
import Search from './Search';
import MovieDetail from './MovieDetails';
import Login from './Login';

const App = () => {
    const [selection, setSelection] = useState('');
    const [loggedIn, setLoggedIn] = useState(Cookie.get('login'));

    return (
        <Router>
            <nav>
                <NavBar loggedIn={loggedIn} />

                <Switch>
                    <Route path="/search">
                        <BoxBackground>
                            <Search selection={selection} setSelection={setSelection} />
                            {selection ? <MovieDetail movie={selection}/> : null}
                        </BoxBackground>
                    </Route>

                    <Route path="/logout">
                        <BoxBackground>
                            {"Log Out Page"}
                        </BoxBackground>
                    </Route>

                    <Route path="/login">
                        <BoxBackground>
                            {loggedIn ? <Redirect to='/' /> : <Login /> }
                        </BoxBackground>
                    </Route>

                    <Route path="/">
                        <BoxBackground>
                            <Home />
                        </BoxBackground>
                    </Route>
                </Switch>
            </nav>
        </Router>
    );
};

export default App;