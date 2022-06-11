import express from "express";
import cors from "cors";
import chat from "./controllers/chat";
require("dotenv").config();

//App
const app = express();
const http = require("http").createServer(app);

//Socket.io
const io = require('socket.io')(http, {
    patch: '/socket.io',
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        allowedHeaders: ["content-type"],
    },
});

//Middlewares
app.use(cors());
app.use(express.json ({limit: "5mb"}));
app.use(express.urlencoded({extended: true}));

//Rest API
app.get("/api", (req, res) => {
    res.send("Rest API");
});

//Socket
chat(io);

const port = process.env.PORT || 8000;
http.listen(port, () => console.log(`Server ouvert sur le port ${port}`));