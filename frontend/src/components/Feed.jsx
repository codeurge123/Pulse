import React from "react";
import CreatePost from './CreatePost'
import Tweet from './Tweet'

const Feed = () => {
    return (
        <div className="w-[50%] min-h-screen border-r-2 border-l-2 border-slate-200">
            <div>
                <CreatePost />
                <Tweet />
            </div>
        </div>
    )
}

export default Feed