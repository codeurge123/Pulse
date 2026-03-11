import React from "react";
import { useSelector } from "react-redux";
import { IoIosChatboxes } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import store from "../redux/store";
import Avatar from "react-avatar";

const Chat = () => {

    const { user, otherUsers } = useSelector(store => store.user);

    const followingUsers = otherUsers?.filter((u) =>
        user?.following?.includes(u._id)
    );

    return (
        <div className="w-[55%] min-h-screen border-x border-gray-200 relative left-80 bg-white">

            <div className="flex items-center gap-4 p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                <Link
                    to="/"
                    className="p-2 rounded-full hover:bg-gray-100 transition"
                >
                    <IoArrowBack size="22px" />
                </Link>

                <div className="flex items-center gap-2">
                    <IoIosChatboxes size="24px" />
                    <h1 className="text-xl font-bold">Chats</h1>
                </div>
            </div>

            <div className="px-3 py-2">

                {user?.following?.length === 0 ? (

                    <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
                        <IoIosChatboxes size="60" className="mb-3 opacity-60" />
                        <p className="text-lg font-medium">No chats available</p>
                        <p className="text-sm">Follow people to start chatting</p>
                    </div>

                ) : (

                    followingUsers?.map((following) => (

                        <div
                            key={following?._id}
                            className="flex items-center justify-between p-4 mb-2 rounded-xl hover:bg-gray-100 transition cursor-pointer"
                        >

                            <div className="flex items-center gap-3">

                                <Avatar
                                    src="https://pbs.twimg.com/profile_images/2017324742873927680/hu4RBkpr_400x400.jpg"
                                    size="45"
                                    round={true}
                                />

                                <div>
                                    <p className="font-semibold text-gray-900">
                                        {following?.name}
                                    </p>

                                    <p className="text-gray-500 text-sm">
                                        @{following?.username}
                                    </p>
                                </div>

                            </div>

                            <button className="px-4 py-1.5 bg-black text-white text-sm font-semibold rounded-full hover:bg-gray-700 transition">
                                Chat
                            </button>

                        </div>

                    ))
                )}

            </div>

        </div>
    )
}

export default Chat