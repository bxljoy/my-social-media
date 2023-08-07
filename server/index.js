import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import postRoutes from './routes/posts.js';
import googleAuthRoutes from './routes/googleAuth.js';
import 'dotenv/config';


const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/auth', googleAuthRoutes);

const url1 = "mongodb+srv://";
const url2 = "@cluster0.djq235y.mongodb.net/";
const url3 = "?retryWrites=true&w=majority";
const userPassword = process.env.MONGODB_ATLAS_USER + ":" + process.env.MONGODB_ATLAS_PASSWORD;
const mongodbName = process.env.MONGODB_NAME;
const url = url1 + userPassword + url2 + mongodbName + url3;
// const url = url1 + userPassword + url2 + url3;
const PORT = process.env.PORT || 2000;
mongoose.connect(url)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));