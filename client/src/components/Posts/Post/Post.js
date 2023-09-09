import React from "react";
import Button from "@mui/material/Button";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbDownAltOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from "react-router-dom";
import decode from 'jwt-decode';

const Post = ({ post, setCurrentId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const user = JSON.parse(localStorage.getItem('profile'));

    const Likes = () => {
        if (post.likes.length > 0) {
          return post.likes.find((like) => like === (user?.result?.sub || user?.result?._id))
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    const handleClickOpen = () => {
        checkTokenExpiration();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => dispatch(deletePost(post._id));

    const handleLike = () => {
        checkTokenExpiration();
        dispatch(likePost(post._id));
    }

    const handleEdit = () => {
        checkTokenExpiration();
        setCurrentId(post._id);
    }

    const handleMouseEnter = () => {

    }

    const handleMouseLeave = () => {
        
    }

    const handleImageClick = () => {
        navigate(`/posts/${post._id}`);
    }

    const checkTokenExpiration = () => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) navigate('/auth');
        }
    }

    return (
        <Card
            sx={{ 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: '15px',
                height: '100%',
                position: 'relative',
            }}
            raised
            elevation={6}
        >
            <CardActionArea onMouseEnter={handleMouseEnter} onMouseOut={handleMouseLeave} onClick={handleImageClick}>
                <CardMedia 
                    sx={{
                        height: 0,
                        paddingTop: '56.25%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        backgroundBlendMode: 'hard-light',
                        // backgroundBlendMode: 'darken',
                    }}
                    image={post.selectedFile} 
                    src={post.selectedFile} 
                    title={post.title}
                    alt={post.title}
                /> 
            </CardActionArea>
            <Box 
                sx={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    color: 'white',
                }}
            >
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </Box>
            { (user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
                <Box 
                    sx={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        color: 'white',
                    }}
                >
                    <Button 
                        style={{color: 'white'}} 
                        size="small" 
                        disabled={!user?.result || user?.result.name !== post.name}
                        onClick={handleEdit}>
                        <MoreHorizIcon fontSize="medium" />
                    </Button>
                </Box>
            )}
            <Box 
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: '20px',
                }}
            >
                <Typography variant="body2" color="textSecondary">{post.tags.map(tag => `#${tag} `)}</Typography>
            </Box>
            <Typography sx={{padding: '0 16px'}} variant="h5" gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component='p'>{post.message}</Typography>
            </CardContent>
            <CardActions
                sx={{
                    padding: '0 16px 8px 16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
                    <Likes />
                </Button>
                { (user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
                    <Button size="small" color="primary" onClick={handleClickOpen}>
                         <DeleteIcon fontSize="small"/>
                         Delete
                    </Button>
                )}
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Deleting this moment, are you sure?"}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deleting this moment. This means deleting this moment for good,
                        and you could never get it back again.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>No</Button>
                        <Button onClick={handleDelete} autoFocus>Yes</Button>
                    </DialogActions>
                </Dialog>
            </CardActions>
        </Card>
    );
}

export default Post;