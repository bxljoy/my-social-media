import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@mui/material";

const Posts = ({setCurrentId}) => {
    const { posts, isLoading } = useSelector((state) => state.postsReducer);

    if (!posts?.length && !isLoading) return 'No posts';
    return (
        isLoading ? <CircularProgress size="7em" /> : (
            <Grid container alignItems="stretch" spacing={3} justifyContent="center">
                {
                    posts.map(post => (
                        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3} >
                            <Post post={post} setCurrentId={setCurrentId} />
                        </Grid>
                    ))
                }
            </Grid>
        )
    );
}

export default Posts;