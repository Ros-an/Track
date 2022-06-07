import User from "../model/user";
import {comparePassword,hashPassword} from "../utils/auth";


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
        console.log("this is user", user);

        return res.json({
            status: 200,
            message: "User registered successfully!"
        })
    } catch (err) {
        console.log("Error", err);
        return res.status(400).send("Error.Try Again!")
    }
}