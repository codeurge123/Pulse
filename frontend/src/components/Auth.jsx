import React from "react";
import logo from "../assests/logo.png";
import { NavLink, Outlet } from "react-router";

export default function SignUp() {
    return (
        <div className="w-screen h-screen overflow-hidden flex flex-col md:flex-row">

            {/* Left Section - Logo (Only Desktop) */}
            <div className="hidden md:flex md:w-1/2 bg-slate-900 items-center justify-center">
                <img className="w-full" src={logo} alt="Pulse" />
            </div>

            {/* Right Section - Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center h-full px-6">

                <div className="w-full max-w-md">
                    <Outlet />
                </div>

            </div>

        </div>
    );
}
