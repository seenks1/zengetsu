module.exports.run = async (client, message, args, ops) => {

	let fetched = ops.active.get(message.guild.id);

	if(!fetched) return message.channel.send('There currently isn\'t any music playing in the guild!');

	if (message.guild.me.voice.channel.id !== message.member.voice.channel.id) return message.channel.send('Sorry, we are not connected to the same voice channel!');

	if(isNaN(args[0]) || args[0] > 200 || args[0] < 0) return message.channel.send('Please input a number between 0-200');

	fetched.dispatcher.setVolume(args[0]/200);

	message.channel.send(`🔊 Successfully set the volume of **${fetched.queue[0].songTitle}** to ${args[0]} 🔊`);
}

module.exports.help = {
  name: 'volume',
  guildOnly: true
}
