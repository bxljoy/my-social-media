import React from "react";
import Post from "./Post/Post";
import postsStyles from './styles';

const Posts = () => {
    const classes = postsStyles() 
    return (
        <>
            <h1>POSTS</h1>
            <Post />
            <Post />
        </>
    );
}

export default Posts;