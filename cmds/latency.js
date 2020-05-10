const Discord = require('discord.js');

module.exports.run = async (client, message, args, ops) => {
  var ping = Date.now() - message.createdTimestamp + " ms";
  let embed = new Discord.RichEmbed()
  .setTitle('🏓 Latency')
  .addField('**Ping**', `${ping}`)
  message.channel.send(embed)
  
  message.channel.send("``` 🏓Latency")
  
}

module.exports.help = {
	name: "latency"
}