const {
	MessageEmbed
} = require("discord.js")
const config = require(`${process.cwd()}/botconfig/config.json`)
var ee = require(`${process.cwd()}/botconfig/embed.json`)
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const { MessageButton, MessageActionRow } = require('discord.js')
const { handlemsg } = require(`${process.cwd()}/handlers/functions`)
module.exports = {
	name: "developer",
	category: "🔰 Info",
	aliases: ["dev", "tomato"],
	description: "Shows Information about the Developer",
	usage: "developer",	
	type: "bot",
	run: async (client, message, args, cmduser, text, prefix) => {
		let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
		
		try {	
			let button_support_dc = new MessageButton().setStyle('LINK').setLabel("Server Support!").setURL("https://discord.gg/EHSBQ34PfU")
			const allbuttons = [new MessageActionRow().addComponents([button_support_dc])]
			message.reply({embeds: [new MessageEmbed()
				.setColor(es.color)
				.setFooter(client.getFooter(es))
				.setTimestamp()
				.setThumbnail("https://media.discordapp.net/attachments/973231925084958723/974336939052376145/code.png")
				.setTitle("Ability Developer")
				.setURL("https://discord.gg/EHSBQ34PfU")
					.setDescription(">>> <:Tick2:944686881587740762> Hi! I am Ability! My Owners : ɴᴇᴡꜰᴏʟᴅᴇʀᶻᵉᵘˢ#۱۸۴۳ & Mojtaba Raesi#۲۵۶۷")],
components: allbuttons
			}).catch(error => console.log(error));
		} catch (e) {
			console.log(String(e.stack).grey.bgRed)
			return message.reply({embeds: [new MessageEmbed()
                                     
                     
                                    .setImage('https://cdn.discordapp.com/attachments/813685417386967060/973558408114491432/standard.gif')
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
