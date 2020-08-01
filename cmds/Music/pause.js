module.exports.run = async (client, message, args, ops) => {

	let fetched = ops.active.get(message.guild.id);

	if(!fetched) return message.channel.send('There currently isn\'t any music playing in the guild!');

	if (message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send('Sorry, we are not connected to the same voice channel!');

	if (fetched.dispatcher.paused) return message.channel.send('This music is already paused.');

	fetched.dispatcher.pause();

	message.channel.send(`✖️ Successfully paused **${fetched.queue[0].songTitle}**. ✖️`, {allowedMentions: {parse: []}});
}

module.exports.help = {
	name: 'pause',
	guildOnly: true
}
