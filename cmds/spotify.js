const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
	
	let user = message.mentions.users.first() || message.author;
	
	if (user.presence.activity !== null && user.presence.activity.type === 'LISTENING' && user.presence.activity.name === 'Spotify' && user.presence.activity.assets !== null) {
		
		let trackIMG = `https:/i.scdn.co/image/${user.presence.game.assets.largeImage.slice(8)}.png`;
		
		let trackURL = `https://open.spotify.com/track/${user.presence.game.syncID}`;
		
		let trackName = user.presence.game.details;
		let trackAuthor = user.presence.game.state;
		let trackAlbum = user.presence.game.assets.largeText;
		
		const embed = new Discord.MessageEmbed()
		.setAuthor('Spotify Track Info', user.avatarURL())
		.setColor(0x1ED760)
		//.setThumbnail(user.avatarURL)
		.setThumbnail(user.presence.game.assets.largeImageURL())
		.addField('Song Name', trackName, true)
		.addField('Album', trackAlbum, true)
		.addField('Author', trackAuthor, false)
		.addField('Link to this track: ', `[\`${trackURL}\`](trackURL)`, false)
		
		message.channel.send(embed);
		
	} else {
		
		message.channel.send('**This user isn\'t currently listening to anything on Spotify!**');
	}
	
	
	
}

module.exports.help = {
	name: 'spotify'
}