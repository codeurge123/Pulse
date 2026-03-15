import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Auth from './Auth'
import Home from './Home'
import Feed from "./Feed";
import Profile from "./Profile";
import Premium from "./Premium";
import Bookmark from "./Bookmark";
import SignIn from './SignIn'
import SignUp from "./SignUp";
import PulseAI from './PulseAI'
import ProtectedRoute from "./ProtectedRoute";
import Chat from "./Chat";
import Follow from "./Follow";
import EditProfile from "./EditProfile";
import Chating from "./Chating";


export default function Body() {

    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: (
                <ProtectedRoute>
                    <Home />
                </ProtectedRoute>
            ),
            children: [
                {
                    path: "/",
                    element: (
                        <ProtectedRoute>
                            <Feed />
                        </ProtectedRoute>
                    )
                },
                {
                    path: "/profile/:id",
                    element: (
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    )
                },
                {
                    path: "/premium",
                    element: (
                        <ProtectedRoute>
                            <Premium />
                        </ProtectedRoute>
                    )
                },
                {
                    path: "/fav",
                    element: (
                        <ProtectedRoute>
                            <Bookmark />
                        </ProtectedRoute>
                    )
                },
                {
                    path: "/pulse-ai",
                    element: (
                        <ProtectedRoute>
                            <PulseAI />
                        </ProtectedRoute>
                    )
                },
                {
                    path: "/chat",
                    element: (
                        <ProtectedRoute>
                            <Chat />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/chat/:id",
                    element: (
                        <ProtectedRoute>
                            <Chating />
                        </ProtectedRoute>
                    )
                },
                {
                    path: "/user-to-follow",
                    element: (
                        <ProtectedRoute>
                            <Follow />
                        </ProtectedRoute>
                    )
                },
                {
                    path: "/edit-profile",
                    element: (
                        <ProtectedRoute>
                            <EditProfile />
                        </ProtectedRoute>
                    )
                },
            ]
        },
        {
            path: "/",
            element: <Auth />,
            children: [
                {
                    path: "/sign-up",
                    element: <SignUp />
                },
                {
                    path: "/sign-in",
                    element: <SignIn />
                }
            ]
        },
    ])

    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    )
}