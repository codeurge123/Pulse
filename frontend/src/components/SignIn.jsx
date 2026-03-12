import React, { useState } from "react";
import { data, NavLink, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/userslice";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { getRefresh } from "../redux/tweetslice";

export default function SignIn() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loginWithRedirect } = useAuth0();



    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        setError("");
    };

    const validateForm = () => {
        const { username, email, password } = formData;

        if (!username || !email || !password) {
            return "All fields are required";
        }

        if (password.length < 6) {
            return "Password must be at least 6 characters";
        }

        return null;
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            setLoading(true);
            setError("");

            const res = await axios.post(
                `${USER_API_END_POINT}/login`,
                {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            );

            if (res.data.success) {
                // eska through toast animation lekar aya ga
                toast.success(res.data.message)
                navigate("/");
                localStorage.setItem("auth_provider", "jwt");
                dispatch(getUser(res?.data?.data?.loggedInUser))
                // console.log(res.data.data.loggedInUser) // --> just for testing
                // console.log(res.data.data.loggedInUser._id) // --> just for testing
            }

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Invalid credentials. Please try again."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
                Welcome Back
            </h1>

            <form onSubmit={submitHandler} className="flex flex-col gap-4">

                {error && (
                    <div className="bg-red-100 text-red-600 p-2 rounded text-sm">
                        {error}
                    </div>
                )}

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    disabled={loading}
                    className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                    className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                />

                {/* Password */}
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={loading}
                        className="border p-3 pr-10 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-4 text-gray-500"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-800 transition disabled:opacity-50"
                >
                    {loading ? "Signing in..." : "Sign In"}
                </button>

            </form>

            <p className="text-center text-sm font-light my-3">
                Don't have an account?
                <NavLink
                    to="/sign-up"
                    className="ml-1 border-b-2 border-gray-400 hover:border-b-gray-700"
                >
                    Sign Up
                </NavLink>
            </p>

            <div className="flex items-center my-4">
                <div className="flex-grow border-t"></div>
                <span className="mx-3 text-gray-500 text-sm">OR</span>
                <div className="flex-grow border-t"></div>
            </div>

            <button
                onClick={() => {
                    // console.log("clicked")
                    localStorage.setItem("auth_provider", "auth0");
                    loginWithRedirect({
                        authorizationParams: {
                            connection: "google-oauth2"
                        }
                    })
                }
                } className="border py-3 rounded-lg w-full hover:bg-gray-50 transition"
            >
                Continue with Google
            </button>

        </>
    );
}