import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import { deepPurple } from '@mui/material/colors';
import catlover from '../../images/cat-lover.png';
import { useDispatch } from "react-redux";

const Navbar = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // const token = user?.token;
        
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/');
        // setUser(null);
    }

    return (
        <AppBar 
            sx={{
                borderRadius: 15,
                margin: '30px 0',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 50px',
            }}
            position="static" 
            color="inherit"
        >
            <Box 
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Typography 
                    component={Link} 
                    to='/' 
                    sx={{
                        color: 'rgba(0,183,255, 1)',
                        textDecoration: 'none',
                    }}
                    variant='h2' 
                    align='center'
                >
                    Moments
                </Typography>
                <Box 
                    component="img" 
                    sx={{
                        marginLeft: '15px',
                    }}
                    src={catlover} 
                    alt='catlover' 
                    height='60px'>
                </Box>
            </Box>
            <Toolbar 
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: '400px',
                }}
            >
                {user ? (
                    <Box 
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '400px',
                        }}
                    >
                        <Avatar 
                            sx={{
                                color: (theme) => theme.palette.getContrastText(deepPurple[500]),
                                backgroundColor: deepPurple[500],
                            }}
                            alt={user.result.name} 
                            src={user.result.picture} 
                        >
                            {user.result.name}
                        </Avatar>
                        <Typography 
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            variant="h6"
                        >
                            {user.result.name}
                        </Typography>
                        <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>
                    </Box>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;