const Discord = require('discord.js')

module.exports.run = async (client, message, args, ops) => {
  let embed = new Discord.MessageEmbed()
    .setTitle('**Commands**')
    .addField('Latency:', 'Shows the current ping between you and the server')
    .addField('Loop', 'Loops the current queue of music in the guild')
    .addField('Lyrics', 'Display the lyrics of the song currently playing in the guild')
    .addField('Pause', 'Pauses the current music being played in the guild')
    .addField('Play', 'Play music in the guild. Currently supports **Youtube** and **Spotify**')
    .addField('Queue', 'Displays the current working music queue')
    .addField('Resume', 'Resumes the music in the guild')
    .addField('Skip', 'Vote skips the current song playing in the guild')
    .addField('Volume', 'Changes the volume of the song currently playing in the guild')
    .setFooter('Showing the list of currently available cmds')
  
  message.channel.send(embed)
  
}

module.exports.help = {
  name: "help"
}