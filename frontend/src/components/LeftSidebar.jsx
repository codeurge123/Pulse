import React, { useState } from "react";
import { FiHome } from "react-icons/fi";

import { IoNotificationsOutline } from "react-icons/io5";
import { FiBookmark } from "react-icons/fi";
import logo from '../assests/logo.png'
import { FiHash } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { IoChatboxOutline } from "react-icons/io5";
import { RiPulseAiFill } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import { Link, NavLink, useNavigate } from "react-router";
import { FiUserPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import store from "../redux/store";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { getOtherUser, getProfile, getUser } from "../redux/userslice";
import { getAllTweets } from "../redux/tweetslice";
import Avatar from "react-avatar";
import { FiImage } from "react-icons/fi";



const LeftSidebar = () => {

    const { user } = useSelector(store => store.user);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const PostHandler = () => {
        navigate("/");
    }

    const logoutHandler = async () => {
        try {
            const res = await axios.post(`${USER_API_END_POINT}/logout`, {}, {
                withCredentials: true
            })
            if (res?.data?.success) {
                dispatch(getUser(null));
                dispatch(getOtherUser(null));
                dispatch(getProfile(null));
                dispatch(getAllTweets(null))
                localStorage.removeItem("auth_provider");

                toast.success(res?.data?.message);
            }
            else {
                toast.error(`Some error occur while logout ${res?.data?.message}`)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="w-[13%] fixed">
            <div>
                <img width={55} className="ml-3" height={40} src={logo} alt="pulse" />
            </div>
            <div className="my-4">
                <NavLink to="/"
                    className={
                        ({ isActive }) => (
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
                <NavLink to="/user-to-follow" className={
                    ({ isActive }) => (
                        isActive ? "flex items-center my-2 bg-gray-100 rounded-full cursor-pointer px-4 py-2" : "flex items-center my-2 hover:bg-gray-100 rounded-full cursor-pointer px-4 py-2"
                    )
                }>
                    <div>
                        <FiUserPlus size="24px" />
                    </div>
                    <h1 className="font-semibold text-lg ml-2">Follow</h1>
                </NavLink>
                <NavLink to="/chat" className={
                    ({ isActive }) => (
                        isActive ? "flex items-center my-2 bg-gray-100 rounded-full cursor-pointer px-4 py-2" : "flex items-center my-2 hover:bg-gray-100 rounded-full cursor-pointer px-4 py-2"
                    )
                }>
                    <div>
                        <IoChatboxOutline size="24px" />
                    </div>
                    <h1 className="font-semibold text-lg ml-2">Chat</h1>
                </NavLink>
                <NavLink to="/pulse-ai" className={
                    ({ isActive }) => (
                        isActive ? "flex items-center my-2 bg-gray-100 rounded-full cursor-pointer px-4 py-2" : "flex items-center my-2 hover:bg-gray-100 rounded-full cursor-pointer px-4 py-2"
                    )
                }>
                    <div>
                        <RiPulseAiFill size="24px" />
                    </div>
                    <h1 className="font-semibold text-lg ml-2">PulseAI</h1>
                </NavLink>
                <NavLink to="/fav" className={
                    ({ isActive }) => (
                        isActive ? "flex items-center my-2 bg-gray-100 rounded-full cursor-pointer px-4 py-2" : "flex items-center my-2 hover:bg-gray-100 rounded-full cursor-pointer px-4 py-2"
                    )
                }>
                    <div>
                        <FiBookmark size="24px" />
                    </div>
                    <h1 className="font-semibold text-lg ml-2">Bookmark</h1>
                </NavLink>
                <NavLink to="/premium" className={
                    ({ isActive }) => (
                        isActive ? "flex items-center my-2 bg-gray-100 rounded-full cursor-pointer px-4 py-2" : "flex items-center my-2 hover:bg-gray-100 rounded-full cursor-pointer px-4 py-2"
                    )
                }>
                    <div>
                        <img width={20} height={18} src={logo} alt="pulse" />
                    </div>
                    <h1 className="font-semibold text-lg ml-2">Premium</h1>
                </NavLink>
                <NavLink to={`/profile/${user?._id}`} className={
                    ({ isActive }) => (
                        isActive ? "flex items-center my-2 bg-gray-100 rounded-full cursor-pointer px-4 py-2" : "flex items-center my-2 hover:bg-gray-100 rounded-full cursor-pointer px-4 py-2"
                    )}>
                    <div>
                        <FiUser size="24px" />
                    </div>
                    <h1 className="font-semibold text-lg ml-2">Profile</h1>
                </NavLink>
                <NavLink
                    onClick={logoutHandler}
                    to='/sign-in' className="flex fixed bottom-20 items-center my-2 hover:bg-gray-100 rounded-full cursor-pointer px-14 py-2">
                    <div>
                        <CiLogout size="24px" />
                    </div>
                    <h1 className="font-semibold text-lg ml-2">Logout</h1>
                </NavLink>
                <button 
                onClick={PostHandler}
                className="px-4 py-2 mt-4 border-none text-xl bg-[#1D9BF0] hover:bg-[#0591fc] w-full rounded-full text-white">Post</button>
            </div>
        </div>
    )
}

export default LeftSidebar;