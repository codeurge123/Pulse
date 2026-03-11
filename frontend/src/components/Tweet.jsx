import axios from "axios";
import React, { useState } from "react";
import Avatar from "react-avatar";
import { FaRegComment, FaS } from "react-icons/fa6";
import { FiHeart } from "react-icons/fi";
import { FiBookmark } from "react-icons/fi";
import { AiTwotoneDelete } from "react-icons/ai";
import { TWEET_API_END_POINT, USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getRefresh } from "../redux/tweetslice";
import { Link } from "react-router";
import store from "../redux/store";


export default function Tweet({ tweet }) {

    // console.log(tweet.owner);

    const {user} = useSelector(store => store.user);

    const dispatch = useDispatch();

    // to get delete option only on those tweet which is created by the current user
    const deleteOption = tweet?.owner?._id === user?._id

    const likeDislikeHandler = async (id) => {
        try {
            const res = await axios.put(`${TWEET_API_END_POINT}/like/${id}`, {}, {
                withCredentials: true
            })
            dispatch(getRefresh());
            // console.log(res)
            if (res.data.success) {
                toast.success(res?.data?.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const saveUnsaveHandler = async (id) => {
        try {
            // yhi syntax hota hai 'axios' ka ke humko phala api call then req.body wala object then header/credentials wala object dena hota hai.
            const res = await axios.put(`${TWEET_API_END_POINT}/bookmarks/${id}`, {}, {
                withCredentials: true
            })
            dispatch(getRefresh());
            if (res?.data?.success) {
                toast.success(res?.data?.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const timeAgo = (timestamp) => {
        const diff = Date.now() - new Date(timestamp);

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (seconds < 60) return `${seconds}s`;
        if (minutes < 60) return `${minutes}m`;
        if (hours < 24) return `${hours}h`;
        return `${days}d`;
    };

    const deleteHandler = async (id) => {
        try {
            const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`,{
                withCredentials: true
            })
            console.log(res);
            dispatch(getRefresh());
            if(res?.data?.success) {
                toast.success(res?.data?.data);
            }
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div className="border-b">
            <div>
                <div className="flex p-4">
                    <Avatar src="https://pbs.twimg.com/profile_images/2017324742873927680/hu4RBkpr_400x400.jpg" size="40" round={true} />
                    <div className="ml-2 w-full">
                        <div className="flex items-center ">
                            <Link to={`/profile/${tweet?.owner?._id}`}>
                                <h1 className="font-semibold hover:underline">{tweet?.owner?.name}</h1>
                            </Link>
                            <p className="text-gray-500 text-sm ml-2">@{tweet?.owner?.username} . {timeAgo(tweet?.createdAt)}</p>
                        </div>
                        <div>
                            <p>{tweet?.description}</p>
                        </div>
                        <div className="flex justify-between my-3">
                            <div className="cursor-pointer items-center flex">
                                <div className="p-2 hover:bg-green-200 rounded-full">
                                    <FaRegComment size="20px" />
                                </div>
                                <p>0</p>
                            </div>
                            <div
                                className="cursor-pointer items-center flex">
                                <div
                                    onClick={() => likeDislikeHandler(tweet?._id)}
                                    className="p-2 hover:bg-red-200 rounded-full">
                                    <FiHeart size="20px" />
                                </div>
                                <p>{tweet?.like?.length}</p>
                            </div>
                            <div className="cursor-pointer items-center flex">
                                <div
                                    onClick={() => saveUnsaveHandler(tweet?._id)}
                                    className="p-2 hover:bg-yellow-200 rounded-full">
                                    <FiBookmark size="20px" />
                                </div>
                                <p>{tweet?.bookmark?.length}</p>
                            </div>
                            {deleteOption ? <div className="cursor-pointer items-center flex">
                                <div
                                    onClick={() => deleteHandler(tweet?._id)}
                                    className="p-2 hover:bg-red-300 rounded-full">
                                    <AiTwotoneDelete size="20px" />
                                </div>
                            </div> : ""}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}