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
    .setImage(`https://img.youtube.com/vi/${nowPlaying.thumbnail}/maxresdefault.jpg`, true)
    .setDescription(`${resp}\nLink to track: [Click Here](${queue[0].url})`)
  
  message.channel.send(embed)
}

module.exports.help = {
  name: 'playing'
}