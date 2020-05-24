module.exports.run = async function(client, message, args, ops) {
  if (!args[0]) return message.channel.send('Give me some text to translate!')
}

module.exports.help = {
  name: 'translate'
}