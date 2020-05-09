const discordBotkit = require("botkit-discord");
const fs = require('fs')
const Discord = require('discord.js');
const client = new Discord.Client();

const configuration = {
  token: process.env.DISCORD_TOKEN
};

const discordBot = discordBotkit(configuration);
var normalizedPath = require("path").join(__dirname, "skills");

require("fs")
  .readdirSync(normalizedPath)
  .forEach(function(file) {
    require("./skills/" + file)(discordBot);
  });

let statuses = ['Hanging with the boys!', 'Breaking the mainframe', 'Coding...', 'Creating a better world...'];


fs.readdir("./", (err, files) => {
	if (err) console.error(err);
	 let jsfiles = files.filter(f => f.split(".").pop() === 'js');
	 if(jsfiles.length <= 0) {
		 console.log('Not able to load any commands!');
		 return;
	 }
	 
	 console.log(`Loading ${jsfiles.length} commands!`);
	 
	 jsfiles.forEach((f,i) => {
		let props = require(`./${f}`);
		console.log(`${i + 1}: ${f} loaded!`);
		client.commands.set(props.help.name, props);
	 });
});

client.on("ready",  async () => {
	
		console.log(`Bot is ready! ${client.user.username}`);
		
		try {
			let link = await client.generateInvite(["ADMINISTRATOR"]);
			console.log(link);
		} catch(e) {
			console.log(e.stack);
		}
		
		setInterval(function() {
			
			let status = statuses[Math.floor(Math.random()*statuses.length)];
			
			client.user.setPresence({ game: { name: status }, status: 'online'});
			
			client.user.setPresence({ activity: { name: status }, status: 'online' });
			
		}, 3000)
});

//client.on('guildMemberRemove',(member) => {
    //client.channels.get("name", "welcome").send(`**${member.username}** has just left server.. Bye Bye`);
//});

client.on("guildMemberAdd", function(message){
	let guild = message.guild;
	let member = message;
	let membercount = client.users.size;
	member.addRole('683170055579893772');
	
	const embed = new Discord.RichEmbed()
		.setColor(0xffffff)
		.setTitle('Server - Welcome')
		.setDescription(`Hello ${member.user}, welcome to this server!.`)
		.addField('Welcome', `Welcome to this server! Please refer to the rules channel! If you have any questions for the admins, please message me and i will get right back with you :)`)
		.setThumbnail(member.user.avatarURL)
		.setFooter('Made by Kinetix')
		
	member.send(embed)
		
		
});

client.on('message', async message => {
	let messageArray = message.content.split(/\s+/g);
	let command = messageArray[0]
	let args = messageArray.slice(1)
	//if (message.member.roles.has('684020865804795921')) {
		//message.delete()
		//message.channel.send('Silence Mortal');
	//}
	
	if (message.author.bot) return;
});
module.exports = discordBot;
