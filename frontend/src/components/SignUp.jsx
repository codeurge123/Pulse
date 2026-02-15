import React from "react";
import { NavLink } from "react-router";

export default function SignUp() {
    return (
        <>
            <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
                Welcome to Pulse
            </h1>
            <form className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Name"
                    className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
                <input
                    type="text"
                    placeholder="Username"
                    className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"

                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"

                />

                <button
                    type="submit"
                    className="bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-800 transition"
                >
                    Sign Up
                </button>
            </form>
            <p className="text-center text-sm font-light my-3">Already have an account?
                <NavLink
                    to="/sign-in"
                    className = "ml-1 border-b-2 border-gray-400 hover:border-b-gray-700"
                >
                    Sign In
                </NavLink>
            </p>
        </>
    )
}