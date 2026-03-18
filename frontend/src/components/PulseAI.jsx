import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router";
import { RiPulseAiFill } from "react-icons/ri";

export default function PulseAI() {
    const [messages, setMessages] = useState([
        { role: "ai", text: "Hey 👋 I’m PulseAI. Ask me anything!" },
    ]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;

        const newMessages = [
            ...messages,
            { role: "user", text: input },
            { role: "ai", text: "Thinking..." },
        ];

        setMessages(newMessages);
        setInput("");
    };

    return (
        <div className="w-[52%] min-h-screen border-x border-gray-200 relative left-80 flex flex-col bg-white text-black">

            {/* Header */}
            <div className="flex items-center gap-2 p-4 border-b border-gray-200 sticky top-0 bg-white z-10">

                <Link
                    to={`/`}
                    className="p-2 rounded-full hover:bg-gray-100 transition"
                >
                    <IoArrowBack size="22px" />
                </Link>

                <div className="flex items-center gap-2">
                    <RiPulseAiFill size="24px" />
                    <h1 className="text-xl font-bold">PulseAI</h1>
                </div>

            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                            }`}
                    >
                        <div
                            className={`px-4 py-2 max-w-[70%] text-sm shadow-sm ${msg.role === "user"
                                ? "bg-blue-500 text-white rounded-t-2xl rounded-l-2xl "
                                : "bg-white border border-gray-200 text-gray-800 rounded-t-2xl rounded-r-2xl"
                                }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 bg-white flex items-center gap-2">
                <input
                    type="text"
                    placeholder="Ask PulseAI anything..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-full border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                />
                <button
                    onClick={handleSend}
                    className="bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600 transition"
                >
                    Send
                </button>
            </div>
        </div>
    );
}