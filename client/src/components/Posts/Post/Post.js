import React from "react";
import Button from "@mui/material/Button";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
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

const Post = ({ post, setCurrentId }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => dispatch(deletePost(post._id));

    const handleMouseEnter = () => {

    }

    const handleMouseLeave = () => {
        
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
        >
            <CardActionArea onMouseEnter={handleMouseEnter} onMouseOut={handleMouseLeave}>
                <CardMedia 
                    sx={{
                        height: 0,
                        paddingTop: '56.25%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        backgroundBlendMode: 'darken',
                    }}
                    image={post.selectedFile} 
                    title={post.title}
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
                <Typography variant="h6">{post.creator}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </Box>
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
                    onClick={() => setCurrentId(post._id)}>
                    <MoreHorizIcon fontSize="medium" />
                </Button>
            </Box>
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
                <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}>
                    <ThumbUpAltIcon fontSize="small"/>
                    &nbsp; Like &nbsp;
                    {post.likeCount}
                </Button>
                <Button size="small" color="primary" onClick={handleClickOpen}>
                    <DeleteIcon fontSize="small"/>
                    Delete
                </Button>
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
                        <Button onClick={handleDelete} autoFocus>
                        Yes
                    </Button>
                    </DialogActions>
                </Dialog>
            </CardActions>
        </Card>
    );
}

export default Post;