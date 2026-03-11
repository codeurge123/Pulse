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
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
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
    // ye tarika shi nhi hai -->. instead of this use populate()
    // userDetails: {
    //     type: Array,
    //     default: []
    // }
},
    {
        timestamps: true
    })


export const Tweet = mongoose.model("Tweet", tweetSchema)