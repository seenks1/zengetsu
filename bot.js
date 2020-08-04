const fs = require('fs')
const read = require('fs-readdir-recursive');
const Discord = require('discord.js');
const client = new Discord.Client();
const ownerID = '708769168744251422'
const active = new Map();
let cooldown = new Set()
let cdseconds = 5;
const usersMap = new Map();
client.commands = new Discord.Collection();

const configuration = {
  token: process.env.DISCORD_TOKEN
};

let statuses = ['Hanging with the boys!', 'Breaking the mainframe', 'Coding...', 'Creating a better world...'];

const files = read('./cmds/');

files.forEach(file => {
  let cmdFind = file.replace('.js', '')
  let props = require(`./cmds/${cmdFind}`)
  client.commands.set(props.help.name, props);
});

client.on("ready",  async () => {

      setInterval(() => {
        dbl.postStats(client.guilds.cache.size);
    }, 1800000);

		console.log(`Bot is ready!`);

		try {
			let link = await client.generateInvite(["MANAGE_MESSAGES", 'EMBED_LINKS', 'MANAGE_CHANNELS', 'KICK_MEMBERS', 'BAN_MEMBERS', 'MANAGE_ROLES']);
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

client.on("guildMemberAdd", function(message) {
	let guild = message.guild;
	let member = message;
	let membercount = client.users.size;
  //member.roles.add('683170055579893772');


});

client.on('message', async message => {

  if (message.author.bot) return;
/*
  if (usersMap.has(message.author.id)) {
    const userData = usersMap.get(message.author.id);
    const { lastMessage, timer} = userData;
    let difference = message.createdTimestamp - lastMessage.createdTimestamp;
    let msgCount = userData.msgCount;
    if(difference > 2500) {
      clearTimeout(timer);
      userData.msgCount = 1;
      userData.lastMessage = message;
      userData.timer = setTimeout(() => {
        usersMap.delete(message.author.id);
      }, 5000);
      usersMap.set(message.author.id, userData);
    } else {
      msgCount++;
      if (parseInt(msgCount) === 5) {

          const mute = (message.guild.roles.cache.find(name => name.name === 'Muted'))
          if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send('I cannot mute this user as I am missing the `MANAGE_ROLES` permission.')
          message.member.roles.add(mute);
          message.reply('You have been muted by the spam filter.')

      } else {

        userData.msgCount = msgCount;
        usersMap.set(message.author.id, userData);
      }
    }
  } else {
    let fn = setTimeout(() => {
      usersMap.delete(message.author.id);
    }, 5000);
    usersMap.set(message.author.id, {
      msgCount: 1,
      lastMessage: message,
      timer: fn
    });
  }
  */

	let messageArray = message.content.split(/\s+/g);
	let command = messageArray[0]
	let args = messageArray.slice(1)

	//if (message.member.roles.has('684020865804795921')) {
		//message.delete()
		//message.channel.send('Silence Mortal');
	//}

  try {
	let messageArray = message.content.split(/\s+/g);
	let ops = {
		ownerID: ownerID,
    active: active
	}

  if(!message.content.startsWith('z!')) return;
  if(cooldown.has(message.author.id)){
    message.delete();
    return message.reply('You have to wait 5 seconds between commands.')
  }

  //if(!message.member.hasPermission("ADMINISTRATOR")){
    //cooldown.add(message.author.id);
  //}

	let command = messageArray[0]
	let args = messageArray.slice(1)
	const mess = message.content.toLowerCase();

	let cmd = client.commands.get(command.slice('z!'.length)) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(command.slice('z!'.length)));

  if (cmd && cmd.help.guildOnly && message.channel.type !== 'text') {

	   return message.reply('I can\'t execute that command inside DMs!');
  }

	if (cmd && message.content.startsWith('z!')) {
    cmd.run(client, message, args, ops)
  } else if (!cmd && message.content.startsWith('z!')) {
    //message.channel.send('That command doesn\'t exist!')
  }
} catch (e) {
	console.log(e.stack);
}

setTimeout(() => {
	cooldown.delete(message.author.id)
}, cdseconds * 1000)

});
/*
client.on('guildCreate', async guild => {
  if(!guild.roles.cache.find(r => r.name === 'Muted')) {
    await guild.roles.create({
      data: {
        name: 'Muted',
        color: 'GREY'
      }
    })
  }

    let role = guild.roles.cache.find(r => r.name === 'Muted');
    let arr = [];
    guild.channels.cache.forEach(channel => {
      channel.updateOverwrite(role,
        {
          SEND_MESSAGES: false
        })
        arr.push(channel)
    })

    let anonChannel = arr[Math.floor(Math.random() * arr.length)];
    return anonChannel.send('Hello! I\'ve gone ahead and setup a Mute role and created overwrites in each known text channel!')

})
*/

client.login(process.env.DISCORD_TOKEN);
