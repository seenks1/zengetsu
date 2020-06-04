const Discord = require('discord.js')
const Keyv = require('keyv');
const keyv = new Keyv('sqlite://data/economy.sqlite');

module.exports.run = async function(client, message, args, ops) {
	let coins = await keyv.get(`coins${message.author.id}`)
	message.channel.send(`You currently have **${coins}** zen coin(s)`)
}

module.exports.help = {
	name: 'coins'
}