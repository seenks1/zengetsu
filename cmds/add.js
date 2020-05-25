const Keyv = require('keyv');
const keyv = new Keyv('sqlite://data/favorites.sqlite');

module.exports.run = async function (client, message, args, ops) {
  
  if (!message.member.voice.channel) return message.channel.send("You are not currently connected to a voice channel!");
  
	let fetched = ops.active.get(message.guild.id);
	
	if(!fetched) return message.channel.send('There currently isn\'t any music playing in the guild!');  
  keyv.on('error', err => console.error('Keyv connection error:', err));
  if (!await keyv.get(message.author.id)) await keyv.set(message.author.id, 'Empty');

	// bar
	let favorites = await keyv.get(message.author.id)
  
}

module.exports.help = {
  name: 'favorites'
}