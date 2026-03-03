import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Tweet } from "../models/tweet.model.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

const createTweet = asyncHandler(async (req, res) => {
    // get tweet description from the frontend 
    // get user who writes the tweets from the frontend

    const { description } = req.body;

    if (!description) {
        throw new ApiError(401, "Description field is required");
    }

    await Tweet.create({
        description,
        owner: req.user._id
    })

    return res.status(201).json(
        new ApiResponse(201, "Tweet created successfully")
    )


})

const deleteTweet = asyncHandler(async (req, res) => {
    // req.params se humm post ke id laa raha ho ga
    const { id } = req.params

    await Tweet.findByIdAndDelete(id);

    return res.status(200).json(
        new ApiResponse(200, "Tweet deleted Successfully")
    )

})

const likeDislike = asyncHandler(async (req, res) => {
    const loggedInUserId = req.user._id;
    const tweetId = req.params.id;
    const tweet = await Tweet.findById(tweetId);

    // checking if user already liked the tweet or not
    if (tweet.like.includes(loggedInUserId)) {
        // dislike 
        await Tweet.findByIdAndUpdate(
            tweetId,
            {
                $pull: {
                    like: loggedInUserId,
                }
            },
        )
        return res.status(200).json(
            new ApiResponse(200, "User dislike your tweet")
        )
    }
    else {
        // like 
        await Tweet.findByIdAndUpdate(
            tweetId,
            {
                $push: {
                    like: loggedInUserId
                }
            }
        )
        return res.status(200).json(
            new ApiResponse(200, "User like your tweet")
        )
    }

})


export { createTweet, deleteTweet, likeDislike }
