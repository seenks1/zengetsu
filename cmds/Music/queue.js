const Discord = require("discord.js");
var queuelist = 0;

module.exports.run = async (client, message, args, ops) => {
  let fetched = ops.active.get(message.guild.id);
  let page = 1
  let pages = []

  if (!fetched)
    return message.channel.send(
      "There currently isn't any music playing in this guild!"
    );

  let queue = fetched.queue;
  let nowPlaying = queue[0];

  let resp = `Now Playing: **${nowPlaying.songTitle}** | Requested by: **${nowPlaying.requester}**\n\n *Current Queue:*\n\n`;
  for (var i = 1; i < queue.length && i < 5; i++) {
    resp += (`Queue:`,`${i}. **${queue[i].songTitle}** | Requested By: **${queue[i].requester}**\n\n`);
  }

  let embed = new Discord.MessageEmbed()
    //.setImage(`https://img.youtube.com/vi/${nowPlaying.thumbnail}/hqdefault.jpg`, true)
    .setColor(0xffff00)
    .setAuthor("📞 Queue Information: 📞")
    .setTitle("Now Playing:")
    .setDescription(resp)
    .setFooter(`The queue is currently ${queue.length} song(s) long`);

  message.channel.send(embed)

}

module.exports.help = {
  name: "queue",
  aliases: ['q', 'qe'],
  guildOnly: true
};
