import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

import { User } from "../models/user.model";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const RegisterUser = asyncHandler(async (req, res) => {
    // get user details from the frontend
    // validate the information given to
    // check for user already exist or not
    // check for image is there or not 
    // if there are image then store them on cloudinary
    // create the user and storing user info in db 
    // return the response


    const { name, email, username, password } = req.body;

    if (
        [name, email, username, password].some(field => field?.trim() === "")
    ) {
        throw new ApiError(401, "All field are required");
    }

    const existedUser = await User.findOne({
        $or: [{ email }, { username }]
    })

    if (existedUser) {
        throw new ApiError(400, "User Already exist !!")
    }

    const avatarLocalPath = req.file?.avatar[0]?.path;

    const coverImageLocalPath = req.file?.coverImage[0]?.path || "";

    if (!avatarLocalPath) {
        throw new ApiError(401, "Avatar is required");
    }


    const avatar = uploadOnCloudinary(avatarLocalPath);

    const coverImage = uploadOnCloudinary(coverImageLocalPath);

    if (!avatar) {
        throw new ApiError(402, "Error while uploading on cloudinary !!");
    }


    const user = await User.create({
        name,
        email,
        username: username.toLowerCase(),
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || ""
    })


    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Somehting went wrong while registering the user")
    }

    return res.status(200).json(
        new ApiResponse(200,createdUser,"User Registered Successfully")
    )

})