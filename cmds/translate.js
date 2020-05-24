const translate = require('translate');
translate.key = 'AIzaSyCwGh6sW0oPGsMwvWroAPssXPwm33L_zRw'

module.exports.run = async function(client, message, args, ops) {
  if (!args[0]) return message.channel.send('Give me some text to translate!')
  const foo = await translate(args[0], 'es');
  message.channel.send(`Translated Message: **${foo}**`)
}

module.exports.help = {
  name: 'translate'
}