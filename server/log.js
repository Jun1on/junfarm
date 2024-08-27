require('dotenv').config()
const { Client, Events, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
client.login(process.env.DISCORD_TOKEN)

let logChannel
client.on("ready", () => {
    logChannel = client.channels.cache.get("1278082136561291385")
    logChannel.send("bot started")
})

module.exports = (msg, id) => {
    send(msg, id).catch((e) => {
        setTimeout(() => {
            try {
                send(msg, id).catch(console.log)
            } catch (error) {
                console.log("discord send failed: " + msg)
            }
        }, 10000)
    })

}

async function send(msg, id) {
    if (id) {
        await client.channels.cache.get(id).send(msg)
    } else {
        await logChannel.send(msg)
    }
}