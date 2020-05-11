module.exports.run = async (client, message, args, ops) => {
  let fetched = ops.active.get(message.guild.id);
  
  if (!fetched)
    return message.channel.send(
      "There currently isn't any music playing in this guild!"
    );

  let queue = fetched.queue;
  let nowPlaying = queue[0];
  
  if (!args[0]) return message.channel.send('You must specify which song you wish to remove!')
  if (isNaN(args[0]) || args[0] > queue.length) return message.channel.send('That\'t not a valid queue position!')
  let index = args[0]
  message.channel.send(`Successful removed **${queue[index].songTitle}** from the queue!`)
  queue.splice(args[0], 1);
}

module.exports.help = {
  name: 'remove'
}