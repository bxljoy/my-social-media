import React, { useState } from "react";
import {
  Avatar,
  Grid,
  Paper,
  Button,
  Typography,
  Container,
  Alert,
} from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import LockOutLinedIcon from "@mui/icons-material/LockOutlined";
import Input from "./Input";
import MyIcon from "./MyIcon";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as api from "../../api";
import { signup, signin } from "../../actions/auth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState(initialState);

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(formData, navigate, setError));
    } else {
      dispatch(signin(formData, navigate, setError));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setIsSignup((prevMode) => !prevMode);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    // console.log(res);
    try {
      const { data: result } = await api.verifyJwtToken(res);
      // console.log(result);
      const token = res.credential;
      // console.log(`token: ${token}`);
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In was unsuccessful. Try Again Later");
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
    flow: "auth-code", // 'auto-code' flow can get tokenResponse.code, the default flow 'implicit' can get tokenResponse.access_token
    onSuccess: async (tokenResponse) => {
      // console.log(tokenResponse);
      try {
        const { data: result } = await api.getUserInfo({
          code: tokenResponse.code,
        });
        // console.log(result);
        const token = result.id_token;
        // console.log(`token: ${token}`);
        dispatch({ type: "AUTH", data: { result, token } });
        navigate("/");
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        {error && (
          <Alert
            variant="filled"
            severity="error"
            onClose={() => {
              setError("");
            }}
            sx={{ marginTop: "10px" }}
          >
            {error}
          </Alert>
        )}
        <Box
          component="form"
          sx={{
            width: "100%", // Fix IE 11 issue.
            marginTop: (theme) => theme.spacing(3),
          }}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              margin: (theme) => theme.spacing(3, 0, 2),
            }}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <Button
            sx={{
              marginBottom: (theme) => theme.spacing(2),
            }}
            color="primary"
            fullWidth
            onClick={loginAndGetUserInfo}
            startIcon={<MyIcon />}
            variant="contained"
          >
            Sign in with Google 🚀{" "}
          </Button>
          <GoogleLogin
            onSuccess={googleSuccess}
            onError={googleFailure}
            size="large"
            auto_select
            useOneTap
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Auth;
