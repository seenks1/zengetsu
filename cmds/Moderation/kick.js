const Discord = require('discord.js')

module.exports.run = async function (client, message, args, ops) {
  if(!message.mentions.members.first()) return message.channel.send('You must mention someone!')
  if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('You lack the required permissions.')
  if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send('I am missing the `KICK_MEMBERS` permission.')
  if(message.mentions.members.first() === message.author) return message.channel.send('You cannot kick yourself!')
  if(!args[1]) return message.channel.send('You must specify a reason.')

  var member = message.mentions.members.first()
  if (!member.kickable) return message.channel.send('This user cannot be kicked')
  await member.kick()
  var reason = args.slice(1).join(' ');
  let embed = new Discord.MessageEmbed()
    .setColor(0xadd8e6)
    .setTitle('User Kicked:')
    .setDescription(`${message.mentions.members.first()} has been kicked\n\nReason: **${reason}**`)
    .addField(`Moderator:`, message.author)


  message.channel.send(embed)

}

module.exports.help = {
  name: 'kick'
}
