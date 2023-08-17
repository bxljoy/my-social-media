import axios from 'axios';

const url = 'http://localhost:4000/posts';

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (updatedPost, id) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);

const urlAuth = 'http://localhost:4000/auth';

export const verifyJwtToken = (jwtToken) => axios.post(urlAuth, jwtToken);
export const getTokens = (accessToken) => axios.post(`${urlAuth}/get-token`, accessToken);
export const refreshToken = (refreshToken) => axios.post(`${urlAuth}/refresh-token`, refreshToken);
export const getUserInfo = (accessToken) => axios.post(`${urlAuth}/get-userinfo`, accessToken);