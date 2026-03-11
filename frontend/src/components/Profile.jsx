import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import useGetProfile from "../hooks/useGetProfile";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { getRefresh } from "../redux/tweetslice";
import { followingUpdate, getUser } from "../redux/userslice";
import Tweet from "./Tweet";
import store from "../redux/store";

export default function Profile() {

    // "useSelector" ka use hota hai jab bhe redux sa kuch data lekar ana hota hai.
    // console.log("ye simple user hai ", user)
    // console.log("Profile wali id", user?._id);
    // console.log(profile)

    const { id } = useParams();
    useGetProfile(id);
    const { profile, user } = useSelector(store => store.user)
    const dispatch = useDispatch();
    const { tweets } = useSelector(store => store.tweet);
    const navigate = useNavigate();

    const editprofileHandler = () => {
        navigate("/edit-profile")
    }

    const userTweets = tweets?.filter(
        (tweet) => tweet?.owner?._id === profile?._id
    );


    const followUnfollowHandler = async () => {
        if (user.following.includes(id)) {
            // unfollow
            try {
                const res = await axios.put(`${USER_API_END_POINT}/unfollow/${id}`, {}, {
                    withCredentials: true
                })

                console.log(res);
                if (res?.data?.success) {
                    toast.success(res?.data?.data)
                    dispatch(followingUpdate(id));
                }
                dispatch(getRefresh());

            } catch (error) {
                console.log(error);
            }
        }
        else {
            // follow
            try {
                const res = await axios.put(`${USER_API_END_POINT}/follow/${id}`, {}, {
                    withCredentials: true
                })

                console.log(res);
                if (res?.data?.success) {
                    toast.success(res?.data?.data)
                    dispatch(followingUpdate(id));
                    // dispatch(getRefresh());
                }
                // ye disptach sirf es liya kara hai ku ke we want update in real time so jasia he follow kara to tweets donbara aya gaa 
                dispatch(getRefresh());

            } catch (error) {
                console.log(error);
            }
        }
    }


    return (
        <div className="w-full md:w-[60%] lg:w-[50%] mx-auto min-h-screen border-x border-slate-200">

            {/* Header */}
            <div className="flex items-center p-3">
                <Link
                    to="/"
                    className="cursor-pointer p-2 rounded-full hover:bg-gray-100">
                    <IoArrowBack size="24px" />
                </Link>
                <div className="ml-4">
                    <h1 className="font-semibold text-xl md:text-2xl">{profile?.name}</h1>
                    <p className="text-sm text-gray-500 font-extralight">{userTweets?.length} posts</p>
                </div>
            </div>

            {/* Banner */}
            <div className="relative">
                <img
                    className="w-full h-40 md:h-52 object-cover"
                    src="https://i.pinimg.com/736x/6e/96/44/6e9644355fcff74a314295fcf4a8ef08.jpg"
                    alt="banner"
                />

                {/* Avatar */}
                <div className="absolute -bottom-16 left-4 border-4 border-white rounded-full">
                    <Avatar
                        src="https://pbs.twimg.com/profile_images/2017324742873927680/hu4RBkpr_400x400.jpg"
                        size="120"
                        round={true}
                    />
                </div>
            </div>

            {/* Edit Button */}
            <div className="flex justify-end mt-6 px-4">
                {user?._id === profile?._id ? <button 
                onClick={editprofileHandler}
                className="px-4 py-1 border border-gray-300 text-gray-800 font-semibold rounded-full hover:bg-gray-100 ">
                    Edit Profile
                </button> : <button
                    onClick={followUnfollowHandler}
                    className={user.following.includes(id) ? `px-5 py-1 border border-slate-500 text-gray-800 font-semibold rounded-full hover:bg-gray-100` : `px-5 py-1 bg-black text-white font-light rounded-full hover:scale-105 transition-all duration-100`}>
                    {user.following.includes(id) ? "Following" : "Follow"}
                </button>}
            </div>

            {/* User Info */}
            <div className="px-4 mt-4">
                <h1 className="font-bold text-lg md:text-xl">{profile?.name}</h1>
                <p className="font-extralight text-gray-600">{`@${profile?.username}`}</p>
            </div>
            <div className="m-4 text-sm  font-light">
                {profile?.bio}
            </div>

            <div className="px-4 mt-10 font-semibold text-xl border-b">
                {userTweets?.length} Posts
            </div>

            {userTweets?.map((tweet) => (
                <Tweet key={tweet?._id} tweet={tweet} />
            ))}

        </div>
    );
}

