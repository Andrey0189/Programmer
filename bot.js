/*
*Внимание!
*Представленный ниже код свободен для использования (open-source)
*
*Если вы хотите связатся с автором, то вы можете это сделать можно через Discord
*
*Discord: ANDREY#8389
*
*Бот создан для IT Team.
*
*Discord IT Team сервер поддержки бота: https://discord.gg/yPpvbPp
*
**/
const Discord = require(`discord.js`); //Поделючение d.js
const client = new Discord.Client(); //Клиент бота
const fs = require(`fs`); //Подключение fs
const { inspect } = require(`util`); //Подключение util
const request = require(`request`); //Подключение reqest
const mongoose = require(`mongoose`); //Подключение mongoose
const db = require(`./db`);
let commands = require(`./Storage/commands.json`); //Подключение commands.json
/** @namespace process.env.BOT_TOKEN */ //process.env
module.exports = {
    0: `0⃣`, 1: `1⃣`,
    2: `2⃣`, 3: `3⃣`, 4: `4⃣`, 5: `5⃣`,
    6: `6⃣`, 7: `7⃣`, 8: `8⃣`, 9: `9`,
    10: `🔟`,
}; //module.exports Эмодзи для реакций
const emojis = {
    yoba: '469876460006670346'
}
let prefix = `=`; //Префикс
let currency = `₽`; //Валюта
//Роли
let people = `489338031350743052`
let muted = `469135765427847178`
//Другие переменные и константы
const bot_name = `Программист`;
const version = `v1.5.0`
const update = `Вышла новая версия ${version}. Обновления:\n\n1. Убраны команды для которых используется DataBase\n\n2. Изменена команда =help\n\n3. Добален модуль Fun`;
const footer = `${bot_name} | ${version} | Все права защищены`
const creator = `242975403512168449`;
const it = [`437290658458501143`, `492028421317328897`]
const hexreg = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
const inviteReg = /https:\/\/discord(app\.com|\.gg|\.me|\.io)\/?(invite\/)?([_a-zA-Z0-9]{5,32})/gi
//Функции
//Функция для генерации случайного числа от min до max
function randomInteger(min, max) {
    max++
    return Math.floor(Math.random() * (max - min)) + min;
}
//Функция для замены окончания слова в заисимости от числительного
function declOfNum(number, titles) {
    let cases = [2, 0, 1, 1, 1, 2];
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}
//Функция для добавления нескольких реакций под сообщение
async function multipleReact(message, arr) {
    if (arr !== []) {
        await message.react(arr.shift()).catch(console.error).then(function () {multipleReact(message,arr).catch();});
    }
}
//Функция для устнаовки большого таймаута
function setBigTimeout(func, timeout) {
    if (timeout > 0x7FFFFFFF)
        setTimeout(function() {setBigTimeout(func, timeout-0x7FFFFFFF);}, 0x7FFFFFFF);
    else
        setTimeout(func, timeout);
}
client.on(`guildMemberAdd`, (member) => {
    if (!it.includes(member.guild.id)) return;
    let color = `#${(Math.random() * 0xFFFFFF<<0).toString(16)}`
    member.addRole(people);
    member.guild.createRole({
        "permissions" : 0,
        "name" : `🖌️║Random color ${color}║🎨`, 
        "color" : color
    }).then(role => member.addRole(role));
    const embed = new Discord.RichEmbed()
        .setTitle(`Дороу`)
        .setDescription(`**Приветствую тебя ${member}, я - бот этого сервера. У меня есть магазин, экономика, миниигры, большое количесто команд. А на нашем сервере ты сможешь найти хороших друзей, конкурсы, возможность поделиться своим творчеством, и посмотреть как его оценят другие люди. В скором времени у нас выйдет много обновлений. С уважением ${bot_name} ${version}**`)
        .setColor(`af00ff`)
        .setFooter(footer)
        .setTimestamp();
        member.send({embed}).catch(() => {console.log(`Ошибка при отправке приветствия`)});
    console.log(`Приветствие отправлено успешно успешно`); 
    const embed2 = new Discord.RichEmbed()
        .setTitle(`Пополнение!`)
        .setColor(`af00ff`)
        .setDescription(`На сервер **${member.guild.name}** пришел ${member}(${member.user.tag})\n\nУчастников на этом сервере теперь **${member.guild.memberCount}**`)
        .setFooter(footer)
        .setTimestamp()
        client.fetchUser(creator).then (user => user.send({embed: embed2}).catch(() => {console.log(`Ошибка при отправки сообщения о пополнении`)}));
        client.channels.get(`489119691504222257`).send(`${member}(${member.user.tag}) Прилетел на сервер. Нас стало **${member.guild.memberCount}**`);
});
//Событие ухода мембера с сервера
client.on(`guildMemberRemove`, (member) => {
    if (!it.includes(member.guild.id)) return;
    member.send(`Прощай, ${member}. Мы будем скучать`);
    const embed = new Discord.RichEmbed()
        .setTitle(`Он ушел`)
        .setColor(`af00ff`)
        .setDescription(`${member} ушел :(.\n\nТеперь нас **${member.guild.memberCount}**`)
        .setFooter(footer)
        .setTimestamp()
        client.fetchUser(creator).then (user => user.send({embed}));
        client.channels.get(`489119691504222257`).send(client.channels.get(`489119691504222257`).send(`${member}(${member.user.tag}) Покинул сервер. Нас стало **${member.guild.memberCount}**`));
});
//То что должно произойти после запуска бота
client.on(`ready`, () => {
    client.user.setActivity(prefix + `help`,{ type: 0 });
    console.log(`Бот запущен успешно\n    Экономика работает...\n    Команды работают...\n    Количество гильдий на которых присутствует бот: ${client.guilds.size}`);
});
client.on(`message`, (message) => {
    if(message.channel.type !== `text`) return;
    if(message.channel.id === `489114682737688577`) return;
    //??? - 268495872
    if (message.author.bot) return;
    if (!it.includes(message.guild.id)) {
        message.channel.send('Теперь бот "Программист" принадлежит исключительно серверу IT Team. Если вам нужен такой бот как я, то обратитесь к `ANDREY#8389`. Желаю всем удачи и пока!')
        message.guild.leave().catch();
    }
    mongoose.connect(`mongodb://localhost/userData`); //Подключение базы данных userData
    let arr = [];
    message.guild.fetchInvites().then(invites => {
    invites.forEach(invite => {
        arr.push(invite.code); 
    })
    let matches = message.content.match(inviteReg);
    if (matches)
    matches.forEach((match) => {
    if (!arr.includes(match.match(inviteReg)[3])) {
        const embed = new Discord.RichEmbed()
            .setTitle(`Информация о предупреждениях`)
            .setColor(`af00ff`)
            .setDescription(`Вы были **предупреждены**.\n\nПричина:** Пиар.**\n\nНе ведите себя плохо!`)
            .setFooter(footer)
            .setTimestamp();
        message.author.send({embed});
        message.channel.send(`${message.author} был предупрежден. Причина: пиар.`);
        message.delete();
    }
    })
    });
    if (['@someone', '=someone'].includes(message.content)) {
        let lennys = ['༼ つ ◕◕ ༽つ', '(╯°□°）╯︵ ┻━┻', 'ヽ༼ ಠ益ಠ ༽ﾉ', '(◕‿◕✿)', '(∩ ͡° ͜ʖ ͡°)⊃━☆ﾟ. o ･ ｡ﾟ', '༼ つ ◕_◕ ༽つ', '(∩ ͡° ͜ʖ ͡°)⊃━✿✿✿✿✿✿', '（✿ ͡◕ ᴗ◕)つ━━✫・o。']
        message.channel.send(`**@someone** ${lennys[randomInteger(0, lennys.length - 1)]} ***(${message.guild.members.random()})***`);
    }
    if(message.content.indexOf(prefix) !== 0) return;
    const poll = message.content.slice(prefix.length).trim().split(/;+/g);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    function sendMsg (msg) {
        message.channel.send(msg)
    }
    function actMSg (actType, actioner, time, reason) {
        let act = ``;
        let desc = ``;
        let other = ``;
        if (actType === 'mute') {act = 'замучены'; desc = `Время: **${time}**\n`; other = '\n\nНе ведите себя плохо!'}
        if (actType === 'warn') {act = 'предупреждены'; other = '\n\nНе ведите себя плохо!'} 
        if (actType === 'ban') {act = 'забанены'; other = '\n\nНе ведите себя плохо!'}
        if (actType === 'unban') {act = 'разбанены';}
        if (actType === 'kick') {act = 'выгнаны'; other = '\n\nНе ведите себя плохо!'}
        if (actType === 'unmute') {act = 'размучены'}
        if (reason === 'autoUnmt') {actioner = bot_name; reason = 'Автоматический размут'}
        if (reason === undefined) reason = 'Не указана'
        const embed = new Discord.RichEmbed()
        .setColor("af00ff")
        .setTitle(`Вы были ${act} на ${message.guild.name}`)
            .setDescription(`\nПользователем: **${actioner}**\n${desc} Причина: **${reason}** \n\n**${other}**`)
            .setFooter(footer)
            .setTimestamp();
        return embed;
    }
    function err (reason, missPerms) {
        if (!missPerms) {
            const embed = new Discord.RichEmbed()
            .setTitle("Произошла ошибка")
            .setColor("ff0000")
            .setDescription('Причина : **' + reason + '**')
            .setFooter(bot_name + ' | ' + version + ' | ' + 'Все права защищены')
            .setTimestamp();
            return message.channel.send({embed})
        }
        const embed = new Discord.RichEmbed()
            .setTitle("Недостаточно прав")
            .setColor("ff0000")
            .setDescription('Вы не можете использовать эту команду\nУ вас должно быть право `' + missPerms + '`')
            .setFooter(bot_name + ' | ' + version + ' | ' + 'Все права защищены')
            .setTimestamp();
            return message.channel.send({embed})
    } 
    function succ (msg) {
        const embed = new Discord.RichEmbed()
            .setTitle("Успех")
            .setColor("0097f6")
            .setDescription(msg)
            .setFooter(bot_name + ' | ' + version + ' | ' + 'Все права защищены')
            .setTimestamp();
            return message.channel.send({embed})
    }
    let ecoCmds = ['money', 'bal', 'balance', 'cash', 'mon', 'add-money', 'am', 'a-m', 'remove-money', 'r-m', 'rm', 'give-money', 'gm', 'g-m', 'pay', 'reset-all-stats', 'ras', 'r-a-s'];
    let reactCmds = ['hug', 'kiss', 'slap', 'pat', 'poke', 'cuddle', 'tickle', 'feed', 'baka'];
    let acts = ['обнял(а)', 'поцеловал(а)', 'дал(а) пощечину', 'погладил(а) по голове', 'тыкнул(а) в', 'прижался(ась) к', 'пощекотал(а)', 'дал(а) еды', 'обозвал(а)'];
    if (reactCmds.includes(command)) {
        let user = message.mentions.members.first();
        if (!args[0]) user = client.user
            if (!user) user = args[0];
            let act = '';
            for (let i = 0; i <= reactCmds.length; i++) {
                if (command === reactCmds[i]) {
                    act = acts[i] 
                    request('https://nekos.life/api/v2/img/' + command, function (error, response, body) {
                        let arr = JSON.parse(body);
                        let embed = new Discord.RichEmbed()
                        .setDescription(`${message.author} **${act}** ${user}`)
                        .setImage(arr['url'])
                        .setColor('af00ff')
                        .setFooter(footer) 
                        .setTimestamp();
                        message.channel.send({embed}).then(()=> {message.delete();})
                    });
                }
            }
    }
    //people - 104188928
    //plus - 104193088
    //premium - 104193088
    //watcher - 104193216 
    //epic - 104332736
    if (command === 'test') {
        const embed = new Discord.RichEmbed()
        .setTitle(`Бот "${bot_name}"`)
        .setThumbnail(client.user.avatarURL)
        .addField(`Пинг :ping_pong:`, `${Math.round(client.ping)} ms`, true)
        .addField(`Юзеры :bust_in_silhouette:`, `${client.users.size} users`, true)
        .addField(`Каналы :keyboard:`, `${client.channels.size} channels`, true)
        .addField(`Сервера :desktop:`, `${client.guilds.size} servers`, true)
        .addField(`Создатели :hammer_pick:`, `ANDREY#8389`, true)
        .addField(`Работает на :computer:`, `JS, node.js, discord.js 11.4.2`, true)
        .addField(`Время работы :stopwatch:`, `${Math.round(client.uptime / (1000 * 60 * 60))} hours, ${Math.round(client.uptime / (1000 * 60)) % 60} minutes`, true)
        .addField(`Включен :on:`, client.readyAt.toString().slice(4, -15), true)
        .addField(`Версия :floppy_disk:`, version, true)
        .addField(`Авторизация :key:`, client.user.tag, true)
        .addField(`Эмодзи :joy:`, `${client.emojis.size} emojis`, true)
        .addField(`Голосовые каналы :microphone:`, `${client.voiceConnections.size} channels`, true)
        .addField(`Шарды :gem:`, `${client.options.shardCount} shards`, true)
        .setColor('af00ff')
        message.channel.send({embed});
    }
    if (['emoji-info', 'ei', 'e-i'].includes(command)) {
        if (!args[0]) return err('Пустотный эмодзи???')
        if (args[0].match(/<:\w+:\d+>/)) args[0] = args[0].slice(2).slice(0, -20)
        if (!message.guild.emojis.find('name', args[0])) return err('Я не могу найти эмодзи "' + args[0] + '"');
        let emoji = message.guild.emojis.find('name', args[0]);
        emoji.fetchAuthor().then(author => {
            const embed = new Discord.RichEmbed()
            .setTitle(`Эмодзи ${emoji}`)
            .setColor(`af00ff`)
            .setThumbnail(emoji.url)
            .addField(`Имя`, emoji.name, true)
            .addField(`Приватен для?`, `${emoji.roles.size} ролей`, true)
            .addField(`Добавил`, author.tag, true)
            .addField(`Дата добавления`, emoji.createdAt.toString().slice(4, -15), true)
            .addField(`Анимированный?`, (emoji.animated?`Да`:`Нет`), true)
            .addField(`Ссылка`, emoji.url, true)
            message.channel.send({embed})
        })
    }
    if (['profile', 'prof'].includes(command)) {
        let user = message.mentions.members.first();
        if (!user) user = message.member;
        let stat
        if (user.user.presence.status === 'online') stat = 'Онлайн'
        if (user.user.presence.status === 'dnd') stat = 'Не беспокоить'
        if (user.user.presence.status === 'idle') stat = 'Не активен'
        if (user.user.presence.status === 'offline') stat = 'Оффлайн'
        let voiceChannel
        let voiceChannelGuild = ''
        if (!user.voiceChannel) {
            voiceChannel = 'Нет'
        }
        else {
            voiceChannel = user.voiceChannel.name
            voiceChannelGuild = `на **${user.voiceChannel.guild.name}**`
        }
        if (user.highestRole === null) user.highestRole = 'Нет'
        const embed = new Discord.RichEmbed()
        .setTitle(`Пользователь ${user.user.tag}`)
        .setColor(`af00ff`)
        .setThumbnail(user.user.avatarURL)
        .addField(`Авторизация :key:`, `${user.user}\n${user.user.tag}`, true)
        .addField(`Присоединился :inbox_tray:`, `На сервер: ${user.joinedAt.toString().slice(4, -15)}\nК Discord: ${user.user.createdAt.toString().slice(4, -15)}`, true)
        .addField(`Статус :bulb:`, stat, true)
        .addField(`В голосовом канале? :microphone2:`, `**${voiceChannel}** ${voiceChannelGuild}`, true)
        .addField(`Бот? :robot:`, (user.user.bot?`Да`:`Нет`), true)
        .addField(`Окрашивающая роль :paintbrush:`, user.colorRole, true)
        .addField(`Высшая роль :first_place:`, user.highestRole, true)
        message.channel.send({embed})
    }
    if (['server-info', 'si', 'guild-info', 'gi', 'g-i', 's-i'].includes(command)) {
        let afkChannel = 'Нет'
        let afkTimeout = 'Нет';
        let voiceChannels = [];
        let textChannels = [];
        let categoryChannels = [];
        let bots = [];
        let members = [];
        let verifLvl = message.guild.verificationLevel
        if (message.guild.afkChannel !== null) {
            afkChannel = message.guild.afkChannel.name
            afkTimeout = `${Math.round(message.guild.afkTimeout / 60)} minutes`
        }
        message.guild.region = message.guild.region[0].toUpperCase() + message.guild.region.slice(1)
        message.guild.fetchBans().then(bans => {
            message.guild.fetchInvites().then(invites => {
                message.guild.channels.forEach(channel => {
                    if (channel.type === "voice") voiceChannels.push(channel);
                    if (channel.type === "text") textChannels.push(channel);
                    if (channel.type === "category") categoryChannels.push(channel);
                })
                message.guild.members.forEach(member => {
                    if (member.user.bot) bots.push(member);
                    else members.push(member);
                })
                if (verifLvl === 0) verifLvl = 'Нет'
                if (verifLvl === 1) verifLvl = 'Низкий'
                if (verifLvl === 2) verifLvl = 'Средний'
                if (verifLvl === 3) verifLvl = '(╯°□°）╯︵ ┻━┻'
                if (verifLvl === 4) verifLvl = '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
                const embed = new Discord.RichEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL)
                .setColor('af00ff')
                .setThumbnail(message.guild.iconURL)
                .addField(`Сокращение :arrow_right: :arrow_left:`, message.guild.nameAcronym, true)
                .addField(`Создан :date:`, message.guild.createdAt.toString().slice(4, -15), true)
                .addField(`Основатель`, message.guild.owner.user.tag, true)
                .addField(`Пользователи :bust_in_silhouette:`, `${message.guild.memberCount} (${bots.length} bots, ${members.length} people)`, true)
                .addField(`AFK Канал :zzz:`, afkChannel, true)
                .addField(`AFK Тайм-аут :watch:`, afkTimeout, true)
                .addField(`Регион :globe_with_meridians:`, message.guild.region,true)
                .addField(`Количество банов :hammer:`, `${bans.size} bans`, true)
                .addField(`Каналы :mouse_three_button:`, `${message.guild.channels.size} (${voiceChannels.length} voice, ${textChannels.length} text, ${categoryChannels.length} categories)`, true)
                .addField(`Приглашения :inbox_tray:`, `${invites.size} invites`, true)
                .addField(`Роли :military_medal:`, `${message.guild.roles.size} roles`, true)
                .addField(`Эмодзи :joy:`, `${message.guild.emojis.size} emojis`, true)
                .addField(`Уровень верификации :gear:`, verifLvl, true)
                .addField(`Подтвержден? :white_check_mark:`, (message.guild.verified?'Да':'Нет'), true)
                message.channel.send({embed})
            })
        })
    }
    if (['role-info', 'ri', 'r-i'].includes(command)) {
        let role = message.mentions.roles.first();
        if (!role) {
            if (!message.guild.roles.find('name', args[0])) return err('Такой роли не существует');
            role = message.guild.roles.find('name', args[0])
        }
        let perms = [];
        if (role.hasPermission("ADMINISTRATOR")) perms.push('Администратор');
        else {
            if (role.hasPermission("VIEW_AUDIT_LOG")) perms.push('Просмотр журнала аудита :eye:');
            if (role.hasPermission("MANAGE_GUILD")) perms.push('Управление сервером :level_slider:');
            if (role.hasPermission("MANAGE_ROLES")) perms.push('Управление ролями :trophy:');
            if (role.hasPermission("MANAGE_CHANNELS")) perms.push('Управление каналами :keyboard:');
            if (role.hasPermission("KICK_MEMBERS")) perms.push('Кикать пользователей :point_right:');
            if (role.hasPermission("BAN_MEMBERS")) perms.push('Банить пользователей :hammer:');
            if (role.hasPermission("CREATE_INSTANT_INVITE")) perms.push('Создавать ссылки-приглашения :inbox_tray:');
            if (role.hasPermission("CHANGE_NICKNAME")) perms.push('Менять никнеймы :arrows_counterclockwise:');
            if (role.hasPermission("MANAGE_NICKNAMES")) perms.push('Управление никнеймами :arrows_counterclockwise: :level_slider:');
            if (role.hasPermission("MANAGE_EMOJIS")) perms.push('Управление эмодзи :joy:');
            if (role.hasPermission("MANAGE_WEBHOOKS")) perms.push('Управление вебхуками :gear:');
            if (role.hasPermission("VIEW_CHANNEL")) perms.push('Читать текстовые каналы и видеть голосовые каналы :eye_in_speech_bubble:');
            if (role.hasPermission("SEND_MESSAGES")) perms.push('Отправлять сообщения :speech_left:');
            if (role.hasPermission("SEND_TTS_MESSAGES")) perms.push('Отправлять /tts сообщения :speech_left: :loud_sound:');
            if (role.hasPermission("MANAGE_MESSAGES")) perms.push('Управление сообщениями :gear: :arrow_forward:');
            if (role.hasPermission("EMBED_LINKS")) perms.push('Встраивать ссылки :link:');
            if (role.hasPermission("ATTACH_FILES")) perms.push('Прикреплять файлы :file_folder:');
            if (role.hasPermission("READ_MESSAGE_HISTORY")) perms.push('Читать истоирию сообщений :clock3:');
            if (role.hasPermission("MENTION_EVERYONE")) perms.push('Упомянуть всех :loudspeaker:');
            if (role.hasPermission("USE_EXTERNAL_EMOJIS")) perms.push(`Использовать внешние эмодзи ${client.emojis.get(emojis.yoba)}`);
            if (role.hasPermission("ADD_REACTIONS")) perms.push('Добавлять реакции :grinning:');
            if (role.hasPermission("CONNECT")) perms.push('Подключиться :joystick:');
            if (role.hasPermission("SPEAK")) perms.push('Говорить :loud_sound:');
            if (role.hasPermission("MUTE_MEMBERS")) perms.push('Отключить голос другим :zipper_mouth:');
            if (role.hasPermission("DEAFEN_MEMBERS")) perms.push('Отключить звук другим :mute:');
            if (role.hasPermission("MOVE_MEMBERS")) perms.push('Перемещать пользователей :arrow_down:');
            if (role.hasPermission("USE_VAD")) perms.push('Использовать режим активации по голосу :lips:');
            if (role.hasPermission("PRIORITY_SPEAKER")) perms.push('Главный говорящий :microphone2:');
        }
        if (perms.length === 0) perms = ['Нет']
            const embed = new Discord.RichEmbed()
            .setTitle(`Права ${role.name}`)
            .setColor('af00ff')
            .addField(`Mention :regional_indicator_m:`, role, true)
            .addField(`Цвет :art:`, `${role.hexColor}`, true)
            .addField(`Создана :gear:`, role.createdAt.toString().slice(4, -15), true)
            .addField(`Отображается? :desktop:`, (role.hoist?'Да':'Нет'), true)
            .addField(`Упоминаемая? :bulb:`, (role.mentionable?'Да':'Нет'), true)
            .addField(`Права`, ':video_game:' , true)
            .setDescription(`**${perms.join('**\n**')}**`)
            message.channel.send({embed})
    }
    if (['money', 'bal', 'balance', 'cash', 'mon'].includes(command)) {
        let user = message.mentions.members.first();
        const embed = new Discord.RichEmbed();
        if (!user) {
            embed.setAuthor(message.member.displayName, message.author.avatarURL);
            user = message.author
        } else {
            embed.setAuthor(user.displayName, user.user.avatarURL)
            if (user.user.bot) return message.reply('Ошибка. Причина: **У ботов не может быть денег**');
        }
        db.findOne({userID: user.id, guildID: message.guild.id}, (err, userData) => {
            if (err) console.log(err)
            if (!userData) {
                userData = new db({
                    userID: user.id,
                    guildID: message.guild.id,
                    money: 0,
                    xp: 0
                })
                userData.save();
            }
            embed.setFooter(bot_name + " | " + version + " | Все права защищены")
            .setColor("af00ff") 
            .addField('Баланс', '**' + userData.money + currency + '**',true)
            message.channel.send({embed});
        })
    }
    if (['add-money', 'am', 'a-m', 'remove-money', 'r-m', 'rm'].includes(command)) {
        let user = message.mentions.members.first();
        let moneyToAddOrRemove = parseInt(args[1])       
        if (!user) return err('Не указан пользователь');
        if (user.user.bot) return err('У ботов не может быть денег');
        if (!message.member.hasPermission("MANAGE_ROLES")) return err(0, 'Управление ролями')
        db.findOne({userID: user.id, guildID: message.guild.id}, (err, userData) => {
            if (!userData) {
                userData = new db({
                    userID: user.id,
                    guildID: message.guild.id,
                    money: 0,
                    xp: 0
                })
            }
            if (args[0] === 'all') moneyToAddOrRemove = userData.money
            else if (!args[1] || isNaN(moneyToAddOrRemove)) return err('Не указано количество');
            if (command.match(/r/i))  {
                if (moneyToAddOrRemove > userData.money) return err('Уходить в долги нельзя');
                if (args[0] === 'all') moneyToAddOrRemove = userData.money
                userData.money = userData.money - moneyToAddOrRemove;
                succ(`Успешно списано со счета ${user} **${moneyToAddOrRemove}**${currency}`);
            } else {
                userData.money = userData.money + moneyToAddOrRemove;
                succ(`Пользователь ${user} успешно получил **${moneyToAddOrRemove}**${currency}`);            }
            userData.save();
        })
    }
    if (['give-money', 'gm', 'g-m', 'pay'].includes(command)) {
        let user = message.mentions.members.first();  
        let moneyToAdd = parseInt(args[1]);
        if (!user) return err('Не указан пользователь');
        if (!args[1] || isNaN(moneyToAdd)) return err('Не указано количество');
        if (user.user.bot) return err('У ботов не может быть денег');
        if (user === message.member) return err('Платить самому себе не выгодно');
        db.findOne({userID: user.id, guildID: message.guild.id}, (err, userData) => {
            if (!userData) {
                userData = new db({
                    userID: user.id,
                    guildID: message.guild.id,
                    money: 0,
                    xp: 0
                });
            };
            userData.money = userData.money + moneyToAdd
            userData.save();
        });
        db.findOne({userID: message.author.id, guildID: message.guild.id}, (err, userData) => {
            if (!userData) {
                userData = new db({
                    userID: message.author.id,
                    guildID: message.guild.id,
                    money: 0,
                    xp: 0
                });
            };
            if (userData.money < moneyToAdd) return err('Недостаточно средств');
            userData.money = userData.money - moneyToAdd
            userData.save();
        });
        succ(`Вы успешно дали ${user} **${moneyToAdd}**${currency}`)
    }
    if (['reset-all-stats', 'ras', 'r-a-s'].includes(command)) {
        if (!message.member.hasPermission("ADMINISTRATOR")) return err(0, 'Админимтстратор')
        message.channel.send('Прежде чем сбросить экономику и опыт напишите andreylox').then(() => {
            const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 60000 });
            collector.on('collect', msg => {
                collector.stop();
                if (msg.content === 'andreylox') {
                    db.find({guildID: message.guild.id}, (err, arr) => {
                        console.log(arr)
                        Object.keys(arr).forEach(i => arr[i] = {
                            userID: message.author.id,
                            guildID: message.guild.id,
                            money: 0,
                            __v: 0
                        });
                        console.log(arr)
                        succ('Экономика и опыт были сброшены успешно');
                    });
                } else return err('Указан неверный код');
            })
        })
    }
    if (['change-color', 'set-color', 'sc', 'cc', 's-c', 'c-c'].includes(command) && it.includes(command)) {
        if (!args[0]) return err('Вы не указали цвет'); 
        if (!args[0].match(hexreg)) return err('Вы указали неправильную структуру цвета');
        if (message.member.roles.find(role => role.name.match(/^🖌️║Color #([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})║🎨$/))) {
            message.member.removeRole(message.member.roles.find(role => {role.name.match(/^🖌️║Color #([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})║🎨$/)})).catch();
        }
        message.guild.createRole({
            "permissions" : 0,
            "name" : `🖌️║Color ${args[0]}║🎨`, 
            "color" : args[0]
        }).then((role) => {
            message.member.addRole(role);
            message.channel.send('Ваш цвет изменен на ' + args[0])});
    }
    if(command === 'update') {
        message.delete();
        const embed = new Discord.RichEmbed()
            .setTitle("Обновления")
            .setColor("af00ff")
            .setDescription(update)
            .setFooter(bot_name + " | " + version + " | Все права защищены | При нахождении бага кидайте скрин ANDREY#8389 в личное сообщение")
            .setTimestamp();
        message.channel.send({embed});
    }
    if (command === 'guilds' && message.author.id === creator) message.reply(client.guilds.size);
    if (['8ball', 'ball', '8'].includes(command)) {
        const answers = ['Без сомннения!', 'Да, конечно', 'Да', 'Вроде да', 'Возможно', 'Абсолютно нет!', 'Никак нет', 'Нет', 'Неа', 'Cомневаюсь', 'Спроси позднее, я не знаю']
        const numOfAnswer = randomInteger(0, 10);
        if (!args[0]) return message.reply('Ошибка. Причина: **Не указан аргумент**\n\nПравильное использование:\n=8ball `<вопрос>`')
        message.reply(answers[numOfAnswer]);
    };
    if (['ship', 'love', 'шип'].includes(command)) {
        if (!args[0]) args[0] = message.guild.members.random();
        if (!args[1]) args[1] = message.author
        const loveTexts = ['Хуже некуда :poop:', 'Ужасно :sob:', 'Очень плохо :disappointed_relieved:', 'Плохо :frowning2:', 'Средне :thinking:', 'Неплохо :confused:', 'Дружески :+1:', 'Ууу ( ͡° ͜ʖ ͡°)', 'Превосходно! :heartpulse:', 'Невероятно!!! :heart_eyes:', 'ИДЕАЛЬНО!!! :heart_exclamation:'];
        const percents = randomInteger(0, 100);
        const loveText = loveTexts[Math.floor(percents / 10)];
        let line = ''
        let whiteLine = ''
        for (let i = 0; i <= percents; i = i + 10) line += '■';
        for (let i = 0; i < 100 - percents; i = i + 10) whiteLine += '□';
        const embed = new Discord.RichEmbed()
            .setTitle(":heart:МАТЧМЕЙКИНГ:heart:")
            .setColor("ff00b0")
            .setDescription('▼***' + args[0] + '***\n▲***' + args[1] + '***\n\n:revolving_hearts:Любовь в проценатах: **' + percents + '%** `[' + line + whiteLine + ']`' + '\n\nВердикт: **' + loveText + '**')
            .setFooter(bot_name + " | " + version + " | Все права защищены")
            .setTimestamp();
        message.channel.send({embed});
    }
    if (command === 'say') {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return err(0, 'Управление сообщениями');
        message.delete().catch(() => {return err('У меня недостаточно прав')});
        message.channel.send(args.join(" ")).catch(() => {return err('Не указано сообщение')});
    }
    if (command === 'rule1' && it.includes(command)) {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return err(0, 'Управление сообщениями');
        message.delete().catch(() => {return err('У меня недостаточно прав')});
        const embed = new Discord.RichEmbed()
        .setTitle('Пункт 1')
        .setColor('af00ff')
        .setDescription('Оскорбления других людей (Мут на 1 час). НО в случае уместного оскорбления, а не беспричинного человек не будет наказан. Также, вы не будете наказаны назвав кого то "Нуб" или подобными словами.')
        .setThumbnail('https://media.discordapp.net/attachments/489107664479977472/489149961913499678/number1_PNG14894.png?width=300&height=300');
        message.channel.send({embed}).catch(() => {return err('Не указано сообщение')});
    }
    if (command === 'rule2' && it.includes(command)) {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return err(0, 'Управление сообщениями');
        message.delete().catch(() => {return err('У меня недостаточно прав')});
        const embed = new Discord.RichEmbed()
        .setTitle('Пункт 2')
        .setColor('af00ff')
        .setDescription('Рассылка порнографического контента без цензуры (Мут на 1 час). НО если на контенте присутствует цензура, то вы останетесь безнаказанным. При слишком частой рассылке с цензурой вы все также будете наказаны мутом на 1 час.')
        .setThumbnail('https://media.discordapp.net/attachments/489107664479977472/489150518648897536/Westconf2.png?width=300&height=300');
        message.channel.send({embed}).catch(() => {return err('Не указано сообщение')});
    }
    if (command === 'rule3' && it.includes(command)) {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return err(0, 'Управление сообщениями');
        message.delete().catch(() => {return err('У меня недостаточно прав')});
        const embed = new Discord.RichEmbed()
        .setTitle('Пункт 3')
        .setColor('af00ff')
        .setDescription('Рассылка вредноносного ПО, т. е. вирусов, троянов и т. п. (Мут на 1 час). НО если ПО способно любыми способами удалить данные с жесткого диска (Шифрование, Блокирование, Полное удаление), то вы получите пожизненный бан.')
        .setThumbnail('https://media.discordapp.net/attachments/489107664479977472/489151595372871700/Westconf3.png?width=300&height=300');
        message.channel.send({embed}).catch(() => {return err('Не указано сообщение')});
    }
    if (command === 'rule4' && it.includes(command)) {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return err(0, 'Управление сообщениями');
        message.delete().catch(() => {return err('У меня недостаточно прав')});
        const embed = new Discord.RichEmbed()
        .setTitle('Пункт 4')
        .setColor('af00ff')
        .setDescription('Реклама чего либо без разрешения администрации, или в непредназначенных для этого каналах. Для приглашений на другие сервера существует канал #invites. А для пиара других проектов зайдите в #photoshop-projects или #code-projects. Если администрация согласиться рекламировть ваш проект (Не сервер), то у вас появится право писать о его обновлених в #updates.')
        .setThumbnail('https://media.discordapp.net/attachments/489107664479977472/489153751190470666/Westconf4.png?width=300&height=300');
        message.channel.send({embed}).catch(() => {return err('Не указано сообщение')});
    }
    if (command === 'rule5' && it.includes(command)) {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return err(0, 'Управление сообщениями');
        message.delete().catch(() => {return err('У меня недостаточно прав')});
        const embed = new Discord.RichEmbed()
        .setTitle('Пункт 5')
        .setColor('af00ff')
        .setDescription('Флуд или спам (Мут на 1 час). Для нашего сервера флуд - это сообщение(ия) в большинстве случаев занимающие большие объемы и не несущие никакого смысла, или содержащее очень малое количесво полезной информации. Спам - это большое количество повторяющихся символов, слов или фраз.')
        .setThumbnail('https://media.discordapp.net/attachments/489107664479977472/489155201069088778/Westconf5.png?width=300&height=300');
        message.channel.send({embed}).catch(() => {return err('Не указано сообщение')});
    }
    if (command === 'rule6' && it.includes(command)) {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return err(0, 'Управление сообщениями');
        message.delete().catch(() => {return err('У меня недостаточно прав')});
        const embed = new Discord.RichEmbed()
        .setTitle('Пункт 6')
        .setColor('af00ff')
        .setDescription('Попрошайничество роли (Мут на 1 час). Попрошайничество роли - это когда человек пишет подобное сообщение: "Дайте мне роль ___". А например "Когда голосование за модератора?" в это не входит.')
        .setThumbnail('https://media.discordapp.net/attachments/489107664479977472/489156483607691264/Westconf6.png?width=300&height=300');
        message.channel.send({embed}).catch(() => {return err('Не указано сообщение')});
    }
    if (command === 'rule7' && it.includes(command)) {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return err(0, 'Управление сообщениями');
        message.delete().catch(() => {return err('У меня недостаточно прав')});
        const embed = new Discord.RichEmbed()
        .setTitle('Пункт 7')
        .setColor('af00ff')
        .setDescription('Написание большого количество /tts сообщений или одного большого бессмысленного сообщения. (Мут на 1 час). Если вы к многим своим сообщениям будете добавлять /tts, даже не смотря на то что они будут вполне адекватными вы все также получите наказание.')
        .setThumbnail('https://media.discordapp.net/attachments/489107664479977472/489157561656803389/Westconf7.png?width=300&height=300');
        message.channel.send({embed}).catch(() => {return err('Не указано сообщение')});
    }
    if (command === 'send') {
        let user = message.mentions.members.first();
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return err(0, 'Управление сообщениями');
        message.delete().catch(() => {return err('У меня недостаточно прав')});
        user.send(args.join(" ").slice(user.toString.length)).catch(() => {return err('Не указано сообщение')});
    }
    if (command === 'sms') {
        let user = message.mentions.members.first();
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return err(0, 'Управление сообщениями');
        message.delete().catch(() => {return err('У меня недостаточно прав')});
        user.send('**' + message.author.tag + ' (' + message.author + ') Отправил вам SMS следующего содержания:**\n' + args.join(" ")).slice(user.toString.length).catch(() => {return err('Не указано сообщение')});
    }
    if(['poll', 'vote'].includes(command)) {
        if (!poll[1]) return err('Нельзя создавать пустые голосования');
        const question = args.join(' ').match(/(.*?);/g)[0].slice(0, -1);      
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return err(0, 'Управление сообщениями')
        if (poll[11]) return err('Голосование нельзя делать более чем с 10-тью вариантами')
        let variants = ''
        for (let i = 1; i < poll.length; i++) variants += module.exports[i] + ' — ' + poll[i] + '\n'
        message.channel.send(':bar_chart: **' + question + '**');
        const embed = new Discord.RichEmbed()
            .setDescription(variants)
            .setColor("af00ff")
            .setFooter(footer)
            .setTimestamp();
        message.delete();
        message.channel.send({embed}).catch(() => {return err('Лимит в 2000 символов превышен')}).then(msg => {for (let i = 1;i < poll.length - 1; i++) msg.react(module.exports[i])});
    };
    if (command === 'eval') {
        if (message.author.id !== creator) return message.channel.send('Эй, мамкин хакер, эвал только для Богов!');
        const code = args.join(" ").replace(/client\.token|client\[.token.\]/ig, 'process.env.TOKEN');        
        const token = client.token.split("").join("[^]{0,2}");
        const rev = client.token.split("").reverse().join("[^]{0,2}");
        const filter = new RegExp(`${token}|${rev}`, "g");
        try {
            let output = eval(code);
            if (output instanceof Promise || (Boolean(output) && typeof output.then === "function" && typeof output.catch === "function")) output = output;
            output = inspect(output, { depth: 0, maxArrayLength: null });
            output = output.replace(filter, "[TOKEN]");
            output = clean(output);
            if (output.length < 1950) message.channel.send(`\`\`\`js\n${output}\n\`\`\``).then(() => {message.react("✅")});
            else message.channel.send(`${output}`, {split:"\n", code:"js"});
        } catch (error) {message.channel.send(`Анхэндлэд промайз риджекшн ворнинг \`\`\`js\n${error}\`\`\``).then(() => {message.react("❎");});}
        function clean(text)  {
            return text
                .replace(/`/g, "`" + String.fromCharCode(8203))
                .replace(/@/g, "@" + String.fromCharCode(8203));
        }
    }
    if (['idea', 'id'].includes(command)) client.fetchUser(creator).then(user => user.send('Пользователь ' + message.author + ' отправил вам идею: ' + args.join(" ")).catch(() => {err('Не указана идея')}).then(() => {message.channel.send('Идея была успешно отправлена :white_check_mark:')}));
    if (['bug', 'bg'].includes(command)) client.fetchUser(creator).then(user => user.send('Пользователь ' + message.author + ' отправил вам баг: ' + args.join(" ")).catch(() => {err('Не указан баг')}).then(() => {message.channel.send('Баг был успешно отправлен :white_check_mark:')}));
    if (['clear', 'delete', 'del', 'clr', 'сдк', 'вуд', 'сдуфк', 'вудуеу'].includes(command)) {
        async function clear() {
            if (isNaN(args[0])) return err('Аргумент должен являться числом');
            let msgs = parseInt(args[0]);
            if (!message.member.hasPermission("MANAGE_MESSAGES")) return err(0, 'Управление сообщениями');
                if (msgs < 2)return err('Аргумент не может являться нулем или единицей');
                if (msgs + 1 >= 99) msgs = 98;
                message.channel.bulkDelete(await message.channel.fetchMessages({limit: msgs + 1})).catch();
                message.channel.send("Было успешно удалено **" + msgs + "** " + declOfNum(msgs, ['сообщение', 'сообщения', 'сообщений'])).then(msg => msg.delete(5000));
        }
        clear();
    }
    if (['warn', 'варн', 'цфкт'].includes(command)) {
        let user = message.mentions.members.first(); 
        if (!message.member.hasPermission("KICK_MEMBERS")) return err(0, 'Кикать участников')
        if (!user) return err('Вы забыли упомянуть пользователя или вы хотите предупредить того, кто не является пользователем');
        if (user.id === message.author.id) return message.channel.send('Зачем ты пытаешься сделать предупреждение самому себе?');
        let reason = args.splice(0, 1).join(" ");
        if (!reason) return err('Предупреждать без причины нельзя');
        user.send(actMSg('warn', message.author, 0, reason));
        message.channel.send('Пользователь ' + user + ' был предупрежден успешно');
    }
    if (['kick', 'кик', 'лшсл'].includes(command)) {
        let user = message.mentions.members.first(); 
        if (!message.member.hasPermission("KICK_MEMBERS")) return err(0, 'Кикать участников')
        if (!user) return err('Вы забыли упомянуть пользователя или вы хотите кикнуть того, кто не является пользователем');
        if (user.id === message.author.id) return message.channel.send('Зачем ты пытаешься кикнуть самого себя?');
        let reason = args.splice(0, 1).join(" ");
        if (!reason) return err('Кикать без причины нельзя');
        user.send(actMSg('kick', message.author, 0, reason));
        message.channel.send('Пользователь ' + user + ' кикнут успешно').then(() => {if (user.kickable) user.kick(reason)});
    }
    if (['ban', 'бан', 'ифт', 'банан', 'бунан'].includes(command)) {
        let user = message.mentions.members.first(); 
        if (!message.member.hasPermission("BAN_MEMBERS")) return err(0, 'Банить участников')
        if (!user) return err('Вы забыли упомянуть пользователя или вы хотите забанить того, кто не является пользователем');
        if (user.id === message.author.id) return message.channel.send('Зачем ты пытаешься забанить самого себя?');
        let reason = args.slice(0, 1).join(" ");
        if (!reason) return err('Банить без причины нельзя');
        if (!user.bannable) return err('Я не могу его забанить');
        user.send(actMSg('ban', message.author, 0, reason)).catch();
        message.channel.send('Пользователь ' + user + ' забанен успешно').then(() => user.ban(reason));
    }
    if (['unban', 'анбан', 'гтифт', 'забрать-банан', 'забрать-бунан'].includes(command)) {
        let userid = args[0];
        if (!message.member.hasPermission("BAN_MEMBERS")) return err(0, 'Банить участников')
        if (!userid) return err('Не указан ID');
        if (userid === message.author.id) return message.channel.send('Разбанить самого себя? умно, умно');
        let reason = args.slice(0, 1).join(" ");
        message.guild.unban(userid, reason).then(() => {message.channel.send('Пользователь под id ' + userid + ' разбанен успешно');}).catch(() => {err('Этот пользователь не забанен')});
    }
    if (['ьгеу', 'mute', 'мут'].includes(command)) {
        let user = message.mentions.members.first(); 
        if (!message.member.hasPermission("KICK_MEMBERS")) return err(0, 'Кикать пользователей');
        if (!user) return message.channel.send(message.author + ', Ошибка. Причина: **Вы забыли упомянуть пользователя или вы хотите замутить того, кто не является пользователем**');
        if (user.id == message.author.id) return message.channel.send('Зачем ты пытаешься замутить самого себя?');
        function getSeconds(str) {
            let seconds = 0;
            let years = str.match(/(\d+)\s*y/);
            let months = str.match(/(\d+)\s*M/);
            let weeks = str.match(/(\d+)\s*w/);
            let days = str.match(/(\d+)\s*d/);
            let hours = str.match(/(\d+)\s*h/);
            let minutes = str.match(/(\d+)\s*m/);
            let secs = str.match(/(\d+)\s*s/);
            if (years) { seconds += parseInt(years[1])*31556926; }
            if (months) { seconds += parseInt(months[1])*2592000; }
            if (weeks) { seconds += parseInt(weeks[1])*604800; }
            if (days) { seconds += parseInt(days[1])*86400; }
            if (hours) { seconds += parseInt(hours[1])*3600; }
            if (minutes) { seconds += parseInt(minutes[1])*60; }
            if (secs) { seconds += parseInt(secs[1]); }
            return seconds;
        }
        let reason = args.join(" ").slice(0, 2);
        if (args[1] && getSeconds(args[1]) === 0 ) return err('Мутить на 0 секунд нельзя');
        user.addRole(muted);
        user.send(actMSg('mute', message.author, args[1], reason));
        message.channel.send(user + ' был успешно замучен');
        setBigTimeout(() => {
            if (!message.member.roles.some(r=> [muted].includes(r.id))) return
            user.send(actMSg('autoUnmt', bot_name, 0, 0));
            user.removeRole(muted);
            message.channel.send(user + ' был размучен');
            }, getSeconds(args[1])*1000);
        }
        if (['unmute', 'гтьгеу'].includes(command)) {
            let user = message.mentions.members.first();
            if (!message.member.hasPermission("KICK_MEMBERS")) return err(0, 'Кикать участников')
            if (!user) return err('Вы забыли упомянуть пользователя или хотите размутить того, кто не является пользователем');
            if (!message.member.roles.some(r=> [muted].includes(r.id))) return err('Пользователь и так не замучен');
            let reason = args.join(" ").slice(0, 1);
            user.removeRole(muted);
            message.channel.send(user + ' был размучен');
            user.send(actMSg('unmute', message.author, 0, reason));
        }
        if (['avatar', 'av', 'аватар', 'ав', 'ava', 'ава'].includes(command)) {
            let user = message.mentions.members.first();
            if (!user) user = message.member
            const embed = new Discord.RichEmbed()
            .setTitle('Автар')
            .setColor('af00ff')
            .setDescription('Пользователя ' + user.user.tag + '(' + user + ')')
            .setImage(user.user.avatarURL)
            .setFooter(footer)
            .setTimestamp();
            message.channel.send({embed}).then(() => {message.delete()});
        }
        if (['random', 'rand'].includes(command)) {
            if (!args[0] || isNaN(args[0])) args[0] = 0;
            if (!args[1] || isNaN(args[1])) args[1] = 10;
            let num1 = parseInt(args[0]);
            let num2 = parseInt(args[1]);
            if (num1 > num2) return err('Такая глупая ошибка что даже комментировать ее не хочу');
            const embed = new Discord.RichEmbed()
                .setTitle('Случайное число от ' + num1 + ' до ' + num2)
                .setColor('af00ff')
                .setDescription('Выпало число **' + randomInteger(num1, num2) + '** :game_die: ')
                .setFooter(footer)
                .setTimestamp();
            message.channel.send({embed});
        };
    if (['help', 'рудз', 'хелп', 'помощь'].includes(command)) {
        if (isNaN(parseInt(args[1]))) args[1] = 1
        const page = parseInt(args[1]);
        if (!args[0] || !['m', 's', 'f', 'standart', 'moderation', 'fun', 'mod', 'stand'].includes(args[0].toLowerCase())) {
            const embed = new Discord.RichEmbed()
                .setTitle('Помощь')
                .setColor('af00ff')
                .setDescription('Вы не указали модуль. Существющие модули:\n\n***1. - standart\n2. - moderation\n3. - fun***\n\nПримеры: ' + prefix + 'help m, ' + prefix + 'help s 2')
                .setFooter(footer)
                .setTimestamp();
            return message.channel.send({embed});
        }
        let category = args[0][0].toLowerCase();
        let categories = [];
        let tempDesc = '';
        let cmd = 0;
        let params = '`[...]` — Необязательный параметр\n`<...>` — Обязательный параметр\n\n';
        for (let i in commands) if (!categories.includes(commands[i].type)) categories.push(commands[i].category);
        const embed = new Discord.RichEmbed()
        .setColor('af00ff')
        .setTimestamp()
        for (let i in commands) if (category === commands[i].type) {
            cmd++;
            if (page === 1 && cmd <= 10) {
                tempDesc += `**${prefix}${commands[i].name}**`;
                for (let a in commands[i].args) tempDesc += ' `' + commands[i].args[a] + '` ';
                if (commands[i].perm) tempDesc += '(Требуется право: `' + commands[i].perm + '`)';
                tempDesc += ` — ${commands[i].desc}\n\n`;
                embed.setDescription(params + tempDesc);
                continue;
            }
            if (cmd >= page * 10 - 9 && page > 1) {
                tempDesc += `**${prefix}${commands[i].name}**`;
                for (let a in commands[i].args) {
                    if (!commands[i].args) continue;
                    tempDesc += ' `' + commands[i].args[a] + '` ';
                }
                if (commands[i].perm) tempDesc += '(Требется право: `' + commands[i].perm + '`)';
                tempDesc += ` — ${commands[i].desc}\n\n`;
                embed.setDescription(params + tempDesc);
            }
            embed.setFooter('Страница ' + page + '/' + Math.ceil(cmd / 10))
        }
        if (cmd < page * 10 - 10 && page > 1 || page <= 0) return err('Такой страницы не существует');
        if (category === 'm') category = 'модерация';
        if (category === 's') category = 'стандартные';
        if (category === 'f') category = 'развлечения';
        embed.setTitle('Команды модуля ' + category + '') ;
        message.channel.send({embed});
    }
});
client.login(
    process.env.BOT_TOKEN
    //''
);
