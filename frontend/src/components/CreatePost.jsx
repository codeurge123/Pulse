import React from "react";
import Avatar from "react-avatar";
import { FiImage } from "react-icons/fi";
import logo from '../assests/logo.png'

export default function CreatePost() {
    return (
        <div className="w-[100%]">
            {/* follow and following tab */}
            <div>
                <div className="flex items-center justify-between border-b border-gray-200">
                    <div className="cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3">
                        <h1 className="font-semibold text-gray-600 text-lg">For you</h1>
                    </div>
                    <div className="cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3">
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
                    <input className="w-full outline-none border-none text-lg ml-4" type="text" placeholder="Write Something New ?!" />
                    <div className="mr-4">
                        <FiImage size="18px" />
                    </div>
                </div>
                <div className="flex items-center justify-between p-4 border-b-2 border-gray-200">
                    <div className="rounded-full">
                        <button 
                        title="Use PulseAI for text generation"
                        >
                            <img width={35} src={logo} alt="pulseai" />
                        </button>
                    </div>
                    <button className="bg-[#1D9BF0] hover:bg-[#0591fc] cursor-pointer text-lg border-none text-white rounded-full px-4 py-1">Post</button>
                </div>
            </div>
        </div>
    )
}