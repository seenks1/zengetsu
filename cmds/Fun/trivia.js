const Discord = require('discord.js')
const Trivia = require('trivia-api')
const trivia = new Trivia({ encoding: 'base64' });

module.exports.run = async function (client, message, args, ops) {
  let categories = await trivia.getCategories()
  console.log(categories.trivia_categories[0].name)
  let available = []
  for(var i = 0; i < categories.trivia_categories.length; i++) {
      var obj = categories.trivia_categories[i];
      available.push(`${obj.id} - ${obj.name}`)
  }

  let embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle('Categories')
    .setDescription(available.join(`\n`))
    .setFooter(`Please select one of the available categories by selecting an id`)

  message.channel.send(embed)
  const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id);
  collector.on('collect', async message => {
    let num = parseInt(message)
    if (num > 32 || num < 9 ){
      message.channel.send('Index out of range')
      return collector.stop()
    }
    let options = {
      type: 'boolean',
      amount: 1,
      difficulty: 'hard',
      category: num
    };
    let question = await trivia.getQuestions(options)
    console.log(question.results[0])
    let embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle('Question')
      .setDescription(question.results[0].question)
      .addField('Category:', question.results[0].category, true)
      .addField('difficulty:', question.results[0].difficulty, true)

    message.channel.send(embed).then(msg => {
      msg.react('✔️').then(r => {

        msg.react('❌')

        const correctFilter = (reaction, user) => reaction.emoji.name === '✔️' && user.id === message.author.id;
        const incorrectFilter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;

        const correct = msg.createReactionCollector(correctFilter);

        const incorrect = msg.createReactionCollector(incorrectFilter);

        correct.on('collect', r => {
          if(question.results[0].correct_answer === 'True') {
            message.channel.send('You got it correct!')
          } else {
            message.channel.send('Sorry, but that\'s not the correct answer')
            message.channel.send(`Correct answer: ${question.results[0].correct_answer}`)
          }
          collector.stop()
          correct.stop()
          incorrect.stop()
        })

        incorrect.on('collect', r => {
          if(question.results[0].correct_answer === 'False') {
            message.channel.send('You got it correct!')
          } else {
            message.channel.send('Sorry, but that\'s not the correct answer')
            message.channel.send(`Correct answer: ${question.results[0].correct_answer}`)
          }
          collector.stop()
          incorrect.stop()
          correct.stop()
        })
      })
    })
  })
}

module.exports.help = {
  name: 'trivia'
}
