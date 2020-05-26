const Keyv = require('keyv');
const keyv = new Keyv('sqlite://data/favorites.sqlite');

module.exports.run = async function (client, message, args, ops) {
  
  if (!message.member.voice.channel) return message.channel.send("You are not currently connected to a voice channel!");
  
	let fetched = ops.active.get(message.guild.id);
	
	if(!fetched) return message.channel.send('There currently isn\'t any music playing in the guild!');  
  
  keyv.on('error', err => console.error('Keyv connection error:', err));
  if (!await keyv.get(`favorite1${message.author.id}`)) {
    console.log('This works!')
    for (var i = 1; i < 5; i++) {
      await keyv.set(`favorite${i}${message.author.id}`, '')
    }
  }

  for (var i = 1; i < 6; i++) {
    let favorites = await keyv.get(`favorite${i}${message.author.id}`)
    if (favorites.includes(fetched.queue[0].songTitle)) return message.channel.send('❌ This song is already favorited!')
    if (favorites !== '') {
      if (await keyv.get(`favorite${i + 1}${message.author.id}` === '')) keyv.set(`favorite${i + 1}${message.author.id}`, `${fetched.queue[0].songTitle} [[Click Here]](${fetched.queue[0].url})`) 
      return message.channel.send(`⭐ Successfully added **${fetched.queue[0].songTitle}** to your favorites! ⭐`)
    }
    if (i == 5) {
      if (favorites !== '') return message.channel.send('Your favorites list is currently full!')
    }
    //keyv.set(`favorite${i}${message.author.id}`, `${fetched.queue[0].songTitle} [[Click Here]](${fetched.queue[0].url})`)
  }
  
}

module.exports.help = {
  name: 'add'
}