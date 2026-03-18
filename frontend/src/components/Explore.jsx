import React from "react";
import CreatePost from './CreatePost'
import Tweet from './Tweet'
import { useSelector } from "react-redux";
import store from "../redux/store";
import { useState, useEffect } from "react";
import axios from "axios";
import { NEWS_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";    

const Explore = () => {

    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await axios.get(NEWS_API_END_POINT);
                setNews(res.data.data);
            } catch (err) {
                console.error(err);
                toast.error("Failed to fetch news");
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="w-[52%] min-h-screen bg-black border-r-2 border-l-2 border-slate-200 relative left-80">
            {/* Header */}
            <div className="sticky top-0 bg-black p-4 border-b border-gray-700 z-10">
                <h1 className="text-xl font-bold text-white">
                    Explore
                </h1>
                <p className="text-gray-400 text-sm">
                    Trending News for you
                </p>
            </div>

            {/* News Feed */}
            {news.map((item, index) => (
                <div
                    key={index}
                    className="border-b border-gray-700 p-4 hover:bg-gray-800 transition"
                >
                    {/* Source + Time */}
                    <div className="flex justify-between text-sm text-gray-400">
                        <span className="font-semibold text-white">
                            {item.source.name}
                        </span>
                        <span>
                            {new Date(item.publishedAt).toLocaleTimeString()}
                        </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg text-white mt-2 font-semibold">
                        {item.title}
                    </h2>

                    {/* Description */}
                    <p className="text-gray-400 text-sm mt-1">
                        {item.description}
                    </p>

                    {/* Image */}
                    {item.urlToImage && (
                        <img
                            src={item.urlToImage}
                            alt="news"
                            className="rounded-xl mt-3 w-full max-h-80 object-cover"
                        />
                    )}

                    {/* Actions */}
                    <div className="flex justify-between mt-3 text-sm">
                        <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                        >
                            Read more →
                        </a>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Explore