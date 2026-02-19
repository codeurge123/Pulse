import mongoose from "mongoose";

const userSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    followers: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        default: 0
    },
    following: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        default: 0
    },
    avatar: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
    }
},
{
    timestamps : true,
})


export const User = mongoose.model("User", userSchema);