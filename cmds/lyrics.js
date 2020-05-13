const solenolyrics = require("solenolyrics");
const Discord = require("discord.js");

module.exports.run = async (client, message, args, ops) => {
  let trimmed = ''
  let mid = ''
  const emojiToTrack = '➡️'
  const reactionFilter = reaction => {
    return reaction.name === emojiToTrack
  }
  let fetched = ops.active.get(message.guild.id);
  if (!fetched)
    return message.channel.send(
      "There currently isn't any music playing in this guild!"
    );

  let queue = fetched.queue;
  let nowPlaying = queue[0];
  try{
    var lyrics = solenolyrics.requestLyricsFor(queue[0].songTitle);
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
    .setFooter('Scraped using Soleno Lyrics')
  
  message.channel.send(embed).then(msg => mid = msg.id)
 
  //console.log()
  //mid.react('⬅️')
  //mid.react('➡️')

  let reactionCollector = new Discord.ReactionCollector(mid, reactionFilter);
  
  reactionCollector.on('ended', (collected, reason) => {
    message.channel.send('Works so far!')
  });
};

module.exports.help = {
  name: "lyrics"
};
