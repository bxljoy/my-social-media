import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider, Box, Link } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost } from '../../actions/posts';


const PostDetails = () => {
    const { post, posts, isLoading } = useSelector((state) => state.postsReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getPost(id));
         // eslint-disable-next-line 
    }, [id]);

    if(!post) return null;

    if(isLoading) {
        return (
        <Paper 
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                borderRadius: '15px',
                height: '39vh',
            }} 
            elevation={6}
        >
            <CircularProgress color='secondary' size='7em' />
        </Paper>
    )};

    const openPost = (_id) => navigate(`/posts/${_id}`);
    // const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

    return (
        <Paper sx={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    flexWrap: { sm: 'wrap', md: 'nowrap', lg: 'nowrap', xl: 'nowrap' },
                    flexDirection: { sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                }}
            >
                <Box
                    sx={{
                        borderRadius: '20px',
                        margin: '10px',
                        flex: 1,
                        // width: '50%',
                    }}
                >
                    <Typography variant="h3" component="h2">{post.title}</Typography>
                    <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag, index) => (
                    <Link to={`/tags/${tag}`} style={{ textDecoration: 'none', color: '#3f51b5' }} key={index}>
                        {` #${tag} `}
                    </Link>
                    ))}
                    </Typography>
                    <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
                    <Typography variant="h6">
                    Created by:
                    <Link to={`/creators/${post.name}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
                        {` ${post.name}`}
                    </Link>
                    </Typography>
                    <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    {/* <CommentSection post={post} /> */}
                    <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
                    <Divider style={{ margin: '20px 0' }} />
                </Box>
                <Box
                    sx={{
                        marginLeft: { lg:'20px', xl: '20px', md: '20px', sm: 0 },
                        // width: '50%',
                    }}
                >
                    <Box 
                        component='img'
                        sx={{
                            borderRadius: '20px',
                            objectFit: 'cover',
                            width: '100%',
                            maxHeight: '600px',
                        }}
                        src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} 
                        alt={post.title}
                    />
                </Box>
            </Box>
            {/* {!!recommendedPosts.length && (
            <Box
                sx={{
                    borderRadius: '20px',
                    margin: '10px',
                    flex: 1,
                }}
            >
                <Typography gutterBottom variant="h5">You might also like:</Typography>
                <Divider />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { sm: 'column' },
                    }}
                >
                    {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
                        <Box sx={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                            <Typography gutterBottom variant="h6">{title}</Typography>
                            <Typography gutterBottom variant="subtitle2">{name}</Typography>
                            <Typography gutterBottom variant="subtitle2">{message}</Typography>
                            <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                            <Box component='img' sx={{ width: '200px' }} src={selectedFile} />
                        </Box>
                    ))}
                </Box>
            </Box>
            )} */}
        </Paper>
    )   
}

export default PostDetails;