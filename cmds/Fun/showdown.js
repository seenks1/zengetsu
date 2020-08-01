const Discord = require('discord.js')

module.exports.run = async function (client, message, args, ops) {
  if (!args[0]) return message.channel.send('Please mention a user you would like to duel!')
  if (!message.mentions.users.first()) return message.channel.send('That\'s not a valid mention.')
  if(message.mentions.users.first() === message.author) return message.channel.send('You cannot duel yourself!')
  if (message.mentions.users.first().bot) return message.channel.send('You can only duel humans. Idiot.')
  let user2 = message.mentions.users.first().id
  let user1 = message.author.id
  message.channel.send(`${message.mentions.users.first()}, you\'ve been challenged to a duel by ${message.author}, do you accept?`)
  const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.mentions.users.first().id, {idle: 10000});
  collector.on('collect', message => {
    if (message.content.toLowerCase().includes('yes') || message.content.toLowerCase().includes('yup')) {
      showdown(client, message, args, user1, user2)
    } else if (message.content.toLowerCase().includes('no') || message.content.toLowerCase().includes('nope')) {
        message.channel.send('Declined!')
    } else {
      message.channel.send('Invalid response')
    }

    collector.stop('Finished')
  })

  collector.on('end', (collected, reason) => {
    if (reason !== 'Finished') return message.channel.send('You took too long to respond...')
  })

  async function showdown (client, message, args, user1, user2) {
    message.channel.send('First one to type `shoot` when the clock strikes wins!')
    await new Promise(done => setTimeout(done, Math.random() * (5000 - 500) + 500));
    message.channel.send('Ding!');
    let scollector = new Discord.MessageCollector(message.channel, m => m.author.id == user1 || m.author.id == user2 && m.content.toLowerCase().includes('shoot'));
    scollector.on('collect', message => {
      message.channel.send(`${message.author} has won the showdown!`)
      return scollector.stop()
    })
  }
}

module.exports.help = {
  name: 'showdown'
}
