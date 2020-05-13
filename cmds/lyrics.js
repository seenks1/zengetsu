const solenolyrics = require("solenolyrics");
const Discord = require("discord.js");

module.exports.run = async (client, message, args, ops) => {
  let trimmed = ''
  let fetched = ops.active.get(message.guild.id);
  if (!fetched)
    return message.channel.send(
      "There currently isn't any music playing in this guild!"
    );

  let queue = fetched.queue;
  let nowPlaying = queue[0];
  var lyrics = await solenolyrics.requestLyricsFor(queue[0].songTitle);
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
    .setFooter('Scraped using Soleno Lyrics')
  
  message.channel.send(embed);
};

module.exports.help = {
  name: "lyrics"
};
