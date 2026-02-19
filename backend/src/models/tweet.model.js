import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    like: {
       type: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
       ],
       default: []
    },
    bookmark: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        default: []
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" 
    }
},
    {
        timestamps: true
    })


const Tweet = mongoose.model("Tweet", tweetSchema)