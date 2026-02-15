import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Login from './Login'
import Home from './Home'
import Feed from "./Feed";
import Profile from "./Profile";
import Premium from "./Premium";
import Bookmark from "./Bookmark";

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
            path: "/login",
            element: <Login />
        },
    ])

    return (
        <div>
            <RouterProvider router={appRouter}/>
        </div>
    )
}