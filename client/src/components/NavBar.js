import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const NavBar = ({ loggedIn, username }) => {

    return (
        <AppBar position="static" style={{ margin: 0 }} color="default">
            <Toolbar>
                <Typography variant="h6">
                    <Button component={Link} to="/" color="inherit" disableRipple={true}>
                        Home
                    </Button>
                </Typography>
                
                <Typography variant="h6">
                    <Button component={Link} to="/search" color="inherit" disableRipple={true}>
                        Search
                    </Button>
                </Typography>

                <Typography variant="h6">
                    {loggedIn ? <React.Fragment> <Button component={Link} to="/profile" color="inherit" disableRipple={true} style={{textTransform: 'none'}}>{username}</Button> <Button component={Link} to="/logout" color="inherit" disableRipple={true}>Logout</Button> </React.Fragment> : <Button component={Link} to="/login" color="inherit" disableRipple={true}>Login</Button>}
                </Typography>

                <Typography variant="h6">
                    {loggedIn ? null : <Button component={Link} to="/register" color="inherit" disableRipple={true}>Sign Up</Button>}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;