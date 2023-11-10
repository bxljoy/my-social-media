import React, { useState, useRef, useEffect } from 'react';
import { Typography, TextField, Button, Box, Backdrop, CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import { commentPost } from '../../actions/posts';


const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const [backDrop, setBackDrop] = React.useState(false);
  const commentsRef = useRef();

  useEffect(() => {
    if (commentsRef.current) {
      commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [comments]);

  const handleBackDropClose = () => {
    setBackDrop(false);
  };

  const handleBackDropOpen = () => {
      setBackDrop(true);
  };

  const handleComment = async () => {
    handleBackDropOpen();
    const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id));

    setComments(newComments);
    setComment('');
    
    handleBackDropClose();
  };

  return (
    <Box>
      <Box
        sx={{
            display: 'flex',
            justifyContent: 'space-between',
        }}
      >
        <Box
            sx={{
                height: '200px',
                overflowY: 'auto',
                marginRight: '30px',
            }}
        >
          <Typography gutterBottom variant="h6">Comments</Typography>
          {comments?.map((c, i) => (
    
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.split(': ')[0]}:</strong>
              {c.split(':')[1]}
            </Typography>
          ))}
          <Box ref={commentsRef} />
        </Box>
        { user?.result?.name && (
        <Box 
            sx={{ 
                width: '70%'
            }}
        >
          <Typography gutterBottom variant="h6">Write a comment</Typography>
          <TextField fullWidth rows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
          <br />
          <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} color="secondary" variant="contained" onClick={handleComment}>
            Comment
          </Button>
        </Box>)}
      </Box>
      <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backDrop}
          // onClick={handleBackDropClose}
      >
          <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default CommentSection;