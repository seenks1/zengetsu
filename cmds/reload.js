module.exports = async function(client, message, args, ops) {
  if (!args) return message.channel.send(`You didn't pass any command to reload, ${message.author}!`);
  const commandName = args[0].toLowerCase();
  const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);
  delete require.cache[require.resolve(`./${command.name}.js`)];

  try {

  	const newCommand = require(`./${command.name}.js`);
  	client.commands.set(newCommand.name, newCommand);
    return message.channel.send(`Command \`${command.name}\` was reloaded!`);

  } catch (error) {

  	console.log(error);
  	message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);

  }
}

module.exports.help = {
  name: 'reload',
  aliases: ['restart', 'reboot', 'recache']
}
