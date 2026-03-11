import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { MdEditDocument } from "react-icons/md";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import store from "../redux/store";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { getUser } from "../redux/userslice";
import toast from "react-hot-toast";
import { getRefresh } from "../redux/tweetslice";

const EditProfile = () => {

    const { user } = useSelector(store => store.user);

    const [name, setName] = useState(user?.name || "");
    const [bio, setBio] = useState(user?.bio || "");

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const updateHandler = async () => {
        try {
            const res = await axios.put(`${USER_API_END_POINT}/update-details`, { name, bio }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            })

            if (res?.data?.success) {
                toast.success(res?.data?.message);
                // dispatch(getUser(res?.data?.data?.user))
                // navigate(`/profile/${user?._id}`);
            }
            else {
                toast.error("Some error while updating the information")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="w-[52%] min-h-screen border-x border-gray-200 relative left-80 bg-white">

            {/* Header */}
            <div className="flex items-center gap-2 p-4 border-b border-gray-200 sticky top-0 bg-white z-10">

                <Link
                    to={`/profile/${user?._id}`}
                    className="p-2 rounded-full hover:bg-gray-100 transition"
                >
                    <IoArrowBack size="22px" />
                </Link>

                <div className="flex items-center gap-2">
                    <MdEditDocument size="24px" />
                    <h1 className="text-xl font-bold">Edit Profile</h1>
                </div>

            </div>

            <div className="max-w-xl mx-auto mt-10 bg-white border-gray-200 rounded-xl shadow-md p-6">

                <div className="flex flex-col items-center mb-6">
                    <Avatar
                        src="https://pbs.twimg.com/profile_images/2017324742873927680/hu4RBkpr_400x400.jpg"
                        size="80"
                        round
                    />

                    <p className="text-sm text-gray-500 mt-2">
                        Profile photo cannot be changed yet
                    </p>
                </div>

                <div className="mb-5">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Name
                    </label>

                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter your name"
                    />
                </div>

                <div className="mb-5">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Bio
                    </label>

                    <textarea
                        rows="3"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        placeholder="Tell people about yourself"
                    />

                    <div className="text-right text-xs text-gray-400 mt-1">
                        {bio.length}/160
                    </div>
                </div>

                <button
                    onClick={updateHandler}
                    className="w-full bg-[#1D9BF0] hover:bg-[#0d8ae5] text-white font-semibold py-2 rounded-full transition"
                >
                    Update Details
                </button>

            </div>

        </div>
    )
}

export default EditProfile