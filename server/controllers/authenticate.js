import { OAuth2Client } from "google-auth-library";

export const verifyToken = async (req, res) => {
    const jwtToken = req.body;
    // console.log(jwtToken);
    try {
        const payload = await verify(jwtToken);
        res.status(200).json(payload);
    } catch (error) {
        console.log(error);
    }
};

async function verify(jwtToken) {
    const client = new OAuth2Client();
    const ticket = await client.verifyIdToken({
        idToken: jwtToken.credential,
        audience: jwtToken.clientId,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    // console.log(payload);
    return payload;
}