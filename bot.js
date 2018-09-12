/*
*Внимание!
*Вы можете брать код только с разрешения автора бота.
*Нарушения авторских прав карается законом.
*
*Связатся с автором можно через Discord
*
*Discord: ANDREY#8389
*
*Бот создан для всех серверов Discord.
*
*Discord IT Team сервер поддержки бота: https://discord.gg/XPqesHR
*
*Copyright 2018 © IT Team. Все права защищены.
*
*Пригласить бота: 
**/
const Discord = require("discord.js"); //Поделючение d.js
const client = new Discord.Client(); //Клиент бота
const fs = require("fs"); //Подключение fs
const { inspect } = require("util"); //Подключение util
const request = require("request"); //Подключение reqest
const mongoose = require('mongoose'); //Подключение quick.db
let commands = require('./Storage/commands.json'); //Подключение commands.json
/** @namespace process.env.BOT_TOKEN */ //process.env
module.exports = {
    0: '0⃣', 1: '1⃣',
    2: '2⃣', 3: '3⃣', 4: '4⃣', 5: '5⃣',
    6: '6⃣', 7: '7⃣', 8: '8⃣', 9: '9⃣',
    10: '🔟',
}; //module.exports Эмодзи для реакций
let prefix = '='; //Префикс
let currency = '₽'; //Валюта
//Роли
let people = '489338031350743052'
let muted = '469135765427847178'
//Другие переменные и константы
const bot_name = 'Программист';
const version = 'v1.5.0'
const update = 'Вышла новая версия ' + version + '. Обновления:\n\n1. Убраны команды для которых используется DataBase\n\n2. Изменена команда =help\n\n3. Добален модуль Fun';
const footer = bot_name + " | " + version + " | Все права защищены"
const creator = '242975403512168449';
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
client.on('guildMemberAdd', (member) => {
    if (!member.guild.id === '437290658458501143') return;
    const embed = new Discord.RichEmbed()
        .setTitle('Дороу')
        .setDescription('**Приветствую тебя ' + member + ', я - бот этого сервера. У меня есть магазин, экономика, миниигры, большое количесто команд. А на нашем сервере ты сможешь найти хороших друзей, редкие пинги, возможность поделиться своим творчеством, и посмотреть как его оценят другие люди. В скором времени у нас выйдет много обновлений. С уважением ' + bot_name + ' ' + version + '**')
        .setColor('af00ff')
        .setFooter(footer)
        .setTimestamp();
        member.send({embed}).catch(() => {console.log('Ошибка при отправке приветствия')});
    console.log('Приветствие отправлено успешно успешно'); 
    const embed2 = new Discord.RichEmbed()
        .setTitle('Пополнение!')
        .setColor('af00ff')
        .setDescription('На сервер **' + member.guild + '** пришел ' + member + '\n\nУчастников на этом сервере теперь **' + member.guild.memberCount + '**')
        .setFooter(footer)
        .setTimestamp()
        client.fetchUser(creator).then (user => user.send({embed: embed2}).catch(() => {console.log('Ошибка при отправки сообщения о пополнении')}));
        client.channels.get('489119691504222257').send(member + ' Прилетел на сервер. Нас стало **' + member.guild.memberCount + '**');
});
//Событие ухода мембера с сервера
client.on('guildMemberRemove', (member) => {
    if (!member.guild.id === '437290658458501143') return;
    member.send('Прощай, ' + member + '. Мы будем скучать');
    const embed = new Discord.RichEmbed()
        .setTitle('Он ушел')
        .setColor('af00ff')
        .setDescription(member + ' ушел :(.\n\nТеперь нас **' + member.guild.memberCount + '**')
        .setFooter(footer)
        .setTimestamp()
        client.fetchUser(creator).then (user => user.send({embed}));
        client.channels.get('489119691504222257').send(member + 'Покинул' + member.guild + ' Остались **' + member.guild.memberCount + '** пользователей');
});
//То что должно произойти после запуска бота
client.on('ready', () => {
    client.user.setActivity(prefix + 'help',{ type: 'PLAYING' });
    console.log('Бот запущен успешно\n    Экономика работает...\n    Команды работают...\n    Количество гильдий на которых присутствует бот: ' + client.guilds.size);
});
client.on('message', (message) => {
    if(message.channel.type !== 'text') return;
    if(message.channel.id === '489114682737688577') return;
    if (!['437290658458501143', '457541720494571533', '469874212505649153'].includes(message.guild.id)) {
        message.channel.send('Андрей! Забери меня от сюда!');
        console.log('Андрюха, прикинь, меня крч на какой-то сервер пригласили, но я не растерялся и такой РАЗ. И свалил с этого сервера :D\nОвенр: ' + message.guild.owner.user.tag + '\nНазвание: ' + message.guild.name)
        message.guild.leave().catch();
        return;
    };
    if (message.channel.id === '489122598538444810') {
        message.delete();
        if (!message.content.match(hexreg)) return message.author.send('Вы указали неправильную структуру цвета');
        message.guild.createRole({
            "permissions" : 0,
            "name" : message.content, 
            "color" : message.content,
        }).catch(() => {message.author.send('Произошла ошибка')})
        .then((role) => {
            message.member.addRole(people);
            message.member.addRole(role);
            message.author.send('Ваш цвет - ' + message.content)});
    }
    if (message.author.bot) return;
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
            .setTitle("Информация о предупреждениях")
            .setColor("af00ff")
            .setDescription('Вы были **предупреждены**' + '.\n\nПричина:** Пиар.**\n\nНе ведите себя плохо!')
            .setFooter(bot_name + " | " + version + " | Все права защищены")
            .setTimestamp();
        message.author.send({embed});
        message.channel.send(message.author + ' был предупрежден. Причина: пиар.');
        message.delete();
    }
    })
    });
    if(message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const poll = message.content.slice(prefix.length).trim().split(/;+/g);
    function sendMsg (msg) {
        message.channel.send(msg)
    }
    function actMSg (actType, actioner, time, reason) {
        let act = ''
        let desc = ''
        let other = ''
        if (actType === 'mute') {act = 'замучены'; desc = 'Время: **' + time + '**\n'; other = '\n\nНе ведите себя плохо!'}
        if (actType === 'warn') {act = 'предупреждены'; other = '\n\nНе ведите себя плохо!'} 
        if (actType === 'ban') {act = 'забанены'; other = '\n\nНе ведите себя плохо!'}
        if (actType === 'unban') {act = 'разбанены';}
        if (actType === 'kick') {act = 'выгнаны'; other = '\n\nНе ведите себя плохо!'}
        if (actType === 'unmute') {act = 'размучены'}
        if (reason === 'autoUnmt') {actioner = bot_name; reason = 'Автоматический размут'}
        if (reason === undefined) reason = 'Не указана'
        const embed = new Discord.RichEmbed()
            .setTitle("Вы были " + act + ' на ' + message.guild.name)
            .setColor("af00ff")
            .setDescription('\nПользователем: **' + actioner + '**\n' + desc + 'Причина: **' + reason + '**' + other)
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
    if (command === 'change-color') {
        if (!args[0]) return err('Вы не указали цвет'); 
        if (!args[0].match(hexreg)) return err('Вы указали неправильную структуру цвета');
        if (message.member.roles.find(role => role.name.match(hexreg))) message.member.removeRole(message.member.roles.find(role => role.name.match(hexreg))).catch();
        message.guild.createRole({
            "permissions" : 0,
            "name" : args[0], 
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
        for (let i = 0; i <= 100 - percents; i = i + 10) whiteLine += '□';
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
    if (command === 'rule1') {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return err(0, 'Управление сообщениями');
        message.delete().catch(() => {return err('У меня недостаточно прав')});
        const embed = new Discord.RichEmbed()
        .setTitle('Пункт 1')
        .setColor('af00ff')
        .setDescription('Оскорбления других людей (Мут на 1 час). НО в случае уместного оскорбления, а не беспричинного человек не будет наказан. Также, вы не будете наказаны назвав кого то "Нуб" или подобными словами.')
        .setThumbnail('https://media.discordapp.net/attachments/489107664479977472/489149961913499678/number1_PNG14894.png?width=300&height=300');
        message.channel.send({embed}).catch(() => {return err('Не указано сообщение')});
    }
    if (command === 'rule2') {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return err(0, 'Управление сообщениями');
        message.delete().catch(() => {return err('У меня недостаточно прав')});
        const embed = new Discord.RichEmbed()
        .setTitle('Пункт 2')
        .setColor('af00ff')
        .setDescription('Рассылка порнографического контента без цензуры (Мут на 1 час). НО если на контенте присутствует цензура, то вы останетесь безнаказанным. При слишком частой рассылке с цензурой вы все также будете наказаны мутом на 1 час.')
        .setThumbnail('https://media.discordapp.net/attachments/489107664479977472/489150518648897536/Westconf2.png?width=300&height=300');
        message.channel.send({embed}).catch(() => {return err('Не указано сообщение')});
    }
    if (command === 'rule3') {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return err(0, 'Управление сообщениями');
        message.delete().catch(() => {return err('У меня недостаточно прав')});
        const embed = new Discord.RichEmbed()
        .setTitle('Пункт 3')
        .setColor('af00ff')
        .setDescription('Рассылка вредноносного ПО, т. е. вирусов, троянов и т. п. (Мут на 1 час). НО если ПО способно любыми способами удалить данные с жесткого диска (Шифрование, Блокирование, Полное удаление), то вы получите пожизненный бан.')
        .setThumbnail('https://media.discordapp.net/attachments/489107664479977472/489151595372871700/Westconf3.png?width=300&height=300');
        message.channel.send({embed}).catch(() => {return err('Не указано сообщение')});
    }
    if (command === 'rule4') {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return err(0, 'Управление сообщениями');
        message.delete().catch(() => {return err('У меня недостаточно прав')});
        const embed = new Discord.RichEmbed()
        .setTitle('Пункт 4')
        .setColor('af00ff')
        .setDescription('Реклама чего либо без разрешения администрации, или в непредназначенных для этого каналах. Для приглашений на другие сервера существует канал #invites. А для пиара других проектов зайдите в #photoshop-projects или #code-projects. Если администрация согласиться рекламировть ваш проект (Не сервер), то у вас появится право писать о его обновлених в #updates.')
        .setThumbnail('https://media.discordapp.net/attachments/489107664479977472/489153751190470666/Westconf4.png?width=300&height=300');
        message.channel.send({embed}).catch(() => {return err('Не указано сообщение')});
    }
    if (command === 'rule5') {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return err(0, 'Управление сообщениями');
        message.delete().catch(() => {return err('У меня недостаточно прав')});
        const embed = new Discord.RichEmbed()
        .setTitle('Пункт 5')
        .setColor('af00ff')
        .setDescription('Флуд или спам (Мут на 1 час). Для нашего сервера флуд - это сообщение(ия) в большинстве случаев занимающие большие объемы и не несущие никакого смысла, или содержащее очень малое количесво полезной информации. Спам - это большое количество повторяющихся символов, слов или фраз.')
        .setThumbnail('https://media.discordapp.net/attachments/489107664479977472/489155201069088778/Westconf5.png?width=300&height=300');
        message.channel.send({embed}).catch(() => {return err('Не указано сообщение')});
    }
    if (command === 'rule6') {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return err(0, 'Управление сообщениями');
        message.delete().catch(() => {return err('У меня недостаточно прав')});
        const embed = new Discord.RichEmbed()
        .setTitle('Пункт 6')
        .setColor('af00ff')
        .setDescription('Попрошайничество роли (Мут на 1 час). Попрошайничество роли - это когда человек пишет подобное сообщение: "Дайте мне роль ___". А например "Когда голосование за модератора?" в это не входит.')
        .setThumbnail('https://media.discordapp.net/attachments/489107664479977472/489156483607691264/Westconf6.png?width=300&height=300');
        message.channel.send({embed}).catch(() => {return err('Не указано сообщение')});
    }
    if (command === 'rule7') {
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
        user.send(args.join(" ").catch(() => {return err('Не указано сообщение')}));
    }
    if (command === 'sms') {
        let user = message.mentions.members.first();
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return err(0, 'Управление сообщениями');
        message.delete().catch(() => {return err('У меня недостаточно прав')});
        user.send('**' + message.author.tag + ' (' + message.author + ') Отправил вам SMS следующего содержания:**\n' + args.join(" ")).catch(() => {return err('Не указано сообщение')});
    }
    if(['poll', 'vote'].includes(command)) {
        if (!poll[1]) return err('Нельзя создавать пустые голосования');
        const question = args.join(' ').match(/(.*?);/g)[0].slice(0, -1);      
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return err(0, 'Управление сообщениями')
        if (poll[11]) return err('Голосование нельзя делать более чем с 10-тью вариантами')
        let variants = ''
        for (let i = 1;i < poll.length;i++) variants += module.exports[i] + ' — ' + poll[i] + '\n'
        message.channel.send(':bar_chart: **' + question + '**');
        const embed = new Discord.RichEmbed()
            .setDescription(variants)
            .setColor("af00ff")
            .setFooter(footer)
            .setTimestamp();
        message.channel.send({embed}).catch(() => {return err('Лимит в 2000 символов превышен')}).then(msg => {for (let i = 1;i < poll.length;i++) msg.react(module.exports[i]); message.delete();});
    };
    if (command === 'eval') {
        if (message.author.id !== creator) return message.channel.send('Эй, мамкин хакер, эвал только для элиты!');
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
    if (['idea', 'id'].includes(command)) message.guild.owner.send('Пользователь ' + message.author + ' отправил вам идею: ' + args.join(" ")).catch(() => {err('Не указана идея')}).then(() => {message.channel.send('Идея была успешно отправлена :white_check_mark:');});
    if (['bug', 'bg'].includes(command)) message.guild.owner.send('Пользователь ' + message.author + ' отправил вам баг: ' + args.join(" ")).catch(() => {err('Не указан баг')}).then(() => {message.channel.send('Баг был успешно отправлен :white_check_mark:');});
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
            if (!args[0]) args[0] = 0;
            if (!args[1]) args[1] = 10;
            const embed = new Discord.RichEmbed()
                .setTitle('Случайное число от ' + args[0] + ' до ' + args[1])
                .setColor('af00ff')
                .setDescription('Выпало число **' + randomInteger(parseInt(args[0]), parseInt(args[1])) + '** :game_die: ')
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
);