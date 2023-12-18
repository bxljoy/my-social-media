import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import { deepPurple } from '@mui/material/colors';
import catlover from '../../images/cat-lover.png';
import { useDispatch } from "react-redux";
import decode from 'jwt-decode';

const Navbar = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/');
    }
    
    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        
        setUser(JSON.parse(localStorage.getItem('profile')));
    // eslint-disable-next-line
    }, [location]);

    return (
        <AppBar 
            sx={{
                borderRadius: 15,
                margin: '30px 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 50px',
                flexDirection: {xs:'column', sm: 'row', md: 'row', lg: 'row'},
            }}
            position="static" 
            color="inherit"
        >
            <Box 
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: {xs:'column', sm: 'row', md: 'row', lg: 'row'},
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
                    justifyContent: {xs: 'center', sm: 'flex-end', md: 'flex-end', lg: 'flex-end'},
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
                            {user.result.name.charAt(0)}
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