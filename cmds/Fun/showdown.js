const Discord = require('discord.js')

module.exports.run = async function (client, message, args, ops) {
  if (!args[0]) return message.channel.send('Please mention a user you would like to duel!')
  if (!message.mentions.users.first()) return message.channel.send('That\'s not a valid mention.')
  let user2 = message.mentions.users.first().id
  let user1 = message.author.id
  message.channel.send(`${message.mentions.users.first()}, you\'ve been challenged to a duel by ${message.author}, do you accept?`)
  const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.mentions.users.first().id);
  collector.on('collect', message => {
    if (message.content.toLowerCase().includes('yes') || message.content.toLowerCase().includes('yup')) {
      showdown(client, message, args, user1, user2)
    } else if (message.content.toLowerCase().includes('yes') || message.content.toLowerCase().includes('yup')) {
        return message.channel.send('Declined!')
      }

    collector.stop()
  })

  async function showdown (client, message, args, user1, user2) {
    message.channel.send('First one to type `shoot` when the clock strikes wins!')
    message.channel.send('Ding!');
    await new Promise(done => setTimeout(done, 3000));
    let scollector = new Discord.MessageCollector(message.channel, m => m.author.id == user1 || m.author.id == user2);
    scollector.on('collect', message => {
      if (message.content.includes('shoot')) message.channel.send(`${message.author} has won the showdown!`)
      return scollector.stop()
    })
  }
}

module.exports.help = {
  name: 'showdown'
}
