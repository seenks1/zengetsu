const Keyv = require('keyv');
const keyv = new Keyv('sqlite://data/favorites.sqlite');

module.exports.run = async function (client, message, args, ops) {
  keyv.on('error', err => console.error('Keyv connection error:', err));
}

module.exports.help = {
  name: 'favorites'
}