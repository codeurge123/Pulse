import React, { useState } from "react";
import Avatar from "react-avatar";
import { FiImage } from "react-icons/fi";
import logo from '../assests/logo.png'
import toast from "react-hot-toast";
import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import { Link, useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {  getIsActive, getRefresh } from "../redux/tweetslice";
import store from "../redux/store";

export default function CreatePost() {

    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();



    const submitPost = async () => {

        setLoading(true)

        if (!description.trim()) {
            toast.error("Please give some description")
            setLoading(false)
            return
        }

        try {
            const res = await axios.post(`${TWEET_API_END_POINT}/create`, { description },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                },
            )
            dispatch(getRefresh());
            if (res.data.success) {
                toast.success("Post created successfully")
                setDescription("")
            }
            else {
                toast.error(res?.message || "Failed to create post");
            }

        } catch (error) {
            // toast.error(error)
            console.log(error)
        }
        finally {
            setLoading(false)
        }


    }

    const forYouHandler = () => {
        dispatch(getIsActive(true));
        dispatch(getRefresh());
    }

    const followingHandler = () => {
        dispatch(getIsActive(false));
        dispatch(getRefresh());

    }

    const { isActive } = useSelector((store) => (store.tweet));


    return (
        <div className="w-[100%]">
            {/* follow and following tab */}
            <div>
                <div className="flex items-center justify-between border-b border-gray-200">
                    <div
                        onClick={forYouHandler}
                        className= {isActive ? `cursor-pointer hover:bg-gray-200 border-b-4 border-blue-500 w-full text-center px-4 py-3` : `cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}>
                        <h1 className="font-semibold text-gray-600 text-lg">For you</h1>
                    </div>
                    <div
                        onClick={followingHandler}
                        className={isActive ? `cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3` : `cursor-pointer hover:bg-gray-200 border-b-4 border-blue-500 w-full text-center px-4 py-3`}>
                        <h1 className="font-semibold text-gray-600 text-lg">Following</h1>
                    </div>
                </div>
            </div>
            {/* Input field */}
            <div className="">
                <div className="flex items-center p-4">
                    <div>
                        <Avatar src="https://pbs.twimg.com/profile_images/2017324742873927680/hu4RBkpr_400x400.jpg" size="40" round={true} />
                    </div>
                    <input
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="w-full outline-none border-none text-lg ml-4" type="text" placeholder="Write Something New ?!" />
                    <div className="mr-4">
                        <FiImage size="18px" />
                    </div>
                </div>
                <div className="flex items-center justify-between p-4 border-b-2 border-gray-200">
                    <div className="rounded-full">
                        <Link to="/pulse-ai">
                            <button>
                                <img width={35} src={logo} alt="pulseai" />
                            </button>
                        </Link>
                    </div>
                    <button
                        onClick={submitPost}
                        className="bg-[#1D9BF0] hover:bg-[#0591fc] cursor-pointer text-lg border-none text-white rounded-full px-4 py-1">{loading ? "Creating ..." : "Post"}</button>
                </div>
            </div>
        </div>
    )
}