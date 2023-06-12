import express from "express";
import {getUser, getUserFriends, addRemoveFriend} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";


const router = express.Router();

/*READ*/

// we can grab the users id and display their page
// query strings
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);


/*UPDATE*/

// we would need the friendsId to determine whether to remove or add them
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);


export default router;
