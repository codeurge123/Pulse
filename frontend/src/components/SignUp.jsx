import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";

export default function SignUp() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        const { name, username, email, password, confirmPassword } = formData;

        if (!name || !username || !email || !password || !confirmPassword) {
            return "All fields are required";
        }

        if (password.length < 6) {
            return "Password must be at least 6 characters";
        }

        if (password !== confirmPassword) {
            return "Passwords do not match";
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
                `${USER_API_END_POINT}/register`,
                {
                    name: formData.name,
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                },
                {
                    // this is use for production level and it simply says to backend that we are sending the json data
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            );

            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/sign-in");
            }

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Something went wrong. Please try again."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
                Welcome to Pulse
            </h1>

            <form onSubmit={submitHandler} className="flex flex-col gap-4">

                {error && (
                    <div className="bg-red-100 text-red-600 p-2 rounded text-sm">
                        {error}
                    </div>
                )}

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                />

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
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

                {/* Confirm Password */}
                <div className="relative">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="border p-3 pr-10 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />

                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-4 text-gray-500"
                    >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-800 transition disabled:opacity-50"
                >
                    {loading ? "Creating account..." : "Sign Up"}
                </button>

            </form>

            <p className="text-center text-sm font-light my-3">
                Already have an account?
                <NavLink
                    to="/sign-in"
                    className="ml-1 border-b-2 border-gray-400 hover:border-b-gray-700"
                >
                    Sign In
                </NavLink>
            </p>
        </>
    );
}