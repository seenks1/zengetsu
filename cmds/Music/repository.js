module.exports.run = async function(client, message, args, ops) {
  message.channel.send('Check out Zengetsu on GitHub: https://github.com/KinetixGaming/zengetsu')
}

module.exports.help = {
  name: 'repository',
  aliases: ['repo', 'git', 'github', 'code']
}
