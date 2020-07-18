const urban = require('relevant-urban')
const Discord = require('discord.js')

module.exports.run = async function (client, message, args, ops) {
  if (!args[0]) return message.channel.send('Specify some text to search for.')
  let res = await urban(args.join(' ')).catch(e => {
    return message.channel.send('That word could not be found.')
  })

  const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle(res.word)
    .setURL(res.urbanURL)
    .setDescription(`**Definition:**\n*${res.definition}*\n\n**Example:**\n*${res.example}*`)
    .addField('Author ', res.author, true)
    .addField('Rating', `**\`Upvotes: ${res.thumbsUp} | Downvotes: ${res.thumbsDown}\`**`)

    if (res.tags.length > 0 && res.tags.join(', ').length < 2074) {
      embed.addField('Tags', res.tags.join(', '), true)
    }

    message.channel.send(embed);
}
