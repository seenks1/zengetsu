
module.exports.run = async (client, message, args, ops) => {
  let totalSeconds = (client.uptime / 1000);
  let days = Math.floor(totalSeconds / 86400);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${Math.trunc(seconds)} seconds`;

  message.channel.send(uptime)
}

module.exports.help = {
	name: 'uptime',
  guildOnly: true
}
