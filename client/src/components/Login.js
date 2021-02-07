import React, { useState } from 'react';
import { Button, Grid, Box, CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import CustomTextField from './CustomTextField';
axios.defaults.withCredentials = true;

const Login = ({ setLoggedIn, setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState('');
    const history = useHistory();

    const onUsernameChange = (event) => {
        console.log(event.target.value);
        setUsername(event.target.value);
    };

    const onPasswordChange = (event) => {
        setPassword(event.target.value)
    };

    const onSubmit = async (event) => {
        console.log("Submit button hit");
        try {
            setLoading(true);
            const { data } = await axios.post('https://localhost:3100/login', {'username': username, 'password': password});
            setLoading(false);
            setUser(data);
            setLoggedIn(true);
            history.push("/");
            
        } catch (error) {
            setLoading(false);
            console.log('error', error);
        }
    };

    return (
        <form>
            <Box>
                <Grid container spacing={3} direction="column" alignItems="center" justify="center">
                    <Grid item xs={12}>
                        <CustomTextField required id="standard-required" label="Username" color="secondary" onChange={e => onUsernameChange(e)} />
                    </Grid>
                    <Grid item xs={12}>
                        <CustomTextField required id="standard-required-password" type="password" color="secondary" label="Password" onChange={e => onPasswordChange(e)} />
                    </Grid>
                    <Grid item xs={12}>
                    <Button variant="contained" color="default" onClick={e => onSubmit(e)}>{loading ? <CircularProgress color="inherit" size={20} /> : "Login"}</Button>
                    </Grid>
                </Grid>
            </Box>
        </form>
    );
};

export default Login;