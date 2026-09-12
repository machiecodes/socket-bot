const {SlashCommandBuilder, MessageFlags} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("example")
        .setDescription("Test command")
        .addIntegerOption((option) => option
            .setName("count")
            .setDescription("integer value")
            .setRequired(false)
            .setMinValue(1)
        ),
    async run(interaction, _) {
        const count = interaction.options.getInteger("count") ?? 5;

        await interaction.reply({
            content: `count = ${count}`,
            flags: MessageFlags.Ephemeral
        });
    }
}