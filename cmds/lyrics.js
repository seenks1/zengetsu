const solenolyrics = require("solenolyrics");
const Discord = require("discord.js");
const Genius = require("genius-lyrics")

module.exports.run = async (client, message, args, ops) => {
  
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
    const song = await Genius.tracks.search(queue[0].songTitle)[0];
    var lyrics = await song.lyrics();
    //var lyrics = await solenolyrics.requestLyricsFor(queue[0].songTitle);
  } catch (err) {
    
    console.log(err)
     message.channel.send('These things seem to be in another language, making me unable to print them. Please contact the bot owner for more info.')
    
  }
  
  try {
    var words = lyrics.split(" ");
  } catch (err) {
    return message.channel.send('No lyrics could be found for that song!')
  }
  let trimmed = ''
  
  for (var i = 0; i < words.length - 1; i++) {
    words[i] += " ";
  }  
  let w = 0
  for (let i = 0; i < words.length; i++) {
    trimmed += words[i]
    w++
    if (w == 100 || w == words.length) {
      pages.push(trimmed)
      trimmed = ''
      w = 0
    }
  }
  pages.push(trimmed)
  
  let embed = new Discord.MessageEmbed()
    .setColor(0xFFFF00)
    .setTitle(`**Lyrics For: ${queue[0].songTitle}**`)
    .setDescription(pages[page-1])
    .setFooter(`Page ${page} of ${pages.length}`)
  
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
  name: "lyrics"
};