var loop = false;

module.exports.run = async (client, message, args, ops) => {
	let voiceChannel = message.member.voiceChannel
	if (!message.member.voiceChannel) return message.channel.send('You are not currently connected to a voice channel!')
	if (loop === false) {
		loop = true;
		message.channel.send(' ↪ Looping over current working queue! ↩');
	} else if (loop === true) {
		loop = false;
		message.channel.send(' 🛑 Stopping queue loop! 🛑');
		
	}
	module.exports.loop = loop;
	
}

module.exports.loop = loop;
module.exports.help = {
	name: "loop"
}