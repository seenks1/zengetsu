const Discord = require('discord.js')

module.exports.run = async (client, message, args, ops) => {
  let embedo = new Discord.MessageEmbed()
    .setTitle('Commands')
    .setDescription('`z!help Music`\nShow the list of available music commands.')
    .setColor(0xFFFF00)
  
  if (!args[0]) return message.channel.send(embedo)
  
  let embed = new Discord.MessageEmbed()
    .setColor(0xFFFF00)
    .setTitle('**Music Commands**')
    .addField('Loop', 'Loops the current queue of music in the guild\nUsage: `z!loop`')
    .addField('Lyrics', 'Display the lyrics of the song currently playing in the guild\nUsage: `z!lyrics`')
    .addField('Pause', 'Pauses the current music being played in the guild\nUsage: `z!pause`')
    .addField('Play', 'Play music in the guild. Currently supports **Youtube** and **Spotify**\nUsage: `z!play`')
    .addField('Queue', 'Displays the current working music queue\nUsage: `z!queue`')
    .addField('Resume', 'Resumes the music in the guild\nUsage: `z!resume`')
    .addField('Skip', 'Vote skips the current song playing in the guild\nUsage: z!skip')
    .addField('Volume', 'Changes the volume of the song currently playing in the guild\nUsage: `z!volume`')
    .addField('Remove', 'Removes the song at the specificed queue position\nUsage: `z!remove`')
    .setFooter('Showing the list of currently available cmds')
  
  if (args[0].toUpperCase() == 'M' || args[0].toUpperCase() == 'MUSIC') return message.channel.send(embed)
  
}

module.exports.help = {
  name: "help"
}