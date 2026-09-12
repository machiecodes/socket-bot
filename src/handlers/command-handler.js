const {Routes} = require("discord.js");
const path = require("path");
const fg = require("fast-glob");

module.exports = {
    loadCommands(client) {
        const commandsFolder = path.join(__dirname, "..", "commands");
        const commandPaths = fg.sync("**/*.js", {cwd: commandsFolder, absolute: true})

        let loadedNormals = 0;
        let loadedSubs = 0;
        let failed = false;

        console.log(`Discovered ${commandPaths.length} commands, loading...`);

        commandPaths.forEach(path => {
            const command = require(path);

            if (command.data === undefined || command.run === undefined) {
                console.error(`Loading command ${path} failed; missing required attributes.`);
                failed = true;
                return;
            }

            if (command.isSub) {
                loadedSubs++;
                return;
            }

            //noinspection JSIgnoredPromiseFromCall
            client.commands.set(command.data.name, command);
            console.log(`Loaded command /${command.data.name} successfully`);
            loadedNormals++;
        });

        if (failed) {
            console.error("Failed to load one or more commands, exiting");
            client.destroy();
            process.exit(1);
        } else {
            console.log(`Finished; loaded ${loadedNormals} commands, ${loadedSubs} subcommands\n`);
        }
    },
    async deployCommands(client, rest) {
        console.log(`Deploying commands...`);

        let result;

        try {
            const body = [...client.commands.values()].map(cmd => cmd.data.toJSON());
            result = await rest.put(Routes.applicationGuildCommands(
                process.env.BOT_CLIENT_ID, process.env.GUILD_ID), {body});
        } catch (e) {
            console.error(`Error while deploying commands:\n${e}`);
            client.destroy();
            process.exit(1);
        }

        console.log(`Finished; deployed ${result.length} commands\n`);
    }
}