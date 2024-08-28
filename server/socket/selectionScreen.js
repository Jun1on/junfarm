const sampleNicknames = require("../../data/sampleNicknames");

const rooms = {};

function setReady(client, ready) {
    // if (!rooms[client.code] || rooms[client.code].length === 0) return;
    const index = rooms[client.code].findIndex(p => p.username === client.username);
    // if (index === -1) return;
    rooms[client.code][index].ready = ready;
    return ['updatePlayers', rooms[client.code]];
}

function disconnect(client) {
    if (client.code && rooms[client.code].length) {
        const index = rooms[client.code].findIndex(p => p.username === client.username);
        if (index == -1) {
            return;
        }
        rooms[client.code] = rooms[client.code].filter(player => player.username !== client.username);
        return ['updatePlayers', rooms[client.code], `${client.nickname} disconnected`];
    }
}

function playerJoin(client) {
    const roomEmpty = !rooms[client.code] || rooms[client.code].length === 0;
    if (roomEmpty) {
        rooms[client.code] = [];
    }
    if (!client.nickname) {
        function stringToNumber(str) {
            return Array.from(str).reduce((sum, char) => sum + char.charCodeAt(0), 0);
        }
        client.nickname = sampleNicknames[stringToNumber(client.username) % sampleNicknames.length];
    }
    const player = { username: client.username, nickname: client.nickname, ready: roomEmpty }
    let toast;
    if (!rooms[client.code].some(p => p.username === player.username)) {
        rooms[client.code].push(player);
        return ['updatePlayers', rooms[client.code], `${client.nickname} connected`];
    } else {
        return ['duplicatePlayer', { duplicateUsername: client.username, id: client.id }];
    }
}

function setNickname(client, nickname) {
    const room = rooms[client.code];
    const player = room.find(player => player.username === client.username);
    player.nickname = nickname;
    return ['updatePlayers', rooms[client.code]];
}

function kickPlayer(client, username) {
    const callerIndex = rooms[client.code].findIndex(p => p.username === client.username);
    if (callerIndex !== 0) return; // not admin
    const nickname = rooms[client.code].find(p => p.username === username).nickname;
    const index = rooms[client.code].findIndex(p => p.username === username);
    rooms[client.code].splice(index, 1);
    return [['kickPlayer', username], ['updatePlayers', rooms[client.code], `${client.nickname} kicked ${nickname}`]];
}

// API calls

function getRoom(code) {
    return rooms[code];
}

module.exports = {
    setReady,
    disconnect,
    playerJoin,
    setNickname,
    kickPlayer,
    getRoom
}