import React from "react";
import { FiHome } from "react-icons/fi";

import { IoNotificationsOutline } from "react-icons/io5";
import { FiBookmark } from "react-icons/fi";
import logo from '../assests/logo.png'
import { FiHash } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { IoChatboxOutline } from "react-icons/io5";
import { RiPulseAiFill } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import { Link, NavLink } from "react-router";
import { FiUserPlus } from "react-icons/fi";



const LeftSidebar = () => {
    return (
       <div className="w-[20%]">
            <div>
                <img width={55} className="ml-3" height={40}  src={logo} alt="pulse" />
            </div>
            <div className="my-4">
                <NavLink to="/"  
                className={
                    ({isActive}) => (
                        isActive ? "flex items-center my-2 bg-gray-100 rounded-full cursor-pointer px-4 py-2" : "flex items-center my-2 hover:bg-gray-100 rounded-full cursor-pointer px-4 py-2"
                    )
                }>
                    <div>
                    <FiHome size="24px" />
                    </div>
                    <h1 className="font-semibold text-lg ml-2">Home</h1>
                </NavLink>
                <div className="flex items-center my-2 hover:bg-gray-100 rounded-full cursor-pointer px-4 py-2">
                    <div>
                    <FiHash size="24px" />
                    </div>
                    <h1 className="font-semibold text-lg ml-2">Explore</h1>
                </div>
                <div className="flex items-center my-2 hover:bg-gray-100 rounded-full cursor-pointer px-4 py-2">
                    <div>
                    <IoNotificationsOutline size="24px" />
                    </div>
                    <h1 className="font-semibold text-lg ml-2">Notification</h1>
                </div>
                <div className="flex items-center my-2 hover:bg-gray-100 rounded-full cursor-pointer px-4 py-2">
                    <div>
                    <FiUserPlus size="24px" />
                    </div>
                    <h1 className="font-semibold text-lg ml-2">Follow</h1>
                </div>
                <div className="flex items-center my-2 hover:bg-gray-100 rounded-full cursor-pointer px-4 py-2">
                    <div>
                    <IoChatboxOutline size="24px" />
                    </div>
                    <h1 className="font-semibold text-lg ml-2">Chat</h1>
                </div>
                <div className="flex items-center my-2 hover:bg-gray-100 rounded-full cursor-pointer px-4 py-2">
                    <div>
                    <RiPulseAiFill size="24px" />
                    </div>
                    <h1 className="font-semibold text-lg ml-2">PulseAI</h1>
                </div>
                <NavLink to="/fav" className={
                    ({isActive}) => (
                        isActive ? "flex items-center my-2 bg-gray-100 rounded-full cursor-pointer px-4 py-2" : "flex items-center my-2 hover:bg-gray-100 rounded-full cursor-pointer px-4 py-2"
                    )
                }>
                    <div>
                    <FiBookmark size="24px" />
                    </div>
                    <h1 className="font-semibold text-lg ml-2">Bookmark</h1>
                </NavLink>
                <NavLink to="/premium" className={
                    ({isActive}) => (
                        isActive ? "flex items-center my-2 bg-gray-100 rounded-full cursor-pointer px-4 py-2" : "flex items-center my-2 hover:bg-gray-100 rounded-full cursor-pointer px-4 py-2"
                    )
                }>
                    <div>
                   <img width={20} height={18}  src={logo} alt="pulse" />
                    </div>
                    <h1 className="font-semibold text-lg ml-2">Premium</h1>
                </NavLink>
                <NavLink to="/profile" className={
                    ({isActive}) => (
                        isActive ?  "flex items-center my-2 bg-gray-100 rounded-full cursor-pointer px-4 py-2" : "flex items-center my-2 hover:bg-gray-100 rounded-full cursor-pointer px-4 py-2" 
                    )}>
                    <div>
                    <FiUser size="24px" />
                    </div>
                    <h1 className="font-semibold text-lg ml-2">Profile</h1>
                </NavLink>
                <NavLink to='/sign-in' className="flex fixed bottom-20 items-center my-2 hover:bg-gray-100 rounded-full cursor-pointer px-14 py-2">
                    <div>
                    <CiLogout size="24px" />
                    </div>
                    <h1 className="font-semibold text-lg ml-2">Logout</h1>
                </NavLink>
                <button className="px-4 py-2 mt-4 border-none text-xl bg-[#1D9BF0] hover:bg-[#0591fc] w-full rounded-full text-white">Post</button>
               
            </div>
       </div>
    )
}

export default LeftSidebar;