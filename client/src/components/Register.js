import { Button, Grid, Box, Typography, CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import CustomTextField from './CustomTextField';

const Register = ({ setLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const onUsernameChange = (event) => {
        console.log(event.target.value);
        setUsername(event.target.value);
    };

    const onEmailChange = (event) => {
        console.log(event.target.value);
        setEmail(event.target.value);
    };

    const onPasswordChange = (event) => {
        console.log(event.target.value);
        setPassword(event.target.value);
    }

    const onSubmit = async (event) => {
        console.log("Submit button hit");
        try {
            setLoading(true);
            const response = await axios.post('https://localhost:3100/signup', {'username': username, 'email': email, 'password': password}, {withCredentials: true});
            setLoading(false);
            console.log(response.headers);
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
                        <Typography variant="h4">Sign Up Today!</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomTextField required id="standard-required" label="Username" color="secondary" onChange={e => onUsernameChange(e)} />
                    </Grid>
                    <Grid item xs={12}>
                        <CustomTextField required id="standard-required" label="Email" color="secondary" onChange={e => onEmailChange(e)} />
                    </Grid>
                    <Grid item xs={12}>
                        <CustomTextField required id="standard-required-password" type="password" color="secondary" label="Password" onChange={e => onPasswordChange(e)} />
                    </Grid>
                    <Grid item xs={12} pt={1}>
                        <Button variant="contained" color="default" onClick={e => onSubmit(e)}>{loading ? <CircularProgress color="inherit" size={20} /> : "Create Account"}</Button>
                    </Grid>
                </Grid>
            </Box>
        </form>
    );
};

export default Register;