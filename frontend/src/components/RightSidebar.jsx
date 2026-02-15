import React from "react";
import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar";
import { BiDotsHorizontalRounded } from "react-icons/bi";


const RightSidebar = () => {
    return (
        <div className="w-[25%]">
            <div className="p-2 mt-4 text-gray-500 bg-gray-100 rounded-full outline-none flex items-center">
                <CiSearch size="22px" />
                <input type="text" className="ml-2 bg-transparent outline-none px-2" placeholder="Search" />
            </div>
            <div className="p-4 bg-gray-100 rounded-2xl my-4">
                <h1 className="font-bold text-xl mb-4">Who to follow</h1>
                {/* First profile */}
                <div className="flex items-center justify-between my-4">
                    <div className="flex items-center">
                        <div>
                            <Avatar src="https://pbs.twimg.com/profile_images/2017324742873927680/hu4RBkpr_400x400.jpg" size="40" round={true} />
                        </div>
                        <div className="ml-2">
                            <h1 className="font-bold">Bansal</h1>
                            <p className="text-sm font-light">@yashbansal</p>
                        </div>
                    </div>
                    <div>
                        <button className="px-4 py-2 bg-black hover:outline-offset-1 hover:outline transition-all hover:outline-slate-600 font-semibold text-white text-sm rounded-full">Profile</button>
                    </div>
                </div>
                {/* second profile */}
                <div className="flex items-center justify-between my-4">
                    <div className="flex items-center">
                        <div>
                            <Avatar src="https://pbs.twimg.com/profile_images/2017324742873927680/hu4RBkpr_400x400.jpg" size="40" round={true} />
                        </div>
                        <div className="ml-2">
                            <h1 className="font-bold">Sharma</h1>
                            <p className="text-sm font-light">@sonusharma</p>
                        </div>
                    </div>
                    <div>
                        <button className="px-4 py-2 bg-black hover:outline-offset-1 hover:outline transition-all hover:outline-slate-600 font-semibold text-white text-sm rounded-full">Profile</button>
                    </div>
                </div>
                {/* third profile */}
                <div className="flex items-center justify-between my-4">
                    <div className="flex items-center">
                        <div>
                            <Avatar src="https://pbs.twimg.com/profile_images/2017324742873927680/hu4RBkpr_400x400.jpg" size="40" round={true} />
                        </div>
                        <div className="ml-2">
                            <h1 className="font-bold">Sani</h1>
                            <p className="text-sm font-light">@sanisingh</p>
                        </div>
                    </div>
                    <div>
                        <button className="px-4 py-2 bg-black hover:outline-offset-1 hover:outline transition-all hover:outline-slate-600 font-semibold text-white text-sm rounded-full">Profile</button>
                    </div>
                </div>
            </div>
            <div className="p-4 bg-gray-100 rounded-2xl">
                <h1 className="font-bold text-xl mb-4">What's happening</h1>
                <div className="">
                    <div className="p-4 hover:bg-gray-200 rounded-2xl cursor-pointer">
                        <h1 className="font-semibold">SkincureX</h1>
                        <p className="font-light">
                            Lorem ipsum dolor sit amng eliat totam re repudiandae.
                        </p>
                    </div>
                </div>
                <div className="">
                    <div className="p-4 hover:bg-gray-200 rounded-2xl cursor-pointer">
                        <h1 className="font-semibold">codeforgood</h1>
                        <p className="font-light">
                            new github repo for stop the search of open source contribution
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RightSidebar