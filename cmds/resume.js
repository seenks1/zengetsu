module.exports.run = async (client, message, args, ops) => {

	let fetched = ops.active.get(message.guild.id);

	if(!fetched) return message.channel.send('There currently isn\'t any music playing in the guild!');

	if (message.guild.me.voice.channel.id !== message.member.voiceChannelID) return message.channel.send('Sorry, we are not connected to the same voice channel!');

	if (!fetched.dispatcher.paused) return message.channel.send('This music isn\'t paused.');

	fetched.dispatcher.resume();

	message.channel.send(`⚙️ Successfully resumed **${fetched.queue[0].songTitle}**. ⚙️`);
}

module.exports.help = {
	name: 'resume',
	guildOnly: true
}
