import User from "../model/user";
import {comparePassword,hashPassword} from "../utils/auth";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        // validation
        if(!name) return res.status(400).send("Name is required.");
        if(!password || password.length < 6) return res.status(400).send("Password should be of min 6 char long.");
        let userExist = await User.findOne({email}).exec();
        if(userExist) return res.status(400).send("Email already exist.");

        // hash password
        const hashedPassword = await hashPassword(password);

        // create a user
        const user = new User({
            name, email, password: hashedPassword
        }); 
        //saving user at database
        await user.save();
        // console.log("this is user", user);

        return res.json({
            status: 200,
            message: "User registered successfully! Please login"
        })
    } catch (err) {
        return res.status(400).send("Error.Try Again!")
    }
}

/**
 * server
 *  to login user we need to check if user password is correct
 * take user's password, hash it then compare with the hashed password saved
 * then generate json web token/jwt and send to client
 * this will be used to access protected routes
 * 
 * npm i jsonwebtoken
 */
export const login  = async (req, res) => {
    try {
        // console.log(req.body);
        const {email, password} = req.body;
        // check email in db
        const user = await User.findOne({email}).exec();
        if(!user) return res.status(400).send("No user with this email!");
        // compare password
        const match = await comparePassword(password, user.password);
        // create signed jwt
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});

        user.password = undefined;
        //send token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            // secure: true // works for https, which wil be for production
        })
        // send user as response
        res.json(user);
    } catch (error) {
        console.log(error);
        return res.status(400).send("Error. Try Again!");
    }
}