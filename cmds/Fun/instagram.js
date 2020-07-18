const Discord = require("discord.js")
const stripIndents = require("common-tags");
const fetch = require("node-fetch");

module.exports.run = async function (client, message, args, ops) {
  const name = args.join(' ')
  if (!name) return message.reply('Please supply an instagram username')

  const url = `https://instagram.com/${name}/?__a=1`;
  const res = fetch(url => url.json());

  if (!res.graphql.user.username) return message.channel.send('I couldn\'t find that user')

  const account = res.graphql.user;

  const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle(account.fullname)
    .setURL(account.external_url_linkshimmed)
    .addField("Profile Information", stripIndents`**- Username:** ${account.username}
    **- Full name:** ${account.full_name}
    **- Biography; ** ${account.biography.length == 0 ? "none" : account.biography}
    **- Posts:** ${user.edge_owner_to_timeline_media}
    **- Followers:** ${account.edge_follow.count}
    **- Following:** ${account.edge_follow.count}
    **- Private Account:** ${account.is_private} ? "Yes" : Nope"`);

  message.channel.send(embed)

}

module.exports.help = {
  name: 'instagram',
  aliases: ['insta', 'in']
}
