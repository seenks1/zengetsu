module.exports.run = async function(client, message, args, ops) {
  if (!args[0]) return message.channel.send(`You didn't pass any command to reload, ${message.author}!`);
  const commandName = args[0].toLowerCase();
  const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));

  if (!command) return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);
  delete require.cache[require.resolve(`./${command.help.name}.js`)];

  try {

  	const newCommand = require(`./${command.help.name}.js`);
  	client.commands.set(newCommand.name, newCommand);
    return message.channel.send(`Command \`${command.help.name}\` was reloaded!`);

  } catch (error) {

  	console.log(error);
  	message.channel.send(`There was an error while reloading a command \`${command.help.name}\`:\n\`${error.message}\``);

  }
}

module.exports.help = {
  name: 'reload',
  aliases: ['restart', 'reboot', 'recache']
}
