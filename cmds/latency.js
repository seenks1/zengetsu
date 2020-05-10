const Discord = require('discord.js');

module.exports.run = async (client, message, args, ops) => {
  if (args[0]) return message.channel.send('This command does not require any arguments!')
  var ping = Date.now() - message.createdTimestamp + " ms";
  
  message.channel.send(`🏓 My latency is **${ping}**`)
  
}

module.exports.help = {
	name: "latency"
}