const eventEmitter = require('../events');

const viewers = {};

module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('watch-video', (data) => {
            viewers[data] = viewers[data] || 0;
            viewers[data]++;
            io.emit('viewers', {
                video: data,
                count: viewers[data]
            });
        });

        socket.on('stop-watch-video', (data) => {
            viewers[data] = viewers[data] || 1;
            viewers[data]--;
            io.emit('viewers', {
                video: data,
                count: viewers[data]
            });
        });
    });

    eventEmitter.on('new-comment', () => {
        io.emit('new-comment');
    });
};