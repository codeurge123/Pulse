import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
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
        timestamps: true,
    })

// pre is a type of middleware
// middleware hai to next pass karna he karna padhaa gaa
userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);

    next();

})

userSchema.methods.isPasswordCorrect = async function (password) {

    return await bcrypt.compare(password, this.password)

}


// now generating token : 
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        // 1. payload
        // 2. access token secert 
        // 3. expiry of access token

        {
            _id: this._id,
            email: this.email,
            username: this.username,
            name: this.name
        },
        process.env.ACCESS_TOKEN_SECRET
        ,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }

    )
}

// refreshtoken mein kaam info hoti hai : b/c ye sirf login check kara ta hai
userSchema.methods.generateRefreshToken = function () {

    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: REFRESH_TOKEN_EXPIRY,
        }
    )
}


export const User = mongoose.model("User", userSchema);