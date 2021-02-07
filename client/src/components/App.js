import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import NavBar from './NavBar';
import Home from './Home';
import BoxBackground from './BoxBackground';
import Search from './Search';
import MovieDetail from './MovieDetails';
import Login from './Login';
import Logout from './Logout'
import Register from './Register';

axios.defaults.withCredentials = true;

const App = () => {
    const [selection, setSelection] = useState('');
    const [hasAuth, setHasAuth] = useState(false);
    const [user, setUser] = useState({username: 'Dummy Username'});

    useEffect(() => {
        const checkSession = async () => {
            const { data } = await axios.get('https://localhost:3100/checkSession');
            setHasAuth(data['isLoggedIn']);
            setUser(data['user']);
        }

        // Check is session is valid if exists
        checkSession();
    }, []);

    return (
        <Router>
            <nav>
                <NavBar loggedIn={hasAuth} username={user.username} />

                <Switch>
                    <Route path="/search">
                        <BoxBackground>
                            <Search selection={selection} setSelection={setSelection} />
                            {selection ? <MovieDetail movie={selection}/> : null}
                        </BoxBackground>
                    </Route>

                    <Route path="/logout">
                        <BoxBackground>
                            <Logout setLoggedIn={setHasAuth} setUser={setUser} />
                        </BoxBackground>
                    </Route>

                    <Route path="/login">
                        <BoxBackground maxWidth="xs">
                            {hasAuth ? <Redirect to='/' /> : <Login setLoggedIn={setHasAuth} setUser={setUser}/> }
                        </BoxBackground>
                    </Route>

                    <Route path="/register">
                        <BoxBackground maxWidth="xs">
                            {hasAuth ? null : <Register setLoggedIn={setHasAuth} setUser={setUser}/> }
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