const { playerJoin } = require('./selectionScreen');

module.exports = (client, content) => {
    if (content.startsWith("/")) {
        const command = content.split(" ")[0].substring(1);
        switch (command) {
            case "dummy":
                oldUsername = client.username;
                client.username = Math.random().toString(36).substring(2, 15);
                const result = playerJoin(client)
                client.username = oldUsername;
                return result;
        }
    } else {
        console.log(`${client.displayName}: ${content}`);
        return ['message', `${client.displayName}: ${content}`];
    }
}