import React from "react";
import { Container } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
  const [darkMode, setDarkMode] = React.useState(false);
  const user = JSON.parse(localStorage.getItem("profile"));

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
        breakpoints: {
          values: {
            xs: 0,
            sm: 550,
            md: 768,
            lg: 1200,
            xl: 1536,
          },
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Container maxWidth="xl">
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <Routes>
            <Route path="/" element={<Navigate to="/posts" />} />
            <Route path="/posts" element={<Home />} />
            <Route path="/posts/search" element={<Home />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route
              path="/auth"
              element={!user ? <Auth /> : <Navigate to="/posts" />}
            />
          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
