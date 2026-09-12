const { Routes } = require("discord.js");
const path = require("path");
const fg = require("fast-glob");
const { BOT_CLIENT_ID, GUILD_ID } = require("../config.json");

module.exports = {
    loadCommands(client) {
        const commandsFolder = path.join(__dirname, "..", "commands");
        const commandPaths = fg.sync("**/*.js", { cwd: commandsFolder, absolute: true })

        let loaded = 0;
        let failed = false;

        console.log(`Loading ${commandPaths.length} commands...`);

        commandPaths.forEach(path => {
            const command = require(path);

            if (!command.data || typeof command.run !== "function") {
                console.error(`Loading command ${path} failed; missing required attributes.`);
                failed = true;
                return;
            }

            //noinspection JSIgnoredPromiseFromCall
            client.commands.set(command.data.name, command);
            console.log(`Loaded command /${command.data.name} successfully.`);
            loaded++;
        });

        if (failed) {
            console.error("Failed to load one or more commands, exiting.");
            process.exit(1);
        } else {
            console.log(`Finished; loaded ${loaded} commands\n`);
        }
    },
    async deployCommands(client, rest) {
        console.log(`Deploying commands...`);

        let result;

        try {
            const body = [...client.commands.values()].map(cmd => cmd.data.toJSON());
            result = await rest.put(Routes.applicationGuildCommands(BOT_CLIENT_ID, GUILD_ID), { body });
        } catch (e) {
            console.error(`Error while deploying commands:\n${e}`);
            return;
        }

        console.log(`Finished; deployed ${result.length} commands\n`);
    }
}