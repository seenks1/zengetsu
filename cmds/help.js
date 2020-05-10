const Discord = require('discord.js')

module.exports.run = async (client, message, args, ops) => {
  let embed = new Discord.RichEmbed()
    .setTitle('**Commands**')
    .addField('Latency:', 'Shows the current ping between you and the server')
}

module.exports.help = {
  name: "help"
}