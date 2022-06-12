const users = [];

const addUser = (username) => {
    const name = username.trim().toLowerCase();
    const existingUser = users.find((u) => u === name);
    if (!username.trim()) return { error: "Name is required" };
    if (existingUser) {
        return {
            error: "Name is taken",
        };
    } else {
        users.push(name);
        return username;
    }
};

const chat = (io) => {
    // console.log("Live chat", io.opts);
    //Connect
    io.on('connection', (socket) => {
        // console.log("socket id connect ", socket.id);
        socket.on('username', (username) => {
            // console.log('username', username);
            // io.emit("user joined", `${username} joined`);
            let result = addUser(username);
            if (result.error) {
                return (result.error);
            }else {
                io.emit("users", users);
                socket.broadcast.emit("user joined", `${username} joined`);
            }
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