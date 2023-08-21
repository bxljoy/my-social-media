import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import Box from '@mui/material/Box';
// import InputAdornment from '@mui/material/InputAdornment';
// import AccountCircle from '@mui/icons-material/AccountCircle';

const Form = ({currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
    const post = useSelector((state) => currentId ? state.postsReducer.find(p => p._id === currentId) : null);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if (post) {
            setPostData(post);
        }
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updatePost({ ...postData, name: user?.result?.name }, currentId));
        } else {
            dispatch(createPost({ ...postData, name: user?.result?.name }));
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({ title: '', message: '', tags: '', selectedFile: '' });
    }

    if (!user?.result?.name) {
        return (
            <Paper 
                sx={{
                    padding: (theme) => theme.spacing(2),
                }}
            >
                <Typography variant="h6" align="center">
                    Please Sign In to create your own moments and like other's moments.
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper 
            sx={{
                padding: (theme) => theme.spacing(2),
            }}
        >
            <Box 
                component="form" 
                autoComplete="off" 
                noValidate 
                sx={{
                    '& .MuiTextField-root': {
                        margin: (theme) => theme.spacing(1),
                    },
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}
                onSubmit={handleSubmit} 
            >
                <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Moment</Typography>
                {/* <TextField 
                    name="creator" 
                    variant="outlined" 
                    label="Creator" 
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        ),
                    }}
                    required 
                    fullWidth 
                    value={postData.creator} 
                    onChange={(e) => setPostData({ ...postData, creator: e.target.value })}/> */}
                <TextField name="title" variant="outlined" label="Title" required fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}/>
                <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}/>
                <TextField name="tags" variant="outlined" label="Tags (comma separated)" helperText="e.g.: tag1,tag2,tag3" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}/>
                <Box 
                    sx={{
                        width: '97%',
                        margin: '10px 0',
                    }}
                >
                    <FileBase type="file" multiple={ false } onDone = { ({ base64 }) => setPostData( { ...postData, selectedFile: base64 } ) }/>   
                </Box>
                <Button sx={{marginBottom: 5, marginTop: 5}} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="large" onClick={clear} fullWidth>Clear</Button>
            </Box>
        </Paper>
    );
}

export default Form;