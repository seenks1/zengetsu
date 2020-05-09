const Discord = require('discord.js');
const Pagination = require('discord-paginationembed');
var queuelist = 0;

module.exports.run = async (client, message, args, ops) => {
	let fetched = ops.active.get(message.guild.id);
	let embeds = [];
	
	if(!fetched) return message.channel.send('There currently isn\'t any music playing in this guild!');
	
	let queue = fetched.queue
	let nowPlaying = queue[0];
	
	
	let resp = (`Now Playing: **${nowPlaying.songTitle}** | Requested by: **${nowPlaying.requester}**\n\n *Current Queue:*\n\n`);
	for (var i = 1; i < 5; i++) {
		resp += (`Queue:`, `${i}. **${queue[i].songTitle}** | Requested By: **${queue[i].requester}**\n\n`);
	}
		
	embeds.push(new Discord.RichEmbed()
		.setImage(`https://img.youtube.com/vi/${nowPlaying.thumbnail}/hqdefault.jpg`, true)
		.setColor(0xFFFF00)
		.setAuthor('Queue Information:')
		.setTitle('Now Playing:')
		.setDescription(resp))
		

	
	new Pagination.Embeds()
		.setArray(embeds)
		.setAuthorizedUsers([message.author.id])
		.setChannel(message.channel)
		.setImage(`https://img.youtube.com/vi/${nowPlaying.thumbnail}/hqdefault.jpg`, true)
		.setPage(1)
		.setColor(0xFFFF00)
		.setAuthor('Queue Information:')
		.setTitle('Now Playing:')
		.setDescription(resp)
		.build();
}

module.exports.help = {
	name: "queue"
}