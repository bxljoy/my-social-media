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
        console.log(res);
        try {
            const { data: result } = await api.verifyJwtToken(res);
            console.log(result);
            const token = res.credential;
            console.log(`token: ${token}`);
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

    // calling google api from frontend, it's not safe enough.
    // const login = useGoogleLogin({
    //     onSuccess: async tokenResponse => {
    //       console.log(tokenResponse);
    //       // fetching userinfo can be done on the client or the server
    //       const userInfo = await axios
    //         .get('https://www.googleapis.com/oauth2/v3/userinfo', {
    //           headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
    //         })
    //         .then(res => res.data);
    //       console.log(userInfo);
    //     },
    //     // flow: 'implicit', // implicit is the default
    //     onError: googleFailure,
    // });

    // const loginAndGetTokens = useGoogleLogin({
    //     onSuccess: async (tokenResponse) => {
    //         console.log(tokenResponse);
    //         const tokens = await api.getTokens({
    //             code: tokenResponse.code,
    //         });
        
    //         console.log(tokens);
    //     },
    //     flow: 'auth-code',     // 'auto-code' flow can get tokenResponse.code, the default flow 'implicit' can get tokenResponse.access_token
    //     onError: googleFailure,
    // });

    const loginAndGetUserInfo = useGoogleLogin({
        flow: 'auth-code',     // 'auto-code' flow can get tokenResponse.code, the default flow 'implicit' can get tokenResponse.access_token
        onSuccess: async (tokenResponse) => {
            console.log(tokenResponse);
            // const userinfo = await api.getUserInfo({
            //     code: tokenResponse.code,
            // });
            // console.log(userinfo);
            try {
                const { data: result } = await api.getUserInfo({
                    code: tokenResponse.code,
                });
                console.log(result);
                const token = result.id_token;
                console.log(`token: ${token}`);
                dispatch({type: 'AUTH', data: { result, token }});
                navigate('/');
            } catch (error) {
                console.log(error);
            }
        },
        onError: googleFailure,
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
                        onClick={loginAndGetUserInfo} 
                        startIcon={<MyIcon />} 
                        variant='contained'
                    >
                        Sign in with Google 🚀{' '}
                    </Button>
                    <GoogleLogin onSuccess={googleSuccess} onError={googleFailure} size='large' auto_select useOneTap />
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


// {
//     "data": {
//         "access_token": "ya29.a0AfB_byBI1TNjHPIYvoUp-8p9MkrLwRT2GkLixcFnzu4Q-Qi0pZlYFLFcGJ-iL78vBPLi-iJMm_L92yDrcLRWdq1XswrYQ-MjBPqQ0QzMeDIp6iSJkvF7AwgS6teyc0vtAoa9vr6DsP4Y2QSArX0Z5EXnAHd0aCgYKASASARESFQHsvYlsa5WdSjnSRCDlSNl9pztTIQ0163",
//         "refresh_token": "1//0gxmwemCzewYuCgYIARAAGBASNwF-L9IrUbtjfRVmva5D4ciJJen7etJ-r8MJlryYR3xXyoCzXUeEg6wSRH394KoezOqLk5Vlgoc",
//         "scope": "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid",
//         "token_type": "Bearer",
//         "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjdjOWM3OGUzYjAwZTFiYjA5MmQyNDZjODg3YjExMjIwYzg3YjdkMjAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxMjMyNzYwODkyNDktM20xMWdndjBhdXRjdnJldW4zcGdxaDM5NWFqa3JnZmsuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIxMjMyNzYwODkyNDktM20xMWdndjBhdXRjdnJldW4zcGdxaDM5NWFqa3JnZmsuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTQ3MTM1Nzg3NjU5NTA5OTI0NjUiLCJlbWFpbCI6ImJ4bGpveUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IkJkanBwY1hvS3p5V3N2NDgzOU14cmciLCJuYW1lIjoiQWxleCBCYW8iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFjSFR0Zjh1SWtpZDl2ZDhVWE9SWU5hTmc3M2YzVUtaVGtHRmZTRjZPV3RXYmdUSVlzPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkFsZXgiLCJmYW1pbHlfbmFtZSI6IkJhbyIsImxvY2FsZSI6ImVuLUdCIiwiaWF0IjoxNjkyMjg3NTk0LCJleHAiOjE2OTIyOTExOTR9.AnncG3HETg_j33eP3VR95d0hu6LhNb-7kgJDDRwYgSDCB-QeEMGidb-dmTxpnuW_5a8OGJbzr06lMlf7l4efDQvZbrVQeggfunph_opyKKgvTbhk3u2u8O2WEo0QIUiabEmM2WufvxYJpPQFMINafQWNrJem35w-O4KEEXP9P7yWutykqlnCxTj81DLN7Zc2Btrks8KyPpqQHvMpd9lKvaybtJOZSYKdBGoaff-cnGwfyLxXbxxuE3J7kTMAHDZKtcVFsUE0X6fKHid-BZU7cFCgxWZbqmAVeNlKbkKydO0i97Jm1Zhf8kJxYl7nSyXDJMVYGqv_PP61PpSc3odWJg",
//         "expiry_date": 1692291193252
//     },
//     "status": 200,
//     "statusText": "OK",
//     "headers": {
//         "content-length": "1678",
//         "content-type": "application/json; charset=utf-8"
//     },
//     "config": {
//         "transitional": {
//             "silentJSONParsing": true,
//             "forcedJSONParsing": true,
//             "clarifyTimeoutError": false
//         },
//         "adapter": [
//             "xhr",
//             "http"
//         ],
//         "transformRequest": [
//             null
//         ],
//         "transformResponse": [
//             null
//         ],
//         "timeout": 0,
//         "xsrfCookieName": "XSRF-TOKEN",
//         "xsrfHeaderName": "X-XSRF-TOKEN",
//         "maxContentLength": -1,
//         "maxBodyLength": -1,
//         "env": {},
//         "headers": {
//             "Accept": "application/json, text/plain, */*",
//             "Content-Type": "application/json"
//         },
//         "method": "post",
//         "url": "http://localhost:4000/auth/get-token",
//         "data": "{\"code\":\"4/0Adeu5BURLMnvYPZGqmBEa7TrtFwszSaRfdLZL19y3uI9QS3sOQkTSvKOr8TYz2B5MV2Cfw\"}"
//     },
//     "request": {}
// }