const Discord = require('discord.js')

module.exports.run = async (client, message, args, ops) => {
  let embed = new Discord.MessageEmbed()
    .setColor(0xFFFF00)
    .setTitle('**Music Commands**')
    .addField('Latency', 'Shows the current ping between you and the server')
    .addField('Uptime', 'Gets the bots current uptime')
    .addField('Loop', 'Loops the current queue of music in the guild')
    .addField('Lyrics', 'Display the lyrics of the song currently playing in the guild')
    .addField('Pause', 'Pauses the current music being played in the guild')
    .addField('Play', 'Play music in the guild. Currently supports **Youtube** and **Spotify**')
    .addField('Queue', 'Displays the current working music queue')
    .addField('Resume', 'Resumes the music in the guild')
    .addField('Skip', 'Vote skips the current song playing in the guild')
    .addField('Volume', 'Changes the volume of the song currently playing in the guild')
    .addField('Remove', 'Removes the song at the specificed queue position')
    .setFooter('Showing the list of currently available cmds')
  
  if ( args[0] && args[0].toUpperCase() == 'M' || args[0].toUpperCase() == 'MUSIC') return message.channel.send(embed)
  
}

module.exports.help = {
  name: "help"
}