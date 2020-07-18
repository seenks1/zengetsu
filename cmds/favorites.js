const Keyv = require('keyv');
const Discord = require('discord.js')

module.exports.run = async function (client, message, args, ops) {
  const keyv = new Keyv('postgres://bdzrbevgbfachh:6732784c679185c83783e18da2478b615487c5205760beb09a1dcafafd1fc8d2@ec2-50-19-26-235.compute-1.amazonaws.com:5432/d8rkfoqline6qp');
  keyv.on('error', err => console.error('Keyv connection error:', err));
  if (!await keyv.get('favorite1' + message.author.id)) {
    for (var i = 1; i < 6; i++) {
      await keyv.set(`favorite${i}${message.author.id}`, '')
    }
  }

  if (args[0]) {
    if (args[0].toUpperCase() === 'CLEAR') {
      for (var i = 1; i < 6; i++) {
        await keyv.set(`favorite${i}${message.author.id}`, '')
      }
      return message.channel.send('🗑️ Successfully cleared your **favorites** list! 🗑️')
    }
  }

	// bar
	let favorites = ''
  for (var i = 1; i < 6; i++) {
    let favorite = await keyv.get(`favorite${i}${message.author.id}`)
    favorites += favorite
  }
  if (await keyv.get(`favorite1${message.author.id}`) === '') return message.channel.send('Your favorites list is currently empty! Consider adding some songs.')

  let embed = new Discord.MessageEmbed()
    .setColor(0xffff00)
    .setTitle('Favorites List')
    .setDescription(favorites)

  message.channel.send(embed)
}

module.exports.help = {
  name: 'favorites',
  guildOnly: true
}
