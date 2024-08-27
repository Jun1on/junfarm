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

        return ['updatePlayers', rooms[client.code], `${client.username} disconnected`];
    }
}

function playerJoin(client) {
    if (!rooms[client.code]) {
        rooms[client.code] = [];
    }
    const player = { username: client.username, ready: !rooms[client.code].length }
    let toast;
    if (!rooms[client.code].some(p => p.username === player.username)) {
        toast = `${client.username} connected`
        rooms[client.code].push(player);
    }

    return ['updatePlayers', rooms[client.code], toast];
}

module.exports = {
    setReady,
    disconnect,
    playerJoin
}