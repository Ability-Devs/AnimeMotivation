const {
  MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu
} = require("discord.js")
const config = require(`${process.cwd()}/botconfig/config.json`);
var ee = require(`${process.cwd()}/botconfig/embed.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const {
  duration, handlemsg
} = require(`${process.cwd()}/handlers/functions`)
module.exports = {
  name: "help",
  category: "🔰 Info",
  aliases: ["h", "commandinfo", "halp", "hilfe"],
  usage: "help [Command/Category]",
  description: "Returns all Commmands, or one specific command",
  type: "bot",
  run: async (client, message, args, cmduser, text, prefix) => {

    let settings = client.settings.get(message.guild.id);
    let es = client.settings.get(message.guild.id, "embed");
    let ls = client.settings.get(message.guild.id, "language");

    try {
      if (args[0]) {
        const embed = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null);
        const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
        var cat = false;
        if (args[0].toLowerCase().includes("cust")) {
          let cuc = client.customcommands.get(message.guild.id, "commands");
          if (cuc.length < 1) cuc = [handlemsg(client.la[ls].cmds.info.help.error1)]
          else cuc = cuc.map(cmd => `\`${cmd.name}\``)
          const items = cuc


          const embed = new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null)
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle(eval(client.la[ls]["cmds"]["info"]["help"]["variable1"]))
            .setDescription(items.join("︲"))
            .setFooter(handlemsg(client.la[ls].cmds.info.help.nocustom), client.user.displayAvatarURL());

          message.reply({ embeds: [embed] })
          return;
        } var cat = false;
        if (!cmd) {
          cat = client.categories.find(cat => cat.toLowerCase().includes(args[0].toLowerCase()))
        }
        if (!cmd && (!cat || cat == null)) {
          return message.reply({ embeds: [embed.setColor(es.wrongcolor).setDescription(handlemsg(client.la[ls].cmds.info.help.noinfo, { command: args[0].toLowerCase() }))] });
        } else if (cat) {
          var category = cat;
          const items = client.commands.filter((cmd) => cmd.category === category).map((cmd) => `\`${cmd.name}\``);
          const embed = new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null)
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle(eval(client.la[ls]["cmds"]["info"]["help"]["variable2"]))
            .setFooter(handlemsg(client.la[ls].cmds.info.help.nocustom, { prefix: prefix }), client.user.displayAvatarURL());
          let embeds = allotherembeds_eachcategory();
          if (cat == "🔰 Info")
            return message.reply({ embeds: [embeds[2]] })
          if (cat == "🎶 Music")
            return message.reply({ embeds: [embeds[4]] })
          if (cat == "⚜️ Custom Queue(s)")
            return message.reply({ embeds: [embeds[5]] })
          if (cat == "🚫 Administration")
            return message.reply({ embeds: [embeds[6]] })
          if (cat == "💪 Setup")
            return message.reply({ embeds: [embeds[7]] })
          if (cat == "⚙️ Settings")
            return message.reply({ embeds: [embeds[8]] })
          if (cat == "👑 Owner")
            return message.reply({ embeds: [embeds[11]] })
          if (cat == "🔊 Soundboard")
            return message.reply({ embeds: [embeds[12]] })
          if (cat == "🎤 Voice")
            return message.reply({ embeds: [embeds[17]] })
          if (category.toLowerCase().includes("custom")) {
            const cmd = client.commands.get(items[0].split("`").join("").toLowerCase()) || client.commands.get(client.aliases.get(items[0].split("`").join("").toLowerCase()));
            try {
              embed.setDescription(eval(client.la[ls]["cmds"]["info"]["help"]["variable3"]));
            } catch { }
          } else {
            embed.setDescription(eval(client.la[ls]["cmds"]["info"]["help"]["variable4"]))
          }
          return message.reply({ embeds: [embed] })
        }
        if (cmd.name) embed.addField(handlemsg(client.la[ls].cmds.info.help.detail.name), `\`\`\`${cmd.name}\`\`\``);
        if (cmd.name) embed.setTitle(handlemsg(client.la[ls].cmds.info.help.detail.about, { cmdname: cmd.name }));
        if (cmd.description) embed.addField(handlemsg(client.la[ls].cmds.info.help.detail.desc), `\`\`\`${cmd.description}\`\`\``);
        if (cmd.aliases && cmd.aliases.length > 0 && cmd.aliases[0].length > 1) try {
          embed.addField(handlemsg(client.la[ls].cmds.info.help.detail.aliases), `\`${cmd.aliases.map((a) => `${a}`).join("`, `")}\``);
        } catch { }
        if (cmd.cooldown) embed.addField(handlemsg(client.la[ls].cmds.info.help.detail.cooldown), `\`\`\`${cmd.cooldown} Seconds\`\`\``);
        else embed.addField(handlemsg(client.la[ls].cmds.info.help.detail.cooldown), `\`\`\`3 Seconds\`\`\``);
        if (cmd.usage) {
          embed.addField(handlemsg(client.la[ls].cmds.info.help.detail.usage), `\`\`\`${prefix}${cmd.usage}\`\`\``);
          embed.setFooter(handlemsg(client.la[ls].cmds.info.help.detail.syntax), es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL());
        }
        return message.reply({ embeds: [embed] });
      } else {
        let button_tutorial = new MessageButton().setStyle('LINK').setEmoji("<:emoji_45:1006508412395339796>").setLabel('').setURL("https://discord.gg/meemwHDF6c")
        let button_back = new MessageButton().setStyle('SECONDARY').setCustomId('1').setEmoji("<:emoji_43:1006506921391575120>").setLabel('')
        let button_forward = new MessageButton().setStyle('SECONDARY').setCustomId('3').setEmoji('<:emoji_44:1006506957252874260>').setLabel('')
        let menuOptions = [
          {
            label: "Overview",
            value: "Overview",
            emoji: "<:emoji_57:987257753867272222>",
            description: "My Overview of me!"
          },
          {
            label: "Information",
            value: "Information",
            emoji: "<:emoji_43:987113988120780840>",
            description: "Commands to share Information"
          },
          {
            label: "Music",
            value: "Music",
            emoji: "<:emoji_2:995517800032518154>",
            description: "Commands to play Music / add Filter"
          },
          {
            label: "Customqueue",
            value: "Customqueue",
            emoji: "994638450672287744",
            description: "Commands to Save Queues and Manage them"
          },
          {
            label: "Admin",
            value: "Admin",
            emoji: "<:emoji_51:987114244694761502>",
            description: "Commands to Administrate the Server"
          },
          {
            label: "Setup",
            value: "Setup",
            emoji: "987114023294214264",
            description: "Commands to Setup Systems"
          },
          {
            label: "Settings",
            value: "Settings",
            emoji: "987114066818527262",
            description: "Commands to change Server Settings"
          },
          {
            label: "Owner",
            value: "Owner",
            emoji: "<:emoji_52:987114271223730276>",
            description: "Commands to to manage the Bot"
          },
          {
            label: "Soundboard",
            value: "Soundboard",
            emoji: "994639843487387668",
            description: "Commands for Voice Soundboard"
          },
          {
            label: "Voice",
            value: "Voice",
            emoji: "<:875234:994637055747436694>",
            description: "Commands for Voice Channels Management"
          },
          {
            label: "Customcommand",
            value: "Customcommand",
            emoji: "994638450672287744",
            description: "Custom Commands of this Server"
          },
        ];
        menuOptions = menuOptions.map(i => {
          if (settings[`${i ?.value.toUpperCase()}`] === undefined) {
            return i; //if its not in the db, then add it
          }
          else if (settings[`${i ?.value.toUpperCase()}`]) {
            return i; //If its enabled then add it
          }
          else if (settings.showdisabled && settings[`${i ?.value.toUpperCase()}`] === false) {
            return i;
          } else {
            //return i // do not return, cause its disabled! to be shown
          }
        })
        //let menuSelection = new MessageSelectMenu()
        //.setCustomId("MenuSelection")
        //.setPlaceholder("help menu - Click me")
        //.setMinValues(1)
        //.setMaxValues(5)
        //.addOptions(menuOptions.filter(Boolean))
        //let buttonRow = new MessageActionRow().addComponents([button_tutorial])
        //let SelectionRow = new MessageActionRow().addComponents([menuSelection])
        // const allbuttons = [buttonRow, SelectionRow]
        let buttonRow = new MessageActionRow().addComponents([button_back, button_forward, button_tutorial])
        const allbuttons = [buttonRow]
        //define default embed
        let OverviewEmbed = new MessageEmbed()
          .setColor("0x2F3136")
          .setFooter("Page Overview\n" + client.user.username, client.user.displayAvatarURL())
          .setTitle(`Information about __${client.user.username}__`)
          .addField("<:emoji_54:974028792572051576> **__STATS:__**",
            `>>> <:emoji_46:987114066818527262> **${client.commands.map(a => a).length} Commands**
<:emoji_52:987114271223730276> on **${client.guilds.cache.size} Guilds**
<:emoji_55:974033001031798844> **${duration(client.uptime).map(i => `\`${i}\``).join("︲")} Uptime**
<:emoji_22:983353163874701382> **\`${Math.floor(client.ws.ping)}ms\` Ping** \n<:emoji_56:987114584605339688> Legend Devs `)
          .setThumbnail('https://cdn.discordapp.com/attachments/995517539562037332/995721152196530306/9736-role-mod.png')

        let err = false;
        //Send message with buttons
        let helpmsg = await message.reply({
          content: `**Hi! Legend Bot help desk**`,
          embeds: [OverviewEmbed],
          components: allbuttons
        }).catch(e => {
          err = true;
          console.log(e.stack ? String(e.stack).grey : String(e).grey)
          return message.reply(`:x: I couldn't send help? Maybe I am missing the Permission to **EMBED LINKS**`).catch(() => { })
        });
        if (err) return;
        var edited = false;
        var embeds = [OverviewEmbed]
        for (const e of allotherembeds_eachcategory(true))
          embeds.push(e)
        let currentPage = 0;

        //create a collector for the thinggy
        const collector = helpmsg.createMessageComponentCollector({ filter: (i) => (i ?.isButton() || i ?.isSelectMenu()) && i ?.user && i ?.message.author.id == client.user.id, time: 180e3 });
        //array of all embeds, here simplified just 10 embeds with numbers 0 - 9
        collector.on('collect', async b => {
          try {
            if (b ?.isButton()) {
              if (b ?.user.id !== message.author.id)
                return b ?.reply({ content: handlemsg(client.la[ls].cmds.info.help.buttonerror, { prefix: prefix }), ephemeral: true });

              //page forward
              if (b ?.customId == "1") {
                //b?.reply("***Swapping a PAGE FORWARD***, *please wait 2 Seconds for the next Input*", true)
                if (currentPage !== 0) {
                  currentPage -= 1
                } else {
                  currentPage = embeds.length - 1
                }
              }
              //go home
              else if (b ?.customId == "2") {
                //b?.reply("***Going Back home***, *please wait 2 Seconds for the next Input*", true)
                currentPage = 0;
              }
              //go forward
              else if (b ?.customId == "3") {
                //b?.reply("***Swapping a PAGE BACK***, *please wait 2 Seconds for the next Input*", true)
                if (currentPage < embeds.length - 1) {
                  currentPage++;
                } else {
                  currentPage = 0
                }
              }
              await helpmsg.edit({ embeds: [embeds[currentPage]], components: allbuttons }).catch(e => { })
              b ?.deferUpdate().catch(e => { })


            }
            if (b ?.isSelectMenu()) {
              //b?.reply(`***Going to the ${b?.customId.replace("button_cat_", "")} Page***, *please wait 2 Seconds for the next Input*`, true)
              //information, music, admin, settings, voice, minigames, nsfw
              let index = 0;
              let vembeds = []
              let theembeds = [OverviewEmbed, ...allotherembeds_eachcategory()];
              for (const value of b ?.values) {
                switch (value.toLowerCase()) {
                  case "overview": index = 0; break;
                  case "information": index = 1; break;
                  case "music": index = 4; break;
                  case "customqueue": index = 6; break;
                  case "admin": index = 7; break;
                  case "setup": index = 8; break;
                  case "settings": index = 9; break;
                  case "owner": index = 10; break;
                  case "soundboard": index = 13; break;
                  case "voice": index = 14; break;
                  case "customcommand": index = 19; break;
                }
                vembeds.push(theembeds[index])
              }
              b ?.reply({
                embeds: vembeds,
                ephemeral: true
              });
            }
          } catch (e) {
            console.log(e.stack ? String(e.stack).grey : String(e).grey)
            console.log(String(e).italic.italic.grey.dim)
          }
        });

        collector.on('end', collected => {
          //array of all disabled buttons
          // let d_buttonRow = new MessageActionRow()
          //  const alldisabledbuttons = [d_buttonRow]
          let d_buttonRow = new MessageActionRow().addComponents([button_back.setDisabled(true), button_forward.setDisabled(true), button_tutorial])
          const alldisabledbuttons = [d_buttonRow]
          if (!edited) {
            edited = true;
            helpmsg.edit({ content: handlemsg(client.la[ls].cmds.info.help.timeended, { prefix: prefix }), embeds: [helpmsg.embeds[0]], components: alldisabledbuttons }).catch((e) => { })
          }
        });
      }
      function allotherembeds_eachcategory(filterdisabled = false) {
        //ARRAY OF EMBEDS
        var embeds = [];

        //INFORMATION COMMANDS
        var embed0 = new MessageEmbed()
          .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "🔰 Info").size}\`] <:emoji_4:995518947212414986> Information Commands <:emoji_4:995518947212414986>`)
          .setDescription(`>>> *${client.commands.filter((cmd) => cmd.category === "🔰 Info").sort((a, b) => a.name.localeCompare(b ?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
          .addField(`<:747959:995732178031886396> **User Commands**`, "-" + client.commands.filter((cmd) => cmd.category === "🔰 Info" && cmd.type === "user").sort((a, b) => a.name.localeCompare(b ?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          .addField(`<:747908:995730136370511893> **Games Related Commands**`, ">" + client.commands.filter((cmd) => cmd.category === "🔰 Info" && cmd.type === "games").sort((a, b) => a.name.localeCompare(b ?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          .addField(`<:747908:995730136370511893> **Server Related Commands**`, ">" + client.commands.filter((cmd) => cmd.category === "🔰 Info" && cmd.type === "server").sort((a, b) => a.name.localeCompare(b ?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          .addField(`<:747908:995730136370511893> **Bot Related Commands**`, ">" + client.commands.filter((cmd) => cmd.category === "🔰 Info" && cmd.type === "bot").sort((a, b) => a.name.localeCompare(b ?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          .addField(`<:747908:995730136370511893> **Util Related Commands**`, ">" + client.commands.filter((cmd) => cmd.category === "🔰 Info" && cmd.type === "util").sort((a, b) => a.name.localeCompare(b ?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
        embeds.push(embed0)

        //MUSIC COMMANDS type: song, queue, queuesong, bot
        var embed3 = new MessageEmbed()
          .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "<:emoji_2:995517800032518154> Music").size}\`] <:emoji_2:995517800032518154> Music Commands <:emoji_2:995517800032518154> | ${settings.MUSIC ? "<a:yes:833101995723194437> ENABLED" : "<:no:833101993668771842> DISABLED"}`)
          .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "🎶 Music").sort((a, b) => a.name.localeCompare(b ?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
          .addField("\u200b", "__**Sub-Categorized Commands:**__")
          .addField("<:747908:995730136370511893> **Queue Commands**", "> " + client.commands.filter((cmd) => cmd.category === "🎶 Music" && cmd.type.includes("queue")).sort((a, b) => a.name.localeCompare(b ?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          .addField("<:747908:995730136370511893> **Song Commands**", "> " + client.commands.filter((cmd) => cmd.category === "🎶 Music" && cmd.type.includes("song")).sort((a, b) => a.name.localeCompare(b ?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          .addField("<:747908:995730136370511893> **Bot Commands**", "> " + client.commands.filter((cmd) => cmd.category === "🎶 Music" && cmd.type.includes("bot")).sort((a, b) => a.name.localeCompare(b ?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
        if (!filterdisabled || settings.MUSIC || settings.showdisabled) embeds.push(embed3)

        //CUSTOM QUEUE COMMANDS
        var embed5 = new MessageEmbed()
          .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "⚜️ Custom Queue(s)").first().extracustomdesc.length}\`] ⚜️ Custom Queue(s) Commands ⚜️ | ${settings.CUSTOMQUEUE ? "<a:yes:833101995723194437> ENABLED" : "<:no:833101993668771842> DISABLED"}`)
          .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "⚜️ Custom Queue(s)").first().extracustomdesc.split(",").map(i => i ?.trim()).join("︲")}*`)
          .addField("\u200b", "\u200b")
          .addField("<a:yes:833101995723194437>  **Usage**", "> " + client.commands.filter((cmd) => cmd.category === "⚜️ Custom Queue(s)").first().usage)
        if (!filterdisabled || settings.CUSTOMQUEUE || settings.showdisabled) embeds.push(embed5)

        //ADMINISTRATION
        var embed6 = new MessageEmbed()
          .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "🚫 Administration").size}\`] 🚫 Admin Commands 🚫`)
          .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "🚫 Administration").sort((a, b) => a.name.localeCompare(b ?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
          .addField("\u200b", "__**Sub-Categorized Commands:**__")
          .addField("<:Discord:787321652345438228> **Server Related Commands**", "> " + client.commands.filter((cmd) => cmd.category === "🚫 Administration" && cmd.type.includes("server")).sort((a, b) => a.name.localeCompare(b ?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          .addField("<:Channel:895066899619119105> **Channel Related Commands**", "> " + client.commands.filter((cmd) => cmd.category === "🚫 Administration" && cmd.type.includes("channel")).sort((a, b) => a.name.localeCompare(b ?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          .addField("<:ThreadChannel:895066899891753021> **Thread Related Commands**", "> " + client.commands.filter((cmd) => cmd.category === "🚫 Administration" && cmd.type.includes("thread")).sort((a, b) => a.name.localeCompare(b ?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          .addField("<:Roles:895066900105674822> **Role Related Commands**", "> " + client.commands.filter((cmd) => cmd.category === "🚫 Administration" && cmd.type.includes("role")).sort((a, b) => a.name.localeCompare(b ?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          .addField("🙂 **Member Related Commands**", "> " + client.commands.filter((cmd) => cmd.category === "🚫 Administration" && cmd.type.includes("member")).sort((a, b) => a.name.localeCompare(b ?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
        embeds.push(embed6)

        //SETUP
        var embed7 = new MessageEmbed()
          .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "💪 Setup").size}\`] <:emoji_45:987114023294214264> Setup Commands <:emoji_45:987114023294214264>`)
          .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "💪 Setup").sort((a, b) => a.name.localeCompare(b ?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
          .addField("\u200b", "__**Sub-Categorized Commands:**__")
          .addField("<:emoji_46:987114066818527262> **Setups for Entertainment**", "> " + client.commands.filter((cmd) => cmd.category === "💪 Setup" && cmd.type.includes("fun")).sort((a, b) => a.name.localeCompare(b ?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          .addField("<:emoji_45:987114023294214264> **Information & Manage (Bot/Server) Settings**", "> " + client.commands.filter((cmd) => cmd.category === "<:emoji_45:987114023294214264> Setup" && cmd.type.includes("info")).sort((a, b) => a.name.localeCompare(b ?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          .addField("<:emoji_45:987114023294214264> **Most used Systems**", "> " + client.commands.filter((cmd) => cmd.category === "💪 Setup" && cmd.type.includes("system")).sort((a, b) => a.name.localeCompare(b ?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          .addField("<:Builder:866089513654419466> **Security Systems**", "> " + client.commands.filter((cmd) => cmd.category === "💪 Setup" && cmd.type.includes("security")).sort((a, b) => a.name.localeCompare(b ?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
        embeds.push(embed7)

        //Settings
        var embed8 = new MessageEmbed()
          .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "<:emoji_46:987114066818527262> Settings").size}\`] <:emoji_46:987114066818527262> Settings Commands <:emoji_46:987114066818527262>`)
          .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "<:emoji_46:987114066818527262> Settings").sort((a, b) => a.name.localeCompare(b ?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
          .addField("\u200b", "__**Sub-Categorized Commands:**__")
          .addField("<:emoji_46:987114066818527262> **User Related Commands**", "> " + client.commands.filter((cmd) => cmd.category === "<:emoji_46:987114066818527262> Settings" && cmd.type.includes("user")).sort((a, b) => a.name.localeCompare(b ?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          .addField("<:Bot_Flag:835928340715012137> **Bot Related Commands**", "> " + client.commands.filter((cmd) => cmd.category === "<:emoji_46:987114066818527262> Settings" && cmd.type.includes("bot")).sort((a, b) => a.name.localeCompare(b ?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          .addField("<:emoji_55:987114515671957515> **Music Related Commands**", "> " + client.commands.filter((cmd) => cmd.category === "<:emoji_46:987114066818527262> Settings" && cmd.type.includes("music")).sort((a, b) => a.name.localeCompare(b ?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
        embeds.push(embed8)

        //Owner
        var embed9 = new MessageEmbed()
          .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "<:emoji_52:987114271223730276> Owner").size}\`] <:emoji_52:987114271223730276> Owner Commands <:emoji_52:987114271223730276>`)
          .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "<:emoji_52:987114271223730276> Owner").sort((a, b) => a.name.localeCompare(b ?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
          .addField("\u200b", "__**Sub-Categorized Commands:**__")
          .addField("<:Discord:787321652345438228> **Information & Manage**", "> " + client.commands.filter((cmd) => cmd.category === "<:emoji_52:987114271223730276> Owner" && cmd.type.includes("info")).sort((a, b) => a.name.localeCompare(b ?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          .addField("<:Bot_Flag:835928340715012137> **Adjust the Bot**", "> " + client.commands.filter((cmd) => cmd.category === "<:emoji_52:987114271223730276> Owner" && cmd.type.includes("bot")).sort((a, b) => a.name.localeCompare(b ?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
        embeds.push(embed9)



        //SOUNDBOARD COMMANDS
        var embed12 = new MessageEmbed()
          .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "🔊 Soundboard").size}\`] 🔊 Soundboard Commands 🔊 | ${settings.SOUNDBOARD ? "<a:yes:833101995723194437> ENABLED" : "<:no:833101993668771842> DISABLED"}`)
          .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "🔊 Soundboard").sort((a, b) => a.name.localeCompare(b ?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
        if (!filterdisabled || settings.SOUNDBOARD || settings.showdisabled) embeds.push(embed12)

        //Voice COMMANDS
        var embed13 = new MessageEmbed()
          .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "🎤 Voice").first().extracustomdesc.length}\`] 🎤 Voice Commands 🎤 | ${settings.VOICE ? "<a:yes:833101995723194437> ENABLED" : "<:no:833101993668771842> DISABLED"}`)
          .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "🎤 Voice").first().extracustomdesc.split(",").map(i => i ?.trim()).join("︲")}*`)
          .addField("\u200b", "\u200b")
          .addField("<a:yes:833101995723194437>  **Usage**", "> " + client.commands.filter((cmd) => cmd.category === "🎤 Voice").first().usage)
        if (!filterdisabled || settings.VOICE || settings.showdisabled) embeds.push(embed13)


        //CUSTOM COMMANDS EMBED
        var embed18 = new MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["info"]["help"]["variable23"]))
        let cuc = client.customcommands.get(message.guild.id, "commands");
        if (cuc.length < 1) cuc = ["NO CUSTOM COMMANDS DEFINED YET, do it with: `!setup-customcommands`"]
        else cuc = cuc.map(cmd => `\`${cmd.name}\``)
        const items = cuc
        embed18.setTitle(eval(client.la[ls]["cmds"]["info"]["help"]["variable24"]))
        embed18.setDescription(">>> " + items.join("︲"))
        embeds.push(embed18)

        return embeds.map((embed, index) => {
          return embed
            .setColor(es.color)
            .setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null)
            .setFooter(client.getFooter(`Page ${index + 1} / ${embeds.length}\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL()));
        })
      }
    } catch (e) {
      console.log(String(e.stack).grey.bgRed)
      return message.reply({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(client.getFooter(es))
          .setTitle(client.la[ls].common.erroroccur)
          .setDescription(eval(client.la[ls]["cmds"]["info"]["color"]["variable2"]))
        ]
      });
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
