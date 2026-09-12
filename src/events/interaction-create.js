module.exports = {
    name: "interactionCreate",
    once: false,
    async run(interaction, client) {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if (!command) {
            console.warn(`Unknown command: ${interaction.commandName}; did commands deploy correctly?\n`);
            return;
        }

        try {
            await (command.run(interaction, client));
        } catch (e) {
            console.error(`Error while executing command ${interaction.commandName}:\n${e}\n`);
        }
    }
}