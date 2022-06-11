const chat = (io) => {
    // console.log("Live chat", io.opts);
    //Connect
    io.on('connection', (socket) => {
        console.log("socket id connect ", socket.id);
    //Disconnect
        socket.on('disconnect', () => {
            console.log("user disconnect")
        });
    });
};

export default chat;