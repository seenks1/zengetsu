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
  for (var i = 1; i < queue.length; i++) {
    resp += (`Queue:`,`${i}. **${queue[i].songTitle}** | Requested By: **${queue[i].requester}**\n\n`);
    if (i == 5 || i == 1) {
      pages.push(resp)
      let resp = ''
    }
    if (i == 10) {
      pages.push(resp)
      let resp = ''
    }
  }

  let embed = new Discord.MessageEmbed()
    //.setImage(`https://img.youtube.com/vi/${nowPlaying.thumbnail}/hqdefault.jpg`, true)
    .setColor(0xffff00)
    .setAuthor("📞 Queue Information: 📞")
    .setTitle("Now Playing:")
    .setDescription(resp)
    .setFooter(`Page ${page} of ${pages.length}`);

  message.channel.send(embed).then(msg => {
    msg.react('⬅️').then(r => {
      
      msg.react('➡️')
      
      const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅️' && user.id === message.author.id;
      const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡️' && user.id === message.author.id;
      
      const backwards = msg.createReactionCollector(backwardsFilter);
      
      const forwards = msg.createReactionCollector(forwardsFilter);
      
      backwards.on('collect', r => {
        if (page === 1) return;
        page--;
        embed.setDescription(pages[page-1]);
        embed.setFooter(`Page ${page} of ${pages.length}`);
        msg.edit(embed)
      })
      
      forwards.on('collect', r => {
        if (page === pages.length) return;
        page++;
        embed.setDescription(pages[page-1]);
        embed.setFooter(`Page ${page} of ${pages.length}`);
        msg.edit(embed)
        
      })
    })
  })
};

module.exports.help = {
  name: "queue"
};
