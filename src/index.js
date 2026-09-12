const { Client, Collection, GatewayIntentBits, REST } = require("discord.js");
const { loadCommands, deployCommands } = require("./handlers/command-handler.js");
const loadEvents = require("./handlers/event-handler.js");

require("dotenv").config();

const client = new Client({
    // https://gist.github.com/advaith1/e69bcc1cdd6d0087322734451f15aa2f
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

client.commands = new Collection();

loadCommands(client);
loadEvents(client);

(async () => {
    const rest = new REST().setToken(process.env.BOT_TOKEN);
    await deployCommands(client, rest);

    await client.login(process.env.BOT_TOKEN).catch(e => console.error(`Error while logging in: ${e}`));
})();