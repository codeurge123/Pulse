import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router";
import Avatar from "react-avatar";

export default function Profile() {
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
                    <h1 className="font-semibold text-xl md:text-2xl">Bansal</h1>
                    <p className="text-sm text-gray-500 font-extralight">10 posts</p>
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
                <button className="px-4 py-1 border border-gray-300 text-gray-800 font-semibold rounded-full hover:bg-gray-100">
                    Edit Profile
                </button>
            </div>

            {/* User Info */}
            <div className="px-4 mt-4">
                <h1 className="font-bold text-lg md:text-xl">Bansal</h1>
                <p className="font-extralight text-gray-600">@yashbansal</p>
            </div>
            <div className="m-4 text-sm">
                Discipline 🔥🔥
            </div>

        </div>
    );
}

