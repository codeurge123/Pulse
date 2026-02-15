import React from "react";
import Avatar from "react-avatar";
import { FaRegComment } from "react-icons/fa6";
import { FiHeart } from "react-icons/fi";
import { FiBookmark } from "react-icons/fi";


export default function Tweet() {
    return (
        <div className="border-b">
            <div>
                <div className="flex p-4">
                    <Avatar src="https://pbs.twimg.com/profile_images/2017324742873927680/hu4RBkpr_400x400.jpg" size="40" round={true} />
                    <div className="ml-2 w-full">
                        <div className="flex items-center ">
                            <h1 className="font-semibold">Bansal</h1>
                            <p className="text-gray-500 text-sm ml-2">@yashbansal . 1m</p>
                        </div>
                        <div>
                            <p>Hello developers lets connect and grow together. </p>
                        </div>
                        <div className="flex justify-between my-3">
                            <div className="cursor-pointer items-center flex">
                                <div className="p-2 hover:bg-green-200 rounded-full">
                                    <FaRegComment size="20px" />
                                </div>
                                <p >0</p>
                            </div>
                            <div className="cursor-pointer items-center flex">
                                <div className="p-2 hover:bg-red-200 rounded-full">
                                    <FiHeart size="20px" />
                                </div>
                                <p >0</p>
                            </div>
                            <div className="cursor-pointer items-center flex">
                                <div className="p-2 hover:bg-yellow-200 rounded-full">
                                    <FiBookmark size="20px" />
                                </div>
                                <p >0</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}