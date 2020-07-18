const Discord = require('discord.js')
const wtf = require('wtf_wikipedia')

module.exports.run = async function (client, message, args, ops) {
  if (!args[0]) return message.channel.send('Please provide a search term.')

  let req = await wtf.fetch(args[0], 'en').then((doc) => {
    let response = doc.paragraphs(0).text()
    let embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle(args[0])
    .setDescription(response)
    .setFooter('Scraped from Wikipedia')

    message.channel.send(embed)

  })


}

module.exports.help = {
  name: 'wikipedia',
  aliases: ['wiki', 'wik']
}
