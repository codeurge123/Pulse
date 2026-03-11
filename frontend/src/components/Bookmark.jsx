import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import { getRefresh } from "../redux/tweetslice";
import toast from "react-hot-toast";
import Avatar from "react-avatar";
import { FaRegComment } from "react-icons/fa6";
import { FiHeart, FiBookmark } from "react-icons/fi";
import { MdBookmarks } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";
import { Link } from "react-router";

export default function Bookmark() {

    const { user } = useSelector((store) => store.user);
    const { tweets } = useSelector((store) => store.tweet);
    const dispatch = useDispatch();

    // Safe filtering
    const bookmarkedTweets = tweets?.filter((tweet) =>
        tweet?.bookmark?.includes(user?._id)
    ) || [];

    const likeDislikeHandler = async (id) => {
        try {
            const res = await axios.put(
                `${TWEET_API_END_POINT}/like/${id}`,
                {},
                { withCredentials: true }
            );

            dispatch(getRefresh());

            if (res?.data?.success) {
                toast.success(res?.data?.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const saveUnsaveHandler = async (id) => {
        try {
            const res = await axios.put(
                `${TWEET_API_END_POINT}/bookmarks/${id}`,
                {},
                { withCredentials: true }
            );

            dispatch(getRefresh());

            if (res?.data?.success) {
                toast.success(res?.data?.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteHandler = async (id) => {
        try {
            const res = await axios.delete(
                `${TWEET_API_END_POINT}/delete/${id}`,
                { withCredentials: true }
            );

            dispatch(getRefresh());

            if (res?.data?.success) {
                toast.success(res?.data?.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

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

    return (
        <div className="w-[52%] min-h-screen border-r-2 border-l-2 border-slate-200 relative left-80">

            <div className="p-4 border-b border-slate-200">
                <h1 className="text-xl font-semibold flex items-center gap-2">
                    <Link
                        to="/"
                        className="cursor-pointer p-2 rounded-full hover:bg-gray-100">
                        <IoArrowBack size="24px" />
                    </Link>
                    <MdBookmarks size="24px" /> Bookmarks
                </h1>
            </div>

            <div>
                {bookmarkedTweets.length === 0 ? (
                    <p className="text-center text-gray-500 mt-6">
                        No bookmarks yet
                    </p>
                ) : (
                    bookmarkedTweets.map((tweet) => (
                        <div key={tweet?._id} className="border-b my-2">
                            <div className="flex p-4">

                                <Avatar
                                    src="https://pbs.twimg.com/profile_images/2017324742873927680/hu4RBkpr_400x400.jpg"
                                    size="40"
                                    round={true}
                                />

                                <div className="ml-2 w-full">

                                    <div className="flex items-center">
                                        <Link to={`/profile/${tweet?.owner?._id}`}>
                                            <h1 className="font-semibold hover:underline">{tweet?.owner?.name}</h1>
                                        </Link>

                                        <p className="text-gray-500 text-sm ml-2">
                                            @{tweet?.owner?.username} · {timeAgo(tweet?.createdAt)}
                                        </p>
                                    </div>

                                    <p>{tweet?.description}</p>

                                    <div className="flex justify-between my-3">

                                        <div className="cursor-pointer items-center flex">
                                            <div className="p-2 hover:bg-green-200 rounded-full">
                                                <FaRegComment size="20px" />
                                            </div>
                                            <p>0</p>
                                        </div>

                                        <div className="cursor-pointer items-center flex">
                                            <div
                                                onClick={() => likeDislikeHandler(tweet?._id)}
                                                className="p-2 hover:bg-red-200 rounded-full"
                                            >
                                                <FiHeart size="20px" />
                                            </div>
                                            <p>{tweet?.like?.length}</p>
                                        </div>

                                        <div className="cursor-pointer items-center flex">
                                            <div
                                                onClick={() => saveUnsaveHandler(tweet?._id)}
                                                className="p-2 hover:bg-yellow-200 rounded-full"
                                            >
                                                <FiBookmark size="20px" />
                                            </div>
                                            <p>{tweet?.bookmark?.length}</p>
                                        </div>

                                        {tweet?.owner?._id === user?._id && (
                                            <div className="cursor-pointer items-center flex">
                                                <div
                                                    onClick={() => deleteHandler(tweet?._id)}
                                                    className="p-2 hover:bg-red-300 rounded-full"
                                                >
                                                    <AiTwotoneDelete size="20px" />
                                                </div>
                                            </div>
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}