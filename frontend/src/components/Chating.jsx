import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { IoIosChatboxes } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import { io } from "socket.io-client";

const Chating = () => {

    const { user, otherUsers } = useSelector((store) => store.user);
    const { id } = useParams();

    const chatUser = otherUsers?.find((o) => o?._id === id);

    const [messages, setMessages] = useState([]);
    const [inputmsg, setInputMsg] = useState("");

    const socket = useRef(null);

    /* GENERATE ROOM ID */
    const room = [user?._id, id].sort().join("_");

    useEffect(() => {

        socket.current = io("http://localhost:3000");

        socket.current.on("connect", () => {
            console.log("Connected:", socket.current.id);

            socket.current.emit("joinRoom", room);
        });

        socket.current.on("recivemsg", (message) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.current.disconnect();
        };

    }, [room]);


    function formatTime(ts) {
        const d = new Date(ts);
        const hh = String(d.getHours()).padStart(2, '0');
        const mm = String(d.getMinutes()).padStart(2, '0');
        return `${hh}:${mm}`;
    }
    const submitHandler = () => {

        if (!inputmsg.trim()) return;

        const newMessage = {
            text: inputmsg,
            sender: user?.name,
            ts: Date.now(),
        };

        setMessages((prev) => [...prev, newMessage]);

        socket.current.emit("chatMsg", newMessage, room);

        setInputMsg("");
    };


    const keyhandler = (e) => {
        if (e.key === "Enter") submitHandler();
    };



    return (
        <div className="w-[52%] h-screen border-r border-l border-slate-200 relative left-80 flex flex-col bg-white">

            {/* HEADER */}
            <div className="flex items-center gap-4 p-4 border-b border-gray-200 sticky top-0 bg-white">

                <Link to="/chat">
                    <IoArrowBack size="22px" />
                </Link>

                <div className="flex items-center gap-3">
                    <IoIosChatboxes size="24px" />

                    <div>
                        <h1 className="text-lg font-semibold">
                            {chatUser?.name}
                        </h1>

                        <span className="text-sm text-gray-500">
                            @{chatUser?.username}
                        </span>
                    </div>
                </div>

            </div>


            {/* MESSAGE AREA */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">

                {messages.length === 0 && (
                    <div className="flex justify-center items-center h-full text-gray-400 text-sm">
                        Start conversation with {chatUser?.name}
                    </div>
                )}

                {messages.map((m, i) => {

                    const isMe = m.sender === user?.name;

                    return (
                        <div
                            key={i}
                            className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                        >

                            <div
                                className={`px-4 py-2 text-sm max-w-[60%]
                                ${isMe
                                        ? "bg-black text-white rounded-t-2xl rounded-l-2xl"
                                        : "bg-gray-200 text-black rounded-t-2xl rounded-r-2xl"
                                    }`}
                            >

                                <div className="break-words whitespace-pre-wrap">
                                    {m.text}
                                </div>
                                <div className="flex justify-between items-center mt-1 gap-16">
                                    <div className="text-[11px] text-gray-500 text-right">
                                        {formatTime(m.ts)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}

            </div>


            {/* INPUT BOX */}
            <div className="border-t bg-white p-3">

                <div className="flex gap-2">

                    <input
                        value={inputmsg}
                        onChange={(e) => setInputMsg(e.target.value)}
                        onKeyDown={keyhandler}
                        className="flex-1 border rounded-full px-4 py-2"
                        placeholder="Type a message..."
                    />

                    <button
                        onClick={submitHandler}
                        className="px-5 py-2 rounded-full bg-black text-white"
                    >
                        Send
                    </button>

                </div>

            </div>

        </div>
    );
};

export default Chating;