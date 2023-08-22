import { OAuth2Client, UserRefreshClient } from "google-auth-library";
import 'dotenv/config';

const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'postmessage',
);

export const verifyIdToken = async (req, res) => {
    const jwtToken = req.body;
    // console.log(jwtToken);
    try {
        const payload = await verify(jwtToken.credential);
        res.status(200).json(payload);
    } catch (error) {
        console.log(error);
    }
};

async function verify(idToken) {
    const ticket = await oAuth2Client.verifyIdToken({
        idToken: idToken,
        audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    // console.log(payload);
    return payload;
}

export const getTokens = async (req, res) => {
    try {
        const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens
        // console.log(tokens);
        res.status(200).json(tokens);
    } catch (error) {
        console.log(error);
    }
};

export const getUserInfo = async (req, res) => {
    try {
        const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens
        // console.log(tokens);
        const payload = await verify(tokens.id_token);
        payload['id_token'] = tokens.id_token;
        // console.log(payload);
        res.status(200).json(payload);
    } catch (error) {
        console.log(error);
    }
}

export const refreshToken = async (req, res) => {
    try {
        const user = new UserRefreshClient(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            req.body.refreshToken,
        );
        const { credentials } = await user.refreshAccessToken(); // optain new tokens
        res.status(200).json(credentials);
    } catch (error) {
        console.log(error);
    }
};