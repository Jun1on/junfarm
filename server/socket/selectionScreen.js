const sampleDisplayNames = require("../data/sampleDisplayNames");

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
        rooms[client.code] = rooms[client.code].filter(player => player.username !== client.username);

        return ['updatePlayers', rooms[client.code], `${client.displayName} disconnected`];
    }
}

function playerJoin(client) {
    const roomEmpty = !rooms[client.code] || rooms[client.code].length === 0;
    if (roomEmpty) {
        rooms[client.code] = [];
    }
    if (!client.displayName) {
        function stringToNumber(str) {
            return Array.from(str).reduce((sum, char) => sum + char.charCodeAt(0), 0);
        }
        client.displayName = sampleDisplayNames[stringToNumber(client.username) % sampleDisplayNames.length];
    }
    const player = { username: client.username, displayName: client.displayName, ready: roomEmpty }
    let toast;
    if (!rooms[client.code].some(p => p.username === player.username)) {
        rooms[client.code].push(player);
        return ['updatePlayers', rooms[client.code], `${client.displayName} connected`];
    } else {
        return ['duplicatePlayer', { duplicateUsername: client.username, id: client.id }];
    }
}

function setDisplayName(client, displayName) {
    const player = room.find(player => player.id === client.id);
    player.displayName = displayName;
    return ['updatePlayers', rooms[client.code]];
}

// API calls

function getRoom(code) {
    return rooms[code];
}

module.exports = {
    setReady,
    disconnect,
    playerJoin,
    setDisplayName,
    getRoom
}