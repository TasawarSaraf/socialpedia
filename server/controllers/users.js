import User from "../models/User.js";



/*READ */

export const getUser = async(req,res) =>{
    try{
        const {id} = req.params
        const user = await User.findById(id);
        // if we find the user then we send all the info of the user in json format to the front end
        res.status(200).json(user);
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
}

/*READ */
export const getUserFriends = async(req,res) =>{
    try{
        const {id} = req.params;
        const user = await User.findById(id);

        /* now once we the user we check the users friends list by mapping it 
           and getting all the friends based on their ID use Promise.all because we are making
          multiple API calls and saving in the friends variable which is a list of friends */
        const friends = await Promise.all(
            user.friends.map((id)=>User.findById(id))
        )

        const formattedFriends = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath}) =>{
                return {_id, firstName, lastName, occupation, location, picturePath};
            }
        )

        res.status(200).json(formattedFriends);
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
}



/*UPDATE*/
export const addRemoveFriend = async(req,res)=>{
    try{
        const {id, friendId} = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        // this is if the friend is already added
        if(user.friends.includes(friendId)){
            // we remove both from user friends list 
            // we also remove from the "friend" friend list
            user.friends = user.friends.filter((id)=>id !== friendId);
            friend.friends = friend.friends.filter((id)=> id!== id);
        }
        // this is when the friend isn't in ur list
        else{
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        // save our changes
        await user.save();
        await friend.save();


        /* now once we the user we check the users friends list by mapping it 
           and getting all the friends based on their ID use Promise.all because we are making
          multiple API calls and saving in the friends variable which is a list of friends */
          const friends = await Promise.all(
            user.friends.map((id)=>User.findById(id))
        )

        const formattedFriends = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath}) =>{
                return {_id, firstName, lastName, occupation, location, picturePath};
            }
        )

        res.status(200).json(formattedFriends);

    }

    catch(err){
        res.status(404).json({message: err.message});
    }
}
