const {SlashCommandBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder().setName('ping').setDescription('pong'),

    async execute(interection){
        await interection.replay('Pong')
    }
}