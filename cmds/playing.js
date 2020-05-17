const Discord = require('discord.js')

module.exports.run = async (client, message, args, ops) => {
  let fetched = ops.active.get(message.guild.id);

  if (!fetched)
    return message.channel.send(
      "There currently isn't any music playing in this guild!"
    );

  let queue = fetched.queue;
  let nowPlaying = queue[0];

  let resp = `Now Playing: **${nowPlaying.songTitle}** | Requested by: **${nowPlaying.requester}**`;
  let embed = new Discord.MessageEmbed()
    .setDescription(`${resp}`)
  
  message.channel.send(embed)
}

module.exports.help = {
  name: 'playing'
}