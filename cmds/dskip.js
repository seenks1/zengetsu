var skip = false;

module.exports.run = async function(client, message, args, ops) {
 	let voiceChannel = message.member.voiceChannel
	if (!message.member.voice.channel) return message.channel.send('You are not currently connected to a voice channel!')
  if (message.author.id !== '161949636527915010') return message.channel.send('Only the bot author can run this command!')
	if (skip === false) {
		skip = true;
		message.channel.send('Skipping has now been disabled!');
	} else if (skip === true) {
		skip = false;
		message.channel.send('Skipping has been enabled!');
		
	}
	module.exports.skip = skip;
	
}

module.exports.skip = skip; 

module.exports.help = {
  name: 'dskip'
}