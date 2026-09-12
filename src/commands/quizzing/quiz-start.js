const {MessageFlags, SlashCommandSubcommandBuilder} = require("discord.js");

module.exports = {
    isSub: true,
    data: new SlashCommandSubcommandBuilder()
        .setName("start")
        .setDescription("Ask yourself some questions")
        .addChannelOption((option) => option
            .setName("channels")
            .setDescription("Which set/s of questions to pull from")
            .setRequired(false)
        )
        .addIntegerOption((option) => option
            .setName("count")
            .setDescription("How many questions to ask")
            .setRequired(false)
            .setMinValue(1)
        ),
    async run(interaction, client) {

    }
}