import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router";
import Avatar from "react-avatar";

export default function Profile() {
    return (
        <div className="w-[50%] min-h-screen border-r-2 border-l-2 border-slate-100">
            <div>
                <div className="flex items-center p-2">
                    <Link
                        to="/"
                        className="cursor-pointer p-2 rounded-full hover:bg-gray-100">
                        <IoArrowBack size="24px" />
                    </Link>
                    <div className="ml-2">
                        <h1 className="font-semibold text-2xl">Bansal</h1>
                    </div>
                </div>
                <img src="https://i.pinimg.com/736x/6e/96/44/6e9644355fcff74a314295fcf4a8ef08.jpg" alt="banner " />
                {/* avatar */}
                <div className="absolute top-44 mx-2 border-4 border-white rounded-full">
                    <Avatar src="https://pbs.twimg.com/profile_images/2017324742873927680/hu4RBkpr_400x400.jpg" size="140" round={true} />
                </div>
                {/* edit button */}
                <div className="text-right m-4 cursor-pointer">
                    <button className="px-4 py-1 border border-gray-300 text-gray-800 font-semibold rounded-full hover:bg-gray-100">Edit Profile</button>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}