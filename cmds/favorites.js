const Keyv = require('keyv');
const keyv = new Keyv('sqlite://data/favorites.sqlite');

module.exports.run = async function (client, message, args, ops) {
  keyv.on('error', err => console.error('Keyv connection error:', err));
  await keyv.set(message.author.id, 'Empty');

	// bar
	let favorites = await keyv.get(message.author.id)
  if (favorites === 'Empty') return message.channel.send('Your favorites list is currently empty! Consider adding some songs.')
}

module.exports.help = {
  name: 'favorites'
}