const solenolyrics = require("solenolyrics");
const Discord = require("discord.js");

module.exports.run = async (client, message, args, ops) => {
  let fetched = ops.active.get(message.guild.id);
  if (!fetched)
    return message.channel.send(
      "There currently isn't any music playing in this guild!"
    );

  let queue = fetched.queue;
  let nowPlaying = queue[0];
  var lyrics = await solenolyrics.requestLyricsFor(queue[0]);
  for (let i = 0; i < string.length; i++){
  console.log(string[i])
}
  message.channel.send(lyrics.trim());
};

module.exports.help = {
  name: "lyrics"
};
