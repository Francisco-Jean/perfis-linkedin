const socketIo = require('socket.io');
const db = require('../database/db');

let io;

module.exports.init = (server) => {
    io = socketIo(server);

    io.on('connection', async (socket) => {
        const profiles = await db.getAllProfiles();
        socket.emit('updateProfiles', profiles);
    });
};

module.exports.getIo = () => {
    if (!io) {
        throw new Error("WebSocket não inicializado!");
    }
    return io;
};
