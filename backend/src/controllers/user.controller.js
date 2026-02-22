import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const generatteAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false }); 

        return { accessToken, refreshToken }

    }
    catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh token")
    }
}

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

    const avatarLocalPath = req.files?.avatar[0]?.path;

    console.log(avatarLocalPath);

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path;
    }

    if (!avatarLocalPath) {
        throw new ApiError(401, "Avatar is required");
    }


    const avatar = await uploadOnCloudinary(avatarLocalPath);

    console.log(avatar);

    if (!avatar) {
        throw new ApiError(500, "Error while uploading on cloudinary !!");
    }


    let coverImage;
    if (coverImageLocalPath) {
        coverImage = await uploadOnCloudinary(coverImageLocalPath);
    }


    const user = await User.create({
        name,
        email,
        username: username.toLowerCase(),
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
    })


    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Somehting went wrong while registering the user")
    }

    return res.status(200).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    )

})


// login user : 
const loginUser = asyncHandler(async (req, res) => {
    // get user detail from frontend 
    // check if details aree given 
    // check if user is registered or not 
    // generate refresh and access token corresponding to the user 
    // assign cookies to the user 
    // return the res


    const { username, email, password } = req.body

    if(!(username && email)) {
        throw new ApiError(401,"Username or email is required");
    }

    const user = await User.findOne({
       $or: [{ email }, { username }]
    })

    if(!user) {
        throw new ApiError(402,"User is not Registered")
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    const { accessToken, refreshToken } = await generatteAccessAndRefreshToken(user._id)


    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )


    const options = {
        httpOnly: true,
        secure: true
    }


    return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options).json(
        new ApiResponse(200, {
            loggedInUser,
            accessToken,
            refreshToken
        },"User LoggedIn Successfully")
    );

})


// logout user : 
const logoutUser = asyncHandler(async (req,res) => {
    // first clear the refresh token
    // then clear the cookies
    console.log("inside logout user")
    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        },
    );


    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options).json(
        new ApiResponse(200, user, "User Successfully logged out")
    )

});





export { RegisterUser, loginUser, logoutUser }