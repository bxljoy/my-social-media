import React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const App = () => {

    const prefersDarkMode = useMediaQuery('(display-mode: fullscreen)');
    // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(
      () =>
        createTheme({
          palette: {
            mode: prefersDarkMode ? 'dark' : 'light',
          },
        }),
      [prefersDarkMode],
    );

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Container maxidth="lg">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/auth" element={<Auth />} />
                    </Routes>
                </Container>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App;