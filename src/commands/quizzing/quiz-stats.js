const {MessageFlags, SlashCommandSubcommandBuilder} = require("discord.js");

module.exports = {
    isSub: true,
    data: new SlashCommandSubcommandBuilder()
        .setName("stats")
        .setDescription("Test command")
        .addIntegerOption((option) => option
            .setName("count")
            .setDescription("integer value")
            .setRequired(false)
            .setMinValue(1)
        ),
    async run(interaction, client) {

    }
}