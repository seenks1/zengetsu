module.exports.run = async function(client, message, args, ops) {
  //if (message.author.id !== '161949636527915010') return message.channel.send('Only the bot author can run this command!')
  
  let fetched = ops.active.get(message.guild.id);
  
  if (!fetched) return message.channel.send("There currently isn't any music playing in this guild!");
  
  let queue = fetched.queue;
  
  for (var i = 1; i < queue.length;) {
    queue.splice(i, 1)
  }
  message.channel.send('❌ All elements in the queue have been removed!')
}


module.exports.help = {
  name: 'clear'
}