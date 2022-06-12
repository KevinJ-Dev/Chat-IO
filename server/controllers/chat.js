const chat = (io) => {
    // console.log("Live chat", io.opts);
    //Connect
    io.on('connection', (socket) => {
        // console.log("socket id connect ", socket.id);
        socket.on('username', (username) => {
            console.log('username', username);
            // io.emit("user joined", `${username} joined`);
            socket.broadcast.emit("user joined", `${username} joined`);
        });

        socket.on("message", (message) => {
            io.emit("message", message);
        });

    //Disconnect
        socket.on('disconnect', () => {
            console.log("user disconnect")
        });
    });
};

export default chat;