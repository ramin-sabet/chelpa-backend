"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function SocketFunction(io) {
    // Set socket.io listeners.
    io.on('connection', function (socket) {
        //console.log('a user connected');
        // On conversation entry, join broadcast channel
        socket.on('enter conversation', function (conversation) {
            socket.join(conversation);
            // console.log('joined ' + conversation);
        });
        socket.on('leave conversation', function (conversation) {
            socket.leave(conversation);
            // console.log('left ' + conversation);
        });
        socket.on('new message', function (conversation) {
            io.sockets.in(conversation).emit('refresh messages', conversation);
        });
        socket.on('disconnect', function () {
            //console.log('user disconnected');
        });
    });
}
exports.default = SocketFunction;
//# sourceMappingURL=ChatController.js.map