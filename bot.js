// https://discordapp.com/oauth2/authorize?client_id=&scope=bot

const Discord = require('discord.js');
const bot = new Discord.Client();
const PREFIX = '.';
const Version = '1.3 Alpha';
const CurrCmds = 'warning,ping, disclaimer, info, purge, kick, ban, prefix, userinfo, serverinfo, whoisdvs, whoisjeff, whoiszac';
var start = true

const Token = '';

const snekfetch = require('snekfetch');
const antispam = require('discord-anti-spam');
const search = require('yt-search')

const client = new Discord.Client();
const ownerID = 380612857144016897
const active = new Map()

bot.on('ready', () => {

    console.log('ModBot is online. ModBot Version:', Version);
    bot.user.setActivity('this server', {
        type: 'WATCHING'
    }).catch(console.error);
    // Anti-Spam Client
    antispam(client, {
        warnBuffer: 3, // Maximum ammount of messages allowed to send in the interval time before getting warned.
        maxBuffer: 5, // Maximum amount of messages allowed to send in the interval time before getting banned.
        interval: 2000, // Amount of time in ms users can send the maxim amount of messages(maxBuffer) before getting banned. 
        warningMessage: "Please stop spamming", // Message users receive when warned. (message starts with '@User, ' so you only need to input continue of it.) 
        banMessage: "has been hit by ban hammer for spamming!", // Message sent in chat when user is banned. (message starts with '@User, ' so you only need to input continue of it.) 
        maxDuplicatesWarning: 7, // Maximum amount of duplicate messages a user can send in a timespan before getting warned.
        maxDuplicatesBan: 10, // Maximum amount of duplicate messages a user can send in a timespan before getting banned.
        deleteMessagesAfterBanForPastDays: 7, // Deletes the message history of the banned user in x days.
        exemptRoles: ["Owner"], // Name of roles (case sensitive) that are exempt from spam filter.
        exemptUsers: ["CrypticDevv"] // The Discord tags of the users (e.g: MrAugu#9016) (case sensitive) that are exempt from spam filter.
    });
})

