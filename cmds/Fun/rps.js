const Discord = require('discord.js')
const choices = ['rock', 'paper', 'scissors']
module.exports.run = async function (client, message, args, ops) {
  message.channel.send('Rock! Paper! Scissors!\nPlease choice an option: `rock` `paper` `scissors`')
  const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id && choices.includes(m.content.toLowerCase()), { time: 10000 });

  let botChoice = choices[Math.floor(Math.random() * choices.length)];
  console.log(botChoice)

  collector.on('collect', message => {
    if (message.content.toLowerCase() === botChoice) message.channel.send('Tied!')
    if (message.content.toLowerCase() === 'scissors' && botChoice === 'paper') {
      message.channel.send('Scissors beats Paper! You\'ve won!')
    } else if (message.content.toLowerCase() === 'scissors' && botChoice === 'rock'){
      message.channel.send(`Zengetsu chose **${botChoice}**! You\'ve lost! Too bad!`)
    }
    if (message.content.toLowerCase() === 'paper' && botChoice === 'rock') {
      message.channel.send('Paper beats Rock! You\'ve won!')
    } else if (message.content.toLowerCase() === 'paper' && botChoice === 'scissors'){
      message.channel.send(`Zengetsu chose **${botChoice}**! You\'ve lost! Too bad!`)
    }
    if (message.content.toLowerCase() === 'rock' && botChoice === 'scissors') {
      message.channel.send('Rock beats Scissors! You\'ve won!')
    } else if (message.content.toLowerCase() === 'rock' && botChoice === 'paper'){
      message.channel.send(`Zengetsu chose **${botChoice}**! You\'ve lost! Too bad!`)
    }
    collector.stop()
  })
}

module.exports.help = {
  name: 'rps'
}
