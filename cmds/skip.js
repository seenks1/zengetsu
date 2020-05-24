module.exports.run = async (client, message, args, ops) => {
  
  let skip = require("./dskip.js");
	
	function sleep(milliseconds) {
		var start = new Date().getTime();
		for (var i = 0; i < 1e7; i++) {
			if ((new Date().getTime() - start) > milliseconds){
				break;
			}
		}
	}
	
	let fetched = ops.active.get(message.guild.id);
	
	if(!fetched) return message.channel.send('There currently isn\'t any music playing in the guild!');
  
  if(skip.skip === true) return message.channel.send('Skipping is currently disabled!')
	
	if (message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send('Sorry, you currently aren\'t in my voice channel!');
	
	let userCount = message.member.voice.channel.members.size;
	
	let required = Math.ceil(userCount/2);
	if (!fetched.queue[0].voteSkips) fetched.queue[0].voteSkips = [];
	
	if (fetched.queue[0].voteSkips.includes(message.member.id)) return message.channel.send(`Sorry, you already voted to skip this song! **${fetched.queue[0].voteSkips.length}/${required}** required.`);
	
	fetched.queue[0].voteSkips.push(message.member.id);
	ops.active.set(message.guild.id, fetched);
	
	if(fetched.queue[0].voteSkips.length >= required) {
		message.channel.send('✔️ Successfully skipped song!');
    message.react('👍')
		sleep(1000)
		return fetched.dispatcher.emit('finish');
	}
	
	
	
	message.channel.send(`Successfully voted to skip! ${fetched.queue[0].voteSkips.length}/${required} required.`);

}

module.exports.help = {
	name: 'skip'
}