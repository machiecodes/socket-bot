const {SlashCommandBuilder, MessageFlags} = require("discord.js");
const startCmd = require("./quiz-start");
const setCmd = require("./quiz-set");
const statsCmd = require("./quiz-stats");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("quiz")
        .setDescription("Tools for quizzing yourself")
        .addSubcommand(startCmd.data)
        .addSubcommand(setCmd.data)
        .addSubcommand(statsCmd.data),
    async run(interaction, client) {
        const subCmd = interaction.options.getSubcommand();

        switch(subCmd) {
            case "start": await startCmd.run(interaction, client); return;
            case "set": await setCmd.run(interaction, client); return;
            case "stats": await statsCmd.run(interaction, client); return;
        }
    }
}