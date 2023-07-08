import React from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import catlover from './images/cat-lover.png';
import Form from './components/Form/Form';
import Posts from './components/Posts/Posts';
import appStyles from './styles';

const App = () => {
    const classes = appStyles()
    return (
        <Container maxidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant='h2' align='center'>Cat Lover</Typography>
                <img className={classes.image} src={catlover} alt='catlover' height='60' />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justifyContent="space-between" alignItems='stretch' spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App;