const Keyv = require('keyv');
const keyv = new Keyv('postgres://bdzrbevgbfachh:6732784c679185c83783e18da2478b615487c5205760beb09a1dcafafd1fc8d2@ec2-50-19-26-235.compute-1.amazonaws.com:5432/d8rkfoqline6qp');

module.exports.run = async function (client, message, args, ops) {

  if (!message.member.voice.channel) return message.channel.send("You are not currently connected to a voice channel!");

	let fetched = ops.active.get(message.guild.id);

	if(!fetched) return message.channel.send('There currently isn\'t any music playing in the guild!');

  keyv.on('error', err => console.error('Keyv connection error:', err));
  if (await keyv.get(`favorite1${message.author.id}`) === undefined) {
    console.log('This works!')
    for (var i = 1; i < 5; i++) {
      await keyv.set(`favorite${i}${message.author.id}`, '')
    }
  }

  for (var i = 1; i < 6; i++) {
    let favorites = await keyv.get(`favorite${i}${message.author.id}`)

    for (var x = 1; x < 6; x++) {

      let favoritesCheck = await keyv.get(`favorite${x}${message.author.id}`)

      if (favoritesCheck.includes(fetched.queue[0].songTitle)) return message.channel.send('❌ This song is already favorited!')
    }

    if (await keyv.get(`favorite${i}${message.author.id}`) === '') {

      keyv.set(`favorite${i}${message.author.id}`, `${i}. **${fetched.queue[0].songTitle}** [[Click Here]](${fetched.queue[0].url})\n\n`)

      return message.channel.send(`⭐ Successfully added **${fetched.queue[0].songTitle}** to your favorites! ⭐`)

    } else {

      for (var t = 1; t < 6; t++) {
        if (await keyv.get(`favorite${t + 1}${message.author.id}`) === '') {
          keyv.set(`favorite${t + 1}${message.author.id}`, ` ${t + 1}. **${fetched.queue[0].songTitle}** [[Click Here]](${fetched.queue[0].url})\n\n`)
          return message.channel.send(`⭐ Successfully added **${fetched.queue[0].songTitle}** to your favorites! ⭐`)
      } else {
        undefined
      }

      }
    }

    if (i == 5) {
      if (favorites !== '') return message.channel.send('Your favorites list is currently full!')
    }
    //keyv.set(`favorite${i}${message.author.id}`, `${fetched.queue[0].songTitle} [[Click Here]](${fetched.queue[0].url})`)
  }

}

module.exports.help = {
  name: 'add',
  guildOnly: true
}
