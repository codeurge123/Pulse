import React from "react";
import LeftSidebar from "./LeftSidebar";
import Feed from "./Feed";
import RightSidebar from "./RightSidebar";
import { Outlet } from "react-router";
import useOtherUsers from "../hooks/useOtherUsers";
import { useSelector } from "react-redux";
import store from "../redux/store";


const Home = () => {

    // implement custom hook (useOtherUsers) here

    const { user , otherUsers} = useSelector(store => store.user)
    useOtherUsers(user?._id);

    return (
        <div className="flex justify-between mx-auto w-[70%]">
            <LeftSidebar />
            <Outlet />
            <RightSidebar otherUsers={otherUsers} />
        </div>
    )
}

export default Home