bot.on('message', async message => {

    let args = message.content.slice(PREFIX.length).trim().split(' ')
    let cmd = args.shift().toLowerCase();

    if (message.author.bot) return;
    if (!message.content.startsWith(PREFIX)) return;
    // Other Commands
    switch (args[0]) {

        // Miscellaneous Commands
        case ('disclaimer'):
            message.channel.send('This bot is developed by CrypticDevv. This is a still a Alpha.');
            break;
        case ('ping'):
            message.channel.send('Pong! Your ping is `' + `${Date.now() - message.createdTimestamp}` + ' ms`');
            break;
        case ('botinfo'):
            var myInfo = new Discord.RichEmbed()
            var botIcon = message.guild.iconURL
                .setTitle('Modapro™')
                .setThumbnail(botIcon)
                .addField('Bot Name', 'Modapro')
                .addField('Developers:', 'Main commands developed by CrypticDevv, Music commands developed by Existance')
                .addField('How do I see all the commands?', 'Do .cmds')
                .addField('What do I do?', 'My purpose is to replace all bots in the Discord!')
                .addField('Current Version', Version)
                .addField('Report a bug?', 'DM @CrypticDevv!')
                .setColor(0x008000)
            message.channel.send(myInfo)
            break;
        case ('serverinfo'):
            var serverIcon = message.guild.iconURL
            var region = message.guild.region.replace(/-/g, ' ').capitalise(true);
            var members = Array.from(message.guild.member.values()).filter(mem => !mem.user.bot).length;

            let serverEmbed = new Discord.RichEmbed
                .setTitle('Server Infomation')
                .setThumbnail(serverIcon)
                .addField('Server Name', `${message.guild.name} (${message.guild.nameAcronym})`, true)
                .addField('Server Owner', message.guild.owner.user.tag, true)
                .addField('Region', region)
                .addField('Members', members)
                .addField('Member Count', message.guild.memberCount)

            message.channel.send(serverEmbed)
            break;
        case ('purge'):
            let deletemessage = new Discord.RichEmbed()
                .setColor("#44ff47")
                .addField("**Messages purged:**", `${args[0]}`)
                .setTimestamp(message.author.presence.activity)


            let usage = new Discord.RichEmbed()
                .setColor("#ff0000")
                .addField("**Please provide a number**", "**between** `2-100`")
                .setTimestamp(message.author.presence.activity)

            let noperms = new Discord.RichEmbed()
                .setColor("#ff0000")
                .addField("**You don't have permission to use**", "**.purge**")
                .setTimestamp(message.author.presence.activity)

            if (!message.member.hasPermission("BAN_MEMBERS")) {
                message.channel.send(noperms).then(msg => {
                    msg.delete(5000)
                });
            }
            if (!args[0] || args[0] < 2 || args[0] > 100 || isNaN(args[0])) {
                message.channel.send(usage).then(msg => {
                    msg.delete(5000)
                });
            }
            message.channel.bulkDelete(args[0]).then(() => {
                message.channel.send(deletemessage).then(msg => {
                    msg.delete(5000)
                });
            });
            break;
        case ('cmds'):
            message.channel.send('Current Commands:');
            message.channel.send(CurrCmds);
            break;
        case ('prefix'):
            message.channel.send('The prefix of this server is ```.```')
            break;
        case ('il'):
            message.channel.send('Invite Link: https://discordapp.com/oauth2/authorize?client_id=581704684780257300&scope=bot');
            break;
        case ('poll'):

            break;
            // Moderation Code
        case ('kick'):
            if (member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {
                if (!args[1]) message.channel.send('Specify a user.')

                const user1 = message.mentions.users.first();

                if (user1) {
                    const member = message.guild.member(user1);

                    if (member) {
                        member.kick('You were kicked from the Server!').then(() => {
                            message.reply(`Successfully Kicked ${user1.tag}`);
                        }).catch(err => {
                            message.reply('Unable to kick member.');
                            console.log(err);
                        })
                    } else {
                        message.reply("User not found.")
                    }
                } else {
                    message.reply('User not found.')
                }
            } else {
                channel.message.send('You do not have access to this command.')
            }
            break;
        case ('ban'):
            if (member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {
                if (!args[1]) message.channel.send('Specify a user.')

                const user2 = message.mentions.users.first();

                if (user2) {
                    const member = message.guild.member(user2);

                    if (member) {
                        member.ban('You were banned from the Server!').then(() => {
                            message.reply(`Successfully Banned ${user2.tag}`);
                        }).catch(err => {
                            message.reply('Unable to ban member.');
                            console.log(err);
                        })
                    } else {
                        message.reply("User not found.")
                    }
                } else {
                    message.reply('User not found.')
                }
            } else {
                channel.message.send('You do not have access to this command.')
            }
            break;

            // Fun Commands
        case ('il'):
            message.channel.send('Invite Link: https://discordapp.com/oauth2/authorize?client_id=581704684780257300&scope=bot');
            break;
        case ('spam'):

            while (count = args[1]) {
                message.channel.send('Spam')
            }
            break;
        case ('8ball'):
            var randomnumber = Math.floor(Math.random() * 8 + 1)

            ballMessage = message.content.slice(7)

            var number = 0;

            switch (randomnumber) {
                case 1:
                    var ballreponse = "It is certain"
                    break;
                case 2:
                    var ballreponse = "My sources say no"
                    break;
                case 3:
                    var ballreponse = "Answer hazy, try again"
                    break;
                case 4:
                    var ballreponse = "Most likely"
                    break;
                case 5:
                    var ballreponse = "I think you should let it pass"
                    break;
                case 6:
                    var ballreponse = "I think so"
                    break;
                case 7:
                    var ballreponse = "Im not sure...try again"
                    break;
                case 8:
                    var ballreponse = "Heard its bad for you, no"
                    break;
            }
            console.log(ballMessage)

            try {
                var myInfo = new Discord.RichEmbed()
                    .setTitle(message.author.user)
                    .addField(' :question: Question ', ballMessage)
                    .addField(':8ball: 8Ball ', ballreponse)
                    .setColor(0xFF0000)
                message.channel.send(myInfo)

            } catch (err) {
                message.reply('You need to include a question!')
            }
            case ('meme'):
                var meme = true
                while (meme) {
                    try {
                        const {
                            body
                        } = await snekfetch
                            .get('https://www.reddit.com/r/dankmemes.json?sort=top&t=week')

                            .query({
                                limit: 800
                            });
                        const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
                        if (!allowed.length) return message.channel.send('It seems we are out of fresh posts!, Try again later.');
                        const randomnumber = Math.floor(Math.random() * allowed.length)
                        const embed = new Discord.RichEmbed()
                            .setColor(0x00A2E8)
                            .setTitle(allowed[randomnumber].data.title)
                            .setDescription("Posted by: " + allowed[randomnumber].data.author)
                            .setImage(allowed[randomnumber].data.url)
                            .addField("Other info:", "Upvotes: " + allowed[randomnumber].data.ups + " / Comments: " + allowed[randomnumber].data.num_comments)
                            .setFooter("Meme provided by r/dankmemes.")
                        message.channel.send(embed)
                        meme = false
                    } catch (err) {
                        return console.log(err);
                    }
                }
                break;
            case ('coin'):
                var num = 0
                num = Math.floor((Math.random() * 2) + 1)
                switch (num) {
                    case 1:
                        message.channel.send('Heads!')
                        break;
                    case 2:
                        message.channel.send('Tails!')
                        break;
                }
                break;
            case ('say'):
                if (message.deletable) message.delete();

                if (args.length < 0) return message.reply(`Nothing to say?`).then(m => m.delete(5000));

                // Role color
                const roleColor = message.guild.me.highestRole.hexColor;

                // If the first argument is embed, send an embed,
                // otherwise, send a normal message
                if (args[0].toLowerCase() === "embed") {
                    const embed = new RichEmbed()
                        .setDescription(args.slice(1).join(" "))
                        .setColor(roleColor === "#000000" ? "#ffffff" : roleColor)
                        .setTimestamp()
                        .setImage(client.user.displayAvatarURL)
                        .setAuthor(message.author.username, message.author.displayAvatarURL);

                    message.channel.send(embed);
                } else {
                    message.channel.send(args.join(" "));
                }
                break;
            case ('creeper'):
                message.channel.send('Aw man...')
                // message.channel.send('Join the music voice channel!')
                break;
            case ('st'):
                message.channel.send('Bot Terminated.')
                await process.exit()
                console.log('Bot Terminated by', message.author.username)
                break;
            case (''):

                break;
    }
    client.emit('checkMessage', message);
})


bot.login(Token);
