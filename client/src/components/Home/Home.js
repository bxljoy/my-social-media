import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Chip from '@mui/material';

import { getPosts } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination';

const Home = () => {
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page') || '1', 10);
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('');

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    return (
        <Grow in>
            <Container maxWidth="xl" >
                <Grid 
                    container 
                    justifyContent="space-between" 
                    alignItems='stretch' 
                    spacing={3} 
                    className='gridContainer'
                    sx={{
                        flexDirection: {xs: 'column-reverse', sm: 'row'}
                    }}
                >
                    <Grid item xs={12} sm={6} md={9} >
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} >
                        <AppBar 
                        className='appBarSearch' 
                        position='static' 
                        color='inherit'
                        sx={{
                            borderRadius: 4,
                            marginBottom: '1rem',
                            display: 'flex',
                            padding: '16px',
                        }}
                        >
                            <TextField 
                                name='search' 
                                variant='outlined'
                                label='Search Moments' 
                                fullWidth
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        <Paper elevation={6}>
                            <Pagination
                                sx={{
                                    borderRadius: 4,
                                    marginTop: '1rem',
                                    padding: '16px',
                                }}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
}

export default Home;