const Discord = require('discord.js')

module.exports.run = async function (client, message, args, ops) {
  if(!message.mentions.members.first()) return message.channel.send('You must mention someone!')
  if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('You lack the required permissions.')
  if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send('I am missing the `BAN_MEMBERS` permission.')
  if(message.mentions.members.first() === message.author) return message.channel.send('You cannot ban yourself!')
  if(!args[1]) return message.channel.send('You must specify a reason.')

  if(!message.mentions.members.first().bannable) return message.channel.send('This user is unable to be banned.')

  await message.guild.members.ban(message.mentions.members.first())

  var reason = args.slice(1).join(' ');
  let embed = new Discord.MessageEmbed()
    .setColor(0xadd8e6)
    .setTitle('User Banned:')
    .setDescription(`${message.mentions.members.first()} has been banned\nReason: ${reason}`)
    .addField(`Moderator:`, message.author)

  message.channel.send(embed)

}

module.exports.help = {
  name: 'ban'
}
