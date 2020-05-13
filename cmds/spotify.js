const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
	
	let user = message.mentions.users.first() || message.author;
	user.presence.activities.forEach((activity) => {
    if (activity !== null && activity.type === 'LISTENING' && activity.name=== 'Spotify' && activity.assets !== null) {
		
      let trackIMG = `https:/i.scdn.co/image/${user.presence.activities.assets.largeImage.slice(8)}.png`;

      let trackURL = `https://open.spotify.com/track/${user.presence.activities.syncID}`;

      let trackName = user.presence.activities.details;
      let trackAuthor = user.presence.activities.state;
      let trackAlbum = user.presence.activities.assets.largeText;

      const embed = new Discord.MessageEmbed()
      .setAuthor('Spotify Track Info', user.avatarURL())
      .setColor(0x1ED760)
      //.setThumbnail(user.avatarURL)
      .setThumbnail(user.presence.activities.assets.largeImageURL())
      .addField('Song Name', trackName, true)
      .addField('Album', trackAlbum, true)
      .addField('Author', trackAuthor, false)
      .addField('Link to this track: ', `[\`${trackURL}\`](trackURL)`, false)

      message.channel.send(embed);

    } else {
      message.channel.send('**This user isn\'t currently listening to anything on Spotify!**');
    }
    
  }
	
	
}

module.exports.help = {
	name: 'spotify'
}