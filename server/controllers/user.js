import User from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const secret = 'testKey';

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const exsitingUser = await User.findOne({ email });

        if(!exsitingUser)
            return res.status(404).json({ message: "User doesn't exsit!" });

        const isPasswordCorrect = await bcrypt.compare(password, exsitingUser.password);

        if(!isPasswordCorrect)
            return res.status(400).json({ message: "Invalid Credential." });
        
        const token = jwt.sign({ email: exsitingUser.email, id: exsitingUser._id }, secret, { expiresIn: 60});
        res.status(200).json({ result: exsitingUser, token});
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

export const signup = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    try {
        const exsitingUser = await User.findOne({ email });

        if(exsitingUser)
            return res.status(400).json({ message: "User already exsits!" });

        if(password !== confirmPassword)
            return res.status(400).json({ message: "Passwords don't match!" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

        const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h"});

        res.status(200).json({ result, token});
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};