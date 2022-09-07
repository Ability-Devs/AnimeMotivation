const {
  MessageEmbed, MessageActionRow
} = require("discord.js");
const config = require(`${process.cwd()}/botconfig/config.json`);
var ee = require(`${process.cwd()}/botconfig/embed.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const { MessageButton } = require('discord.js')
module.exports = {
  name: "setup",
  category: "💪 Setup",
  usage: "Setup list",
  description: "Show setup list",
  type: "bot",
  run: async (client, message, args, cmduser, text, prefix) => {
    
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    try {
      let button_public_invite = new MessageButton().setStyle('LINK').setEmoji('<:emoji_43:987113988120780840>').setLabel('how to use?').setURL("https://discord.gg/meemwHDF6c")
      //array of all buttons
      const allbuttons = [new MessageActionRow().addComponents([button_public_invite])]
      message.reply({
        embeds: [new MessageEmbed()
          .setColor(ee.color)
          .setTitle("<:emoji_46:987114066818527262> **Legend** Bot Setup List")
          .setDescription(">>> setup-ticket \n setup-antilink \n setup-antispam \n setup-jtc \n setup-logger \n setup-reportlog \n setup-warn \n setup-welcome \n setup-leave \n setup-joinvc \n setup-boost \n setup-blacklist \n setup-autowarn \n setup-antimention \n setup-admincmdlog \n setup-antidiscord \n setup-anticaps \n setup-antipings")
                 .setImage('https://cdn.discordapp.com/attachments/813685417386967060/973558408114491432/standard.gif')
          .setFooter('Legend', 'https://cdn.discordapp.com/attachments/951059028094644246/987389867354886195/9736-role-mod.png')
          .setURL("https://discord.com/api/oauth2/authorize?client_id=951055410687782934&permissions=8&scope=bot%20applications.commands")],
        components: allbuttons
      });
    } catch (e) {
      console.log(String(e.stack).grey.bgRed)
      return message.reply({embeds: [new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(client.getFooter(es))
        .setTitle(client.la[ls].common.erroroccur)
        .setDescription(eval(client.la[ls]["cmds"]["info"]["color"]["variable2"]))
      ]});
    }
  }
}
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://discord.gg/milrato
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention him / Milrato Development, when using this Code!
 * @INFO
 */
