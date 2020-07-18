const Discord = require("discord.js")
const beautify = require("beautify")

module.exports.run = async function (client, message, args, ops) {
  if (message.author.id !== '161949636527915010' || message.author.id !== '188827236734861312') return message.channel.send("Only the both author can run `eval`")

  if (!args[0]) return message.channel.send('You need to evaluate something')

  try {
    if (args.join(' ').toLowerCase().includes('token')) return message.channel.send('Nice try.')
    const toEval = args.join(' ')
    const evaluated = eval(toEval);

    let embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTimestamp()
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setTitle('Eval')
      .addField('To evaluate:', `\`\`\`js\n${beautify(args.join(" "), {format: "js"})}\n\`\`\``)
      .addField('Evaluated:', evaluated)
      .addField('Type of:', typeof(evaluated))

    message.channel.send(embed)
  } catch (err) {
    let embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle('\:x: Error!')
      .setDescription(err.message)
      .setFooter(client.user.username, client.user.displayAvatarURL())

    message.channel.send(embed)
  }

}

module.exports.help = {
  name: 'eval',
  aliases: ['e']
}
