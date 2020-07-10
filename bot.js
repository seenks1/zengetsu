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

      setInterval(() => {
        dbl.postStats(client.guilds.size);
    }, 1800000);

		console.log(`Bot is ready!`);

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

const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTc3OTI0NDE3NzE2MjI0MCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTkwNjc2MzIxfQ.XO3u04U_eprLnTk4O56gd2p4YeF1DemZFRZ7_KBM6XU', client);

// Optional events
dbl.on('posted', () => {
  console.log('Server count posted!');
})

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})

client.on("guildMemberAdd", function(message){
	let guild = message.guild;
	let member = message;
	let membercount = client.users.size;
  //member.roles.add('683170055579893772');


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

client.login(process.env.DISCORD_TOKEN);
