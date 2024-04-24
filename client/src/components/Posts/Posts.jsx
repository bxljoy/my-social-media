import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { Grid, Skeleton } from "@mui/material";

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.postsReducer);

  if (!posts?.length && !isLoading) return "No posts";
  return isLoading ? (
    <Grid container justifyContent="center" alignItems="center" spacing={8}>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <Grid key={i} item>
          <Skeleton variant="rectangular" width={210} height={118} />
          <Skeleton width="100%" />
          <Skeleton width="60%" />
          <Skeleton width="100%" />
          <Skeleton variant="rectangular" width={210} height={118} />
        </Grid>
      ))}
    </Grid>
  ) : (
    <Grid container alignItems="stretch" spacing={3} justifyContent="center">
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
