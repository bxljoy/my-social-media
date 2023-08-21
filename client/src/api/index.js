import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:4000' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

// posts apis
export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (updatedPost, id) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

// googleAuth apis
export const verifyJwtToken = (jwtToken) => API.post('/auth/verify-idToken', jwtToken);
export const getTokens = (accessToken) => API.post('/auth/get-token', accessToken);
export const refreshToken = (refreshToken) => API.post('/auth/refresh-token', refreshToken);
export const getUserInfo = (accessToken) => API.post('/auth/get-userinfo', accessToken);

// user apis
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);