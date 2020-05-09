const search = require('yt-search');
const Discord = require('discord.js')

module.exports.run = (client, message, args, ops) => {
	
	search(args.join(' '), function(err, res) {
		if (err) return message.channel.send('Sorry, something went wrong.');
		
		let videos = res.videos.slice(0,10); 
		
		let resp = '';
		for (var i in videos) {
			//resp += `**[${parseInt(i)+1}]:** \`${videos[i].title} (${videos[i].duration.timestamp})\`\n`;
			resp += `**[${parseInt(i)+1}]:** ${videos[i].title} **(${videos[i].duration.timestamp})**\n\n`;
		}
		
		resp += `\n**Choose a number between** \`1-${videos.length}\``;
		
		let embed = new Discord.RichEmbed()
			.setColor(0xFFFF00)
			.setTitle('Results')
			.setDescription(resp)
	
		message.channel.send(embed);
		
		const filter = m => !isNaN(m.content) && m.content < videos.length + 1 && m.content > 0 && m.author.id === message.author.id;
		
		const collector = message.channel.createMessageCollector(filter);
		
		
		collector.videos = videos;
		
		collector.once('collect', function(m) {
			if (m.content == 'cancel') {
				return message.channel.send('Search has been canceled...');
			}
			let commandFile = require(`./play.js`);
			commandFile.run(client, message, [this.videos[parseInt(m.content)-1].url], ops);
		});
	});
}

module.exports.help = {
	name: "search"
}