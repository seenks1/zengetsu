var skip = false;

module.exports.run = async function(client, message, args, ops) {
 	let voiceChannel = message.member.voiceChannel
	//if (!message.member.voice.channel) return message.channel.send('You are not currently connected to a voice channel!')
  if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Only administrators have access to this command')
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