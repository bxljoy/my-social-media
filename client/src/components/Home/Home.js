import React, { useState } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';

import { getPostsBySearch } from '../../actions/posts';
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
    const [tags, setTags] = useState([]);

    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
          } else {
            navigate('/');
          }
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
          searchPost();
        }
    };

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
                                onKeyDown={handleKeyPress}
                            />
                            <Autocomplete
                                multiple
                                id="tags-filled"
                                options={[]}
                                defaultValue={[]}
                                freeSolo
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="filled"
                                        label="Search Tags"
                                        placeholder="Tags"
                                    />
                                )}
                                onChange={(e, newValue) => setTags(newValue)}
                            />
                            <Button onClick={searchPost} className="searchButton" variant="contained" color="primary">Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {( !searchQuery && !tags.length) && (
                            <Paper elevation={6} className='pagination'>
                                <Pagination
                                    sx={{
                                        borderRadius: 4,
                                        marginTop: '1rem',
                                        padding: '16px',
                                    }}
                                    page={page}
                                />
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
}

export default Home;