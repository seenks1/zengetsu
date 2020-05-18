const solenolyrics = require("solenolyrics");
const Discord = require("discord.js");

module.exports.run = async (client, message, args, ops) => {
  
  let trimmed = ''
  let pages = []
  let page = 1;
  
  let fetched = ops.active.get(message.guild.id);
  if (!fetched)
    return message.channel.send(
      "There currently isn't any music playing in this guild!"
    );

  let queue = fetched.queue;
  let nowPlaying = queue[0];
  try{
    var lyrics = await solenolyrics.requestLyricsFor(queue[0].songTitle);
  } catch (err) {
    
     message.channel.send('These things seem to be in another language, making me unable to print them. Please contact the bot owner for more info.')
    
  }
  var words = lyrics.split(" ");
  
  for (var i = 0; i < words.length - 1; i++) {
    words[i] += " ";
  }  
  
  for (let i = 0; i < 100; i++) {
    trimmed += words[i]
  }
  
  let embed = new Discord.MessageEmbed()
    .setColor(0xFFFF00)
    .setTitle(`**Lyrics For: ${queue[0].songTitle}**`)
    .setDescription(trimmed + '...')
    .setFooter(`Page ${page} of ${pages.length}`)
  
  message.channel.send(embed).then(msg => {
    msg.react('⬅️').then(r => {
      
      msg.react('➡️')
      
      const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅️' && user.id === message.author.id;
      const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡️' && user.id === message.author.id;
      
      const backwards = msg.createReactionCollector(backwardsFilter, {time: 60000});
      
      const forwards = msg.createReactionCollector(forwardsFilter, {time: 60000});
      
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
  name: "lyrics"
};
.