
const {MessageFlags, SlashCommandSubcommandBuilder} = require("discord.js");

module.exports = {
    isSub: true,
    data: new SlashCommandSubcommandBuilder()
        .setName("set")
        .setDescription("Designate a channel as containing a set of questions")
        .addStringOption(option => option
            .setName("mode")
            .setDescription("Whether to add or remove this channel as a question set")
            .addChoices(
                {name: "add", value: "add"},
                {name: "remove", value: "remove"}
            )
        ),
    async run(interaction, client) {

    }
}