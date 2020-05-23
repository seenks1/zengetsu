const discordBotkit = require("botkit-discord");
const fs = require('fs')
const Discord = require('discord.js');
const client = new Discord.Client();
const ownerID = '708769168744251422'
const active = new Map();
client.commands = new Discord.Collection();

const configuration = {
  token: process.env.DISCORD_TOKEN
};

let statuses = ['Hanging with the boys!', 'Breaking the mainframe', 'Coding...', 'Creating a better world...'];


fs.readdir("./cmds/", (err, files) => {
	if (err) console.error(err);
	 let jsfiles = files.filter(f => f.split(".").pop() === 'js');
	 if(jsfiles.length <= 0) {
		 console.log('Not able to load any commands!');
		 return;
	 }
	 
	 console.log(`Loading ${jsfiles.length} commands!`);
	 
	 jsfiles.forEach((f,i) => {
		let props = require(`./cmds/${f}`);
		console.log(`${i + 1}: ${f} loaded!`);
		client.commands.set(props.help.name, props);
	 });
});

client.on("ready",  async () => {
	
		console.log(`Bot is ready! ${client.user.username}`);
		
		try {
			let link = await client.generateInvite(["MANAGE_MESSAGES", 'EMBED_LINKS']);
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

 client.on('messageDelete', message => {
  //console.log(`${message.id} was deleted!`);
  // Partial messages do not contain any content so skip them
  if (!message.partial) {
    //console.log(`Someone deleted a message! It had content: **"${message.content}"**`);
  }
});


//client.on('guildMemberRemove',(member) => {
    //client.channels.get("name", "welcome").send(`**${member.username}** has just left server.. Bye Bye`);
//});

client.on("guildMemberAdd", function(message){
	let guild = message.guild;
	let member = message;
	let membercount = client.users.size;
	member.roles.add('683170055579893772');
	
	const embed = new Discord.MessageEmbed()
		.setColor(0xffffff)
		.setTitle('Server - Welcome')
		.setDescription(`Hello ${member.user}, welcome to this server!.`)
		.addField('Welcome', `Welcome to this server! Please refer to the rules channel! If you have any questions for the admins, please message me and i will get right back with you :)`)
		.setThumbnail(member.user.avatarURL())
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
  
  try {
	let messageArray = message.content.split(/\s+/g);
	let ops = {
		ownerID: ownerID,
    active: active
	}
		
	let command = messageArray[0]
	let args = messageArray.slice(1)
	const mess = message.content.toLowerCase();
	let cmd = client.commands.get(command.slice('z!'.length));
	if (cmd && message.content.startsWith('z!')) {
    cmd.run(client, message, args, ops)
  } else if (!cmd && message.content.startsWith('z!')) {
    message.channel.send('That command doesn\'t exist!')
  }
} catch (e) {
	console.log(e.stack);
}
});

client.login("NjQ1Nzc5MjQ0MTc3MTYyMjQw.XdXMZg.sOKqpUnnewXbALJkCHx0-sO2b9o");
