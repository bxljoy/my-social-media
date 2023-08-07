import React, { useState } from 'react';
import { Avatar, Grid, Paper, Button, Typography, Container } from '@mui/material';
import { useGoogleLogin } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import LockOutLinedIcon from '@mui/icons-material/LockOutlined';
import Input from './Input'; 
import MyIcon from './MyIcon';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as api from '../../api';


const Auth = () => {
    const [isSignup, setIsSignup] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleSubmit = () => {

    };

    const handleChange = () => {

    };

    const switchMode = () => {
        setIsSignup((prevMode) => !prevMode);
        setShowPassword(false);
    };

    const googleSuccess = async (res) => {
        try {
            const { data: result } = await api.verifyJwtToken(res);
            console.log(result);
            const token = res.credential;
            // console.log(token);
            dispatch({type: 'AUTH', data: { result, token }});
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    const googleFailure = (error) => {
        console.log(error); 
        console.log('Google Sign In was unsuccessful. Try Again Later');
    };

    const login = useGoogleLogin({
        onSuccess: googleSuccess,
        onError: googleFailure
    });

    return (
        <Container component="main" maxWidth="xs">
            <Paper 
                sx={{
                    marginTop: (theme) => theme.spacing(8),
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: (theme) => theme.spacing(2),
                }}
                elevation={3}
            >
                <Avatar 
                    sx={{
                        margin: (theme) => theme.spacing(1),
                        backgroundColor: (theme) => theme.palette.secondary.main,
                    }}
                >
                    <LockOutLinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <Box 
                    component="form" 
                    sx={{
                        width: '100%', // Fix IE 11 issue.
                        marginTop: (theme) => theme.spacing(3),
                    }}
                    onSubmit={handleSubmit}>
                    <Grid container spacing={2}
                >
                        {
                            isSignup && (
                                <>
                                    <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                                    <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name='email' label='Email Address' handleChange={handleChange} type='email'  />
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        { isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' /> }
                    </Grid>
                    <Button 
                        type='submit' 
                        fullWidth 
                        variant='contained' 
                        color='primary' 
                        sx={{
                            margin: (theme) => theme.spacing(3, 0, 2),
                        }}
                    >
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <Button 
                        sx={{
                            marginBottom: (theme) => theme.spacing(2),
                        }}
                        color='primary' 
                        fullWidth 
                        onClick={login} 
                        startIcon={<MyIcon />} 
                        variant='contained'
                    >
                        Sign in with Google 🚀{' '}
                    </Button>
                    <GoogleLogin onSuccess={googleSuccess} onError={googleFailure} size='large' />
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up" }
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    )
}

export default Auth;