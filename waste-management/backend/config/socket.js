let io;


export const initSocket = (server) => {
io = server;


io.on("connection", (socket) => {
console.log(`Client connected: ${socket.id}`);


socket.on("disconnect", () => {
console.log(`Client disconnected: ${socket.id}`);
});


// Optionally you can listen for admin join rooms etc.
socket.on("admin:join", (adminId) => {
socket.join(`admin_${adminId}`);
});
});
};


export const getIO = () => {
if (!io) throw new Error("Socket.io not initialized");
return io;
};