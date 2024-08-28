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


const log = require('./log');
const message = require('./socket/message');
const { setReady, disconnect, playerJoin, setNickname, kickPlayer, getRoom } = require('./socket/selectionScreen');

app.get('/room/:code', (req, res) => {
    res.send(JSON.stringify(getRoom(req.params.code)));
});

io.on('connection', (socket) => {
    let client = {
        id: socket.id,
        code: null,
        username: null,
        nickname: null,
    };

    socket.on('setClient', (_client) => {
        client = { ...client, ..._client };
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

    socket.on('setNickname', (nickname) => {
        handle(setNickname, client, nickname)
    });

    socket.on('kickPlayer', (username) => {
        handle(kickPlayer, client, username)
    });

    function handle(handler, client, ...args) {
        if (client.id !== socket.id) return;
        try {
            emit(handler(client, ...args));
        } catch (error) {
            console.log(error);
            log({
                embeds: [{
                    color: 0xE60000,
                    title: "🚫 Runtime error",
                    description: `\`\`\`${error.stack.substring(0, 4000)}\`\`\``,
                }]
            })
        }
    };
    function emit(tuples) {
        if (!tuples) return;
        if (typeof tuples[0] === 'string') {
            emitSingle(tuples);
        } else {
            for (const tuple of tuples) {
                emitSingle(tuple);
            }
        }
    }
    function emitSingle(tuple) {
        io.to(client.code).emit(tuple[0], tuple[1]);
        if (tuple[2]) {
            io.to(client.code).emit("toast", tuple[2]);
        }
    }
});

http.listen(8080, () => {
    console.log('listening on *:8080');
});
