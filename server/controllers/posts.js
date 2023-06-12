import Post from "../models/Post.js";
import User from "../models/User.js";


/*CREATE*/

export const createPost = async(req,res)=>{
    try{
        const {userId, description, picturePath} = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName, 
            location: user.location, 
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []

        })

        await newPost.save();

        // Post.find() will send all the post on top of the newly updated post that we just added
        const posts = await Post.find();
        // and send to the front-end in a nicely formatted json
        res.status(201).json(posts);
    }

    catch(err){
        res.status(409).json({message: err.message});
    }
}

/*READ*/

export const getFeedPosts = async(req,res)=>{
    try{
        // returns all the post from all users
        const posts = await Post.find();
        res.status(200).json(posts);

    }
    catch(err){
        res.status(409).json({message: err.message});
    }
}

export const getUserPosts = async(req,res)=>{
    try{
        const {userId} = req.params;
        const post = await Post.find({userId});
        res.status(200).json(post);
    }
    catch(err){
        res.status(409).json({message: err.message});
    }
}


/*UPDATE*/

export const likePost = async(req,res) =>{
    try{
        const {id} = req.params; // post id
        const {userId} = req.body;
        const post  = await Post.findById(id);
        // get method because we are dealing with a map function
        // the value of the get method is a boolean whether they liked it or not
        const isLiked = post.likes.get(userId);
        
        if(isLiked){
            // delete the user who liked the post 
            // the key is the id so if u wanna
            // get rid of the whole element you have to delete key
            post.likes.delete(userId);
        }

        else{
            post.likes.set(userId, true);
        }

        const updatePost = await Post.findByIdAndUpdate(
            id,
            {likes: post.likes},
            {new : true}
        )

        res.status(200).json(updatePost);

    }
    catch(err){
        res.status(409).json({message: err.message});
    }
}