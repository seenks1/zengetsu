const Discord = require('discord.js');

module.exports.run = async (client, message, args, ops) => {
  var ping = Date.now() - message.createdTimestamp + " ms";
  
  message.channel.send(`🏓 My latency is **${ping}**`)
  
}

module.exports.help = {
	name: "latency"
}