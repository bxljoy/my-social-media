import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Button,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import Box from "@mui/material/Box";
import { deepPurple } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const Navbar = ({ darkMode, setDarkMode }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
    // eslint-disable-next-line
  }, [location]);

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <AppBar
      sx={{
        borderRadius: "15px",
        margin: "30px 0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 50px",
        flexDirection: { xs: "column", sm: "row", md: "row", lg: "row" },
      }}
      position="static"
      color="inherit"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: { xs: "row", sm: "row", md: "row", lg: "row" },
        }}
      >
        <Typography
          component={Link}
          to="/"
          sx={{
            color: "rgba(0,183,255, 1)",
            textDecoration: "none",
            fontSize: "2rem",
          }}
          // variant='h2'
          align="center"
        >
          Moments
        </Typography>
        <IconButton
          aria-label="darkMode"
          color="secondary"
          onClick={handleDarkMode}
        >
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Box>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: {
            xs: "center",
            sm: "flex-end",
            md: "flex-end",
            lg: "flex-end",
          },
          width: "400px",
        }}
      >
        {user ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row", md: "row", lg: "row" },
              alignItems: "center",
              justifyContent: "flex-end",
              width: "400px",
              gap: "10px",
            }}
          >
            <Avatar
              sx={{
                color: (theme) =>
                  theme.palette.getContrastText(deepPurple[500]),
                backgroundColor: deepPurple[500],
              }}
              alt={user.result.name}
              src={user.result.picture}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
              }}
              variant="h6"
            >
              {user.result.name}
            </Typography>
            <Button variant="contained" color="secondary" onClick={logout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
