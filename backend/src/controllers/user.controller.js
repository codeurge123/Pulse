import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

import { User } from "../models/user.model";

const RegisterUser = asyncHandler( async (req,res) => {
    // get user details from the frontend
    // validate is the information given
    // check for user already exist or not
    // check for image is there or not 
    // if there are image then store them on cloudinary
    // storing user info in db 
    // return the response


    const {name, email,username,password } = req.body;

    if(
        [name,email,username,password].some(field => field?.trim() === "") 
    ) {
        throw new ApiError(401,"All field are required");
    }

    const user = await User.findOne({
        $or: [{ email }, { username }]
    })

    if(user) {
        throw new ApiError(400,"User Already exist !!")
    }
    
    


    

})