import React, { useState } from 'react';
import { Button, Grid, Box } from '@material-ui/core';

import CustomTextField from './CustomTextField';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onUsernameChange = (event) => {
        console.log(event.target.value);
        setUsername(event.target.value);
    };

    const onPasswordChange = (event) => {
        setPassword(event.target.value)
    };

    const onSubmit = (event) => {

        console.log("Submit button hit");
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
                        <Button variant="contained" color="default" onClick={e => onSubmit(e)}>Login</Button>
                    </Grid>
                </Grid>
            </Box>
        </form>
    );
};

export default Login;