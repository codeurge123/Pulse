import React from "react";
import { useSelector } from "react-redux";
import store from "../redux/store";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import Avatar from "react-avatar";
import { FaUserPlus } from "react-icons/fa6";

const Follow = () => {

    const { user, otherUsers } = useSelector(store => store.user);

    const shouldFollow = otherUsers?.filter((o) => (
        !user?.following.includes(o?._id)
    ));

    return (
        <div className="w-[55%] min-h-screen border-x border-gray-200 relative left-80 bg-white">

            {/* Header */}
            <div className="flex items-center gap-4 p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                <Link
                    to="/"
                    className="p-2 rounded-full hover:bg-gray-100 transition"
                >
                    <IoArrowBack size="22px" />
                </Link>

                <div className="flex items-center gap-2">
                    <FaUserPlus size="22px" />
                    <h1 className="text-xl font-bold">Who to Follow</h1>
                </div>
            </div>

            {/* Subtitle */}
            <div className="px-5 py-4 text-gray-500 text-sm font-medium">
                People you may know
            </div>

            {/* Users */}
            <div className="px-3">
                {
                    shouldFollow?.map((item) => (
                        <div
                            key={item?._id}
                            className="flex items-center justify-between p-3 mb-3 rounded-xl hover:bg-gray-100 transition cursor-pointer"
                        >

                            {/* Left Side */}
                            <div className="flex items-center gap-3">
                                <Avatar
                                    src="https://pbs.twimg.com/profile_images/2017324742873927680/hu4RBkpr_400x400.jpg"
                                    size="45"
                                    round={true}
                                />

                                <div>
                                    <h1 className="font-semibold text-gray-900">
                                        {item?.name}
                                    </h1>

                                    <p className="text-sm text-gray-500">
                                        @{item?.username}
                                    </p>
                                </div>
                            </div>

                            {/* Button */}
                            <Link to={`/profile/${item?._id}`}>
                                <button className="px-4 py-1.5 bg-black text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-all hover:scale-105 duration-100">
                                    View Profile
                                </button>
                            </Link>

                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default Follow