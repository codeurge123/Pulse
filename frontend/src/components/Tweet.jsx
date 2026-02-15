import React from "react";
import Avatar from "react-avatar";


export default function Tweet() {
    return (
        <div>
            <div>
                <div className="flex p-4">
                    <Avatar src="https://pbs.twimg.com/profile_images/2017324742873927680/hu4RBkpr_400x400.jpg" size="40" round={true} />
                    <div className="flex items-center ml-2">
                        <h1 className="font-semibold">Bansal</h1>
                        <p className="text-gray-500 text-sm ml-2">@yashbansal . 1m</p>
                    </div>
                </div>
            </div>
        </div>
    )
}