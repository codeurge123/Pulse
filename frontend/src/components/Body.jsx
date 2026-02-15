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


export default function Body() {

    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
            children: [
                {
                    path: "/",
                    element: <Feed />
                },
                {
                    path: "/profile",
                    element: <Profile />
                },
                {
                    path: "/premium",
                    element: <Premium />
                },
                {
                    path: "/fav",
                    element: <Bookmark />
                }
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
            <RouterProvider router={appRouter}/>
        </div>
    )
}