import { Button, Grid, Box, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import EmailValidator from 'email-validator';

import CustomTextField from './CustomTextField';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [isUsernameValid, setIsUsernameValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);

    const onUsernameChange = (event) => {
        console.log(event.target.value);
        setUsername(event.target.value);
    };

    const onEmailChange = (event) => {
        console.log(event.target.value);
        setEmail(event.target.value);
    };

    const onSubmit = (event) => {
        if (isUsernameValid && isEmailValid) {
            
        }

        console.log("Submit button hit");
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
                        <CustomTextField required id="standard-required" label="Email" color="secondary" onChange={e => onEmailChange(e)}/>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomTextField required id="standard-required-password" type="password" color="secondary" label="Password" />
                    </Grid>
                    <Grid item xs={12} pt={1}>
                        <Button variant="contained" color="default" onClick={e => onSubmit(e)}>Create Account</Button>
                    </Grid>
                </Grid>
            </Box>
        </form>
    );
};

export default Register;