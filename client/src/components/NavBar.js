import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const NavBar = ({ loggedIn }) => {

    return (
        <AppBar position="static" style={{ margin: 0 }}>
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
                    {loggedIn ? <Button component={Link} to="logout" color="inherit">Logout</Button> : <Button component={Link} to="/login" color="inherit">Login</Button>}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;