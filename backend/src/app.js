import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from "node:http";

const app = express();
export const server = createServer(app);

/* SOCKET.IO SERVER */
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

/* MIDDLEWARES */
app.use(cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}));

app.use(express.static("public"));
app.use(cookieParser());

/* SOCKET CONNECTION */
io.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    /* JOIN ROOM */
    socket.on("joinRoom", (room) => {
        socket.join(room);
        console.log(`Socket ${socket.id} joined room ${room}`);
    });

    /* RECEIVE MESSAGE */
    socket.on("chatMsg", (message, room) => {

        console.log("message received:", message);

        /* send message to other users in same room */
        socket.to(room).emit("recivemsg", message);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});


/* ROUTES */
import userRouter from "./routes/user.route.js";
import tweetRouter from "./routes/tweet.route.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tweet", tweetRouter);

export { app };