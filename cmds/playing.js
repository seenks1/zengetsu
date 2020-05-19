const Discord = require('discord.js')

module.exports.run = async (client, message, args, ops) => {
  let fetched = ops.active.get(message.guild.id);

  if (!fetched)
    return message.channel.send(
      "There currently isn't any music playing in this guild!"
    );
  let data = ops.active.get(message.guild.id) || {};
  let queue = fetched.queue;
  let nowPlaying = queue[0];
  
  let time = millisToMinutesAndSeconds(data.dispatcher.streamTime);

  let resp = `Now Playing: **${nowPlaying.songTitle}** | Requested by: **${nowPlaying.requester}**`;
  let embed = new Discord.MessageEmbed()
    .setColor(0xffff00)
    .setImage(`https://img.youtube.com/vi/${nowPlaying.thumbnail}/maxresdefault.jpg`, true)
    .setDescription(`${resp}\n\nCurrent Elapsed Time: **${time} - ${data.queue[0].durationMin}:${data.queue[0].durationSec}**\n\nLink to track: [Click Here](${queue[0].url})`)
  
  message.channel.send(embed)
}

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

module.exports.help = {
  name: 'playing'
}