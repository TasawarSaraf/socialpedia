import {createSlice} from "@reduxjs/toolkit";

/*
    This imports the createSlice function from the @reduxjs/toolkit package. The createSlice 
    function is a utility provided by Redux Toolkit that simplifies the process of creating Redux slices.

*/


/*

    This declares the initial state for the Redux slice. It defines an object with properties 
    such as mode, user, token, and posts, which represent different parts of the application state.

*/
const intiialState = {
    mode: "initial",
    user: null,
    token: null,
    posts: []
}


/*

    The createSlice function is called to create a new Redux slice. It takes an object as an argument with the following properties:
name: A string that represents the name of the slice. It is used to generate action types and action creators automatically.
initialState: The initial state of the slice, which was defined earlier.
reducers: An object containing reducer functions. These reducer functions define how the state should be updated in response to different actions.

*/



/**
 * The reducers object within createSlice defines various reducer functions, such as setMode, setLogin, setLogout, setFriends, setPosts, and setPost. Each reducer function receives the current state and an action object as parameters and defines how the state should be updated based on the action.
For example, setMode toggles the mode property between "light" and "dark".
setLogin updates the user and token properties based on the payload received in the action.
setLogout sets the user and token properties to null.
Similarly, other reducer functions update the state based on the provided payload.
 * 
 * 
 */

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setMode: (state) =>{
            state.mode = state.mode === light ? "dark" : "light";
        },

        setLogin: (state, action) =>{
            // just parameters
            state.user = action.payload.user;
            state.token = action.payload.token;
        },

        setLogout: (state) =>{
            state.user = null,
            state.token = null
        },

        setFriends: (state, action) =>{
            if (state.user){
                state.user.friends = action.payload.friends;
            } else{
                console.error("You got no friends haha.");
            }
        },

        setPosts:(state, action)=>{
            state.posts = action.payload.posts;
        },

        setPost: (state, action)=>{
           const updatedPosts = state.posts.map((post)=>{
               if(post._id === action.payload.post_id){
                   return action.payload.post;
               }
               else{
                   return post;
               }
           })

           state.posts = updatedPosts;
        }
    },

})

export const {setMode, setFriends, setLogin, setLogout, setPosts, setPost} = authSlice.actions

export default authSlice.reducers;