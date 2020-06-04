const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

client.on('ready', () => {
  console.log(`${client.user.tag} now active!`);
});

client.on('messageReactionAdd', async (reaction, user) => {

  if (reaction.message.channel.id !== config.channel) {
    if (reaction.emoji.name === config.emoji) {
      if (reaction.count === 1) {
        if (reaction.message.attachments.array().length > 0) {
          var image = reaction.message.attachments.array()[0].url
        }
        var content = reaction.message.content
        var starChannel = reaction.message.guild.channels.cache.get(config.channel)

        var link = `https://discordapp.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id}`
        const embed = new Discord.MessageEmbed()

          .setAuthor(reaction.message.author.username, reaction.message.author.avatarURL)

          .addField('Jump to Message', `[Click here](${link})`)

        if (content !== '') {
          embed.setDescription(reaction.message.content)
        }

        if (image !== undefined) {
          embed.setImage(image)
        }
        starChannel.send(embed)
      }
    }
  }
});

client.login(config.token);