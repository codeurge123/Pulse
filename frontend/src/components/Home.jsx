import React from "react";
import LeftSidebar from "./LeftSidebar";
import Feed from "./Feed";
import RightSidebar from "./RightSidebar";
import { Outlet } from "react-router";


const Home = () => {
    return (
        <div className="flex justify-between mx-auto w-[70%]">
            <LeftSidebar />
            <Outlet />
            <RightSidebar />
        </div>
    )
}

export default Home