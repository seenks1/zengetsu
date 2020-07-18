const Discord = require('discord.js')

module.exports.run = async function (client, message, args, ops) {

    if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('You do not have the required access level to run this command.')

    if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send('I am missing the `MANAGE_CHANNELS` permission!');

    let role = message.guild.roles.cache.find(name => name.name === '@everyone')
    message.channel.updateOverwrite(role, {
      SEND_MESSAGES: false
    })
  message.channel.send(`<#${message.channel.id}> has been locked down. Requested by ${message.author}`)
}

module.exports.help = {
  name: 'lockdown'
}
