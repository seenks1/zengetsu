const search = require('yt-search');
const Discord = require('discord.js')

module.exports.run = async (client, message, args, ops) => {
	let mid = ''

	search(args.join(' '), async function(err, res) {
		if (err) return console.log(err)

		let videos = res.videos.slice(0,10);

		let resp = '';
		for (var i in videos) {
			//resp += `**[${parseInt(i)+1}]:** \`${videos[i].title} (${videos[i].duration.timestamp})\`\n`;
			resp += `**[${parseInt(i)+1}]:** ${videos[i].title} **(${videos[i].duration.timestamp})**\n\n`;
		}

		resp += `\n**Choose a number between** \`1-${videos.length}\``;

		let embed = new Discord.MessageEmbed()
			.setColor(0xFFFF00)
			.setTitle('Results')
			.setDescription(resp)

		message.channel.send(`Loading...`).then((sentMessage) => sentMessage.edit(embed).then(msg => mid = msg))

		const filter = m => !isNaN(m.content) && m.content < videos.length + 1 && m.content > 0 && m.author.id === message.author.id;

		const collector = message.channel.createMessageCollector(filter);


		collector.videos = videos;

		collector.once('collect', function(m) {
      mid.delete()
			let commandFile = require(`./play.js`);
			commandFile.run(client, message, [this.videos[parseInt(m.content)-1].url], ops);
		});
	});
}

module.exports.help = {
	name: "search"
}
