import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";


/*REGISTER USER */

export const register = async(req,res)=>{
    try{
        // get values from the front end , generate salt to add to the hash , to fully encrypt password
        const [firstName, lastName, email, password, picturePath, friends, location, occupation] = req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password,salt);
        // create new user and save it to the database
        const newUser = new User({
            firstName, lastName, email, passwordHash, picturePath, friends, location, occupation, viewedProfile: Math.floor(Math.random() * 1000), impression: Math.floor(Math.random() * 1000)
        });

        const saveUser = await newUser.save();
        // send the status code that the user was created and send it to the front-end for it to use in json format
        res.status(201).json(saveUser);
    }
    catch(err){
        // if failed
        res.status(500).json({error: err.message});
    }
}


/*LOGIN*/

export const login = async(req,res)=>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email: email});
        if(!user){
            res.status(400).json({message:"User ddid not exist"});
        }
        // it will use the same salt to compare if it turned out to be the same hash
        const matched = await bcrypt.compare(password, user.password);
        if(!matched){
            res.status(400).json({message: "Invalid credentials"});
        }
        // when logged in we are given a token to use when signing in
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        // Remove the password field from the user object before sending the response
        delete user.password;
          // Send a 200 response with the token and user object
        res.status(200).json({token, user});
    }
    catch(err){
        res.status(500).json({error: err.message});
    }

}