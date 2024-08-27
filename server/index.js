const express = require('express');
const app = express();
const cors = require("cors");
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: ["http://localhost:3000", "https://jun.farm"]
    }
});
app.use(cors());
app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

const message = require('./socket/message');
const { setReady, disconnect, playerJoin } = require('./socket/selectionScreen');

const rooms = {};

io.on('connection', (socket) => {
    let client = {
        code: null,
        username: null,
    };

    socket.on('setClient', (_client) => {
        client = _client;
        emit(playerJoin(client));
        socket.join(client.code);
    });

    socket.on('message', (content) => {
        handle(message, client, content)
    });

    socket.on('disconnect', () => {
        handle(disconnect, client)
    });

    socket.on('setReady', (ready) => {
        handle(setReady, client, ready)
    });

    function handle(handler, client, ...args) {
        try {
            emit(handler(client, ...args));
        } catch (error) {
            console.log(error);
        }
    };
    function emit(tuple) {
        if (!tuple) return;
        io.to(client.code).emit(tuple[0], tuple[1]);
        if (tuple[2]) {
            io.to(client.code).emit("toast", tuple[2]);
        }
    }
});

http.listen(8080, () => {
    console.log('listening on *:8080');
});
