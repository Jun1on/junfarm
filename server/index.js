const express = require('express');
const app = express();
const cors = require("cors");
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

app.use(cors());

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

// Store players in rooms
const rooms = {};

io.on('connection', (socket) => {
    let client = {
        code: null,
        username: null
    };

    // Handle setting client information
    socket.on('setClient', (_client) => {
        client = _client;

        const player = { username: client.username }
        if (!rooms[client.code]) {
            rooms[client.code] = [];
        } else if (!rooms[client.code].some(p => p.username === player.username)) {
            rooms[client.code].push(player);
        }

        // Broadcast the updated player list to the room
        emit('updatePlayers', rooms[client.code]);

        console.log(` ${client.username} connected to room ${client.code}`);
        socket.join(client.code);
    });

    // Handle incoming messages
    socket.on('message', (message) => {
        emit('message', `${client.username}: ${message}`);
        console.log(`${client.username}: ${message}`);
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        if (client.code && rooms[client.code].length) {
            rooms[client.code] = rooms[client.code].filter(player => player.username !== client.username);

            emit('updatePlayers', rooms[client.code]);

            emit('message', `${client.username} disconnected`);
            console.log(` ${client.username} disconnected from room ${client.code}`);
        }
    });

    function emit(event, data) {
        io.to(client.code).emit(event, data);
    }
});

http.listen(8080, () => {
    console.log('listening on *:8080');
});
