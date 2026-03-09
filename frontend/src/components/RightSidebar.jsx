import React from "react";
import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar";
import { Link } from "react-router";

const RightSidebar = ({ otherUsers }) => {
    return (
        <div className="w-[25%]">
            <div className="p-2 mt-4 text-gray-500 bg-gray-100 rounded-full outline-none flex items-center">
                <CiSearch size="22px" />
                <input type="text" className="ml-2 bg-transparent outline-none px-2" placeholder="Search" />
            </div>
            <div className="p-4 bg-gray-100 rounded-2xl my-4">
                <h1 className="font-bold text-xl mb-4">Who to follow</h1>

                {/* Profiles of other users */}
                {
                    otherUsers?.map((item) => (
                        <div key={item?._id} className="flex items-center justify-between my-3 hover:bg-gray-200 px-2 py-2 rounded-xl">
                            <div className="flex items-center">
                                <div>
                                    <Avatar src="https://pbs.twimg.com/profile_images/2017324742873927680/hu4RBkpr_400x400.jpg" size="40" round={true} />
                                </div>
                                <div className="ml-2">
                                    <h1 className="font-bold">{item?.name}</h1>
                                    <p className="text-sm font-light">@{item?.username}</p>
                                </div>
                            </div>
                            <Link to={`/profile/${item?._id}`} >
                                <div>
                                    <button className="px-4 py-2 bg-black hover:outline-offset-1 hover:outline transition-all hover:outline-slate-600 font-semibold text-white text-sm rounded-full">Profile</button>
                                </div>
                            </Link>
                        </div>
                    ))
                }

